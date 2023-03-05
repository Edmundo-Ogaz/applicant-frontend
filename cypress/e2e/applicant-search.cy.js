/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW = 'table tbody tr:nth-child(1)'

describe('applicant search', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/login').as('login')
    cy.visit('http://localhost:3000/login')
    cy.reload(true)
    cy.wait('@login')
    cy.get('#email').type(Cypress.env('username'), {force: true})
    cy.get('#password').type('1234', {force: true})
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    cy.intercept('http://localhost:3000/search').as('search')
    cy.visit('http://localhost:3000/search')
    cy.wait('@search')
  })

  it('search title', () => {
    cy.get('h2').should('have.text', 'Buscar Tests')
  })

  it('search by rut', () => {
    cy.get('#rut').type('15331265-6	')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(2)`).should('have.text', '1234@1234.cl')
  })

  it('search by name', () => {
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(1)`).should('contain', 'Edmundo')
  })

  it('search by email', () => {
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(2)`).should('have.text', '1234@1234.cl')
  })

  it('search by company', () => {
    cy.get('#company').select('1')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(3)`).should('have.text', 'Applicant')
  })

  it('search by analyst', () => {
    cy.intercept(`${Cypress.env('api')}/users?companyId=1&profileId=2`).as('searchByCompanyAndState')
    cy.get('#company').select('1')
    cy.wait('@searchByCompanyAndState')
    cy.get('#analyst').select('1')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?company=1&analyst=1&`).as('searchByAnalyst')
    cy.get('#search').click()
    cy.wait('@searchByAnalyst')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(3)`).should('have.text', 'Applicant')
  })

  it('search by test', () => {
    cy.get('#test').select('1')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?test=1&`).as('searchByTest')
    cy.get('#search').click()
    cy.wait('@searchByTest')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(5)`).should('have.text', 'IC')
  })

  it('search by state', () => {
    cy.get('#state').select('2')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?state=*&`).as('searchByState')
    cy.get('#search').click()
    cy.wait('@searchByState')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(6)`).should('have.text', 'completo')
  })
})
