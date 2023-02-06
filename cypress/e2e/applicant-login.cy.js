/// <reference types="cypress" />

describe('applicant', () => {
  beforeEach(() => {
    
    cy.visit('http://localhost:3000/')
  })

  it('login', () => {
    cy.get('#logo').should('have.text', 'Applicant')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.get('#login').click()
    cy.get('#logo').should('have.text', 'Applicant')
    cy.get('#username').should('have.text', '1234@1234.cl')
    
  })
})
