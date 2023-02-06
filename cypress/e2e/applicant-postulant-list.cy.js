/// <reference types="cypress" />

const FILTER_TABLE_FIRST_CELL = 'table tbody tr:nth-child(1) td:nth-child(1)'

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
    cy.intercept('http://localhost:3000/postulant/list').as('list')
    cy.visit('http://localhost:3000/postulant/list')
    cy.wait('@list')
    cy.get('h2').should('have.text', 'Postulantes')
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_CELL).should('have.text', '15331265-6')
  })

  it('search by name', () => {
    cy.visit('http://localhost:3000/postulant/list')
    cy.get('h2').should('have.text', 'Postulantes')
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_CELL).should('have.text', '15331265-6')
  })

  it('search by email', () => {
    cy.visit('http://localhost:3000/postulant/list')
    cy.get('h2').should('have.text', 'Postulantes')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_CELL).should('have.text', '15331265-6')
  })
})
