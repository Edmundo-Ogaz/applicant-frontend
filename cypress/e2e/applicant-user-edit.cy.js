/// <reference types="cypress" />

describe('applicant', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept('http://localhost:9000/.netlify/functions/server/users/login').as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('create', () => {
    cy.visit('http://localhost:3000/user/edit/355777650390729216')
    cy.get('h2').should('have.text', 'Actualizar Usuario')
    cy.get('#rut').should('be.disabled')
    cy.get('#firstName').clear()
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').clear()
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').clear()
    cy.get('#email').type('1234@1234.cl')
    cy.get('#company').select('2')
    cy.get('#profile').select('3')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
  })
})
