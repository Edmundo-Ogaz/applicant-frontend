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
    document.cookie = `applicantApp=logged=true,id=test,email=test,company=1;`;
    cy.intercept('http://localhost:3000/search').as('search')
    cy.visit('http://localhost:3000/search')
    cy.wait('@search')
  })

  it('search title', () => {
    cy.get('h2').should('have.text', 'Buscar Tests')
  })

  it('search by rut', () => {
    cy.intercept(`${Cypress.env('api')}/tests/postulants?rut=15331265-6&company=1&limit=5&offset=0`).as('searchByRut')
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.wait('@searchByRut')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(2)`).should('have.text', '1234@1234.cl')
  })

  it('search by name', () => {
    cy.intercept(`${Cypress.env('api')}/tests/postulants?name=Edmundo&company=1&limit=5&offset=0`).as('searchByName')
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.wait('@searchByName')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(1)`).should('contain', 'Edmundo')
  })

  it('search by email', () => {
    cy.intercept(`${Cypress.env('api')}/tests/postulants?email=1234@1234.cl&company=1&limit=5&offset=0`).as('searchByEmail')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.wait('@searchByEmail')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(2)`).should('have.text', '1234@1234.cl')
  })

  it('search by company', () => {
    cy.get('#company').should('be.disabled')
    cy.get('#company').select('1', {force: true})
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(3)`).should('have.text', 'Applicant')
  })

  it('search by analyst', () => {
    cy.intercept(`${Cypress.env('api')}/users?company=1&profiles=1,2`).as('searchByCompanyAndProfile')
    cy.get('#company').should('be.disabled')
    //cy.get('#company').select('1', {force: true})
    cy.wait('@searchByCompanyAndProfile')
    cy.get('#analyst').select('4')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?company=1&analyst=4&limit=5&offset=0`).as('searchByAnalyst')
    cy.get('#search').click()
    cy.wait('@searchByAnalyst')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(3)`).should('have.text', 'Applicant')
  })

  it('search by test', () => {
    cy.get('#test').select('1')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?company=1&test=1&limit=5&offset=0`).as('searchByTest')
    cy.get('#search').click()
    cy.wait('@searchByTest')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(5)`).should('have.text', 'IC')
  })

  it('search by state', () => {
    cy.get('#state').select('2')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?company=1&state=2&limit=5&offset=0`).as('searchByState')
    cy.get('#search').click()
    cy.wait('@searchByState')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(6)`).should('have.text', 'completo')
  })
})
