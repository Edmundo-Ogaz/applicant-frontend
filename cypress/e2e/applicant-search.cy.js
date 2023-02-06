/// <reference types="cypress" />

const FILTER_TABLE_SECOND_CELL = 'table tbody tr:nth-child(1) td:nth-child(2)'

describe('applicant', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept('http://localhost:9000/.netlify/functions/server/users/login').as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('search title', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('h2').should('have.text', 'Buscar Resultados')
  })

  it('search by rut', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_CELL).should('have.text', '1234@1234.cl')
  })

  it('search by name', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_CELL).should('have.text', '1234@1234.cl')
  })

  it('search by email', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_CELL).should('have.text', '1234@1234.cl')
  })

  it('search by company', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#company').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_CELL).should('have.text', '1234@1234.cl')
  })

  it('search by analyst', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#company').select('1')
    cy.wait(2000)
    cy.get('#analyst').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_CELL).should('have.text', '1234@1234.cl')
  })

  it('search by test', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#test').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_CELL).should('have.text', '1234@1234.cl')
  })

  it('search by state', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#state').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_CELL).should('have.text', '1234@1234.cl')
  })
})
