/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW = 'table tbody tr:nth-child(1) td:nth-child(1)'
const FILTER_TABLE_SECOND_ROW = 'table tbody tr:nth-child(2) td:nth-child(1)'

describe('applicant', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept('http://localhost:9000/.netlify/functions/server/users/login').as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('search by rut', () => {
    cy.visit('http://localhost:3000/user/list')
    cy.get('h2').should('have.text', 'Usuarios')
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW).should('have.text', '15331265-6')
  })

  it('search by name', () => {
    cy.visit('http://localhost:3000/user/list')
    cy.get('h2').should('have.text', 'Usuarios')
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW).should('have.text', '15331265-6')
  })

  it('search by email', () => {
    cy.visit('http://localhost:3000/user/list')
    cy.get('h2').should('have.text', 'Usuarios')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW).should('have.text', '15331265-6')
  })

  it('search by company', () => {
    cy.visit('http://localhost:3000/user/list')
    cy.get('h2').should('have.text', 'Usuarios')
    cy.get('#company').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_ROW).should('have.text', '15331265-6')
  })

  it('search by profile', () => {
    cy.visit('http://localhost:3000/user/list')
    cy.get('h2').should('have.text', 'Usuarios')
    cy.get('#profile').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW).should('have.text', '15331265-6')
  })
})
