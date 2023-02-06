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

  it('edit', () => {
    cy.visit('http://localhost:3000/postulant/edit/355758846147297792')
    cy.get('h2').should('have.text', 'Actualizar Postulante')
    cy.get('#rut').should('be.disabled')
    cy.get('#firstName').clear() 
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').clear() 
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').clear() 
    cy.get('#email').type('1234@1234.cl')
    cy.get('#age').clear() 
    cy.get('#age').type('87')
    cy.get('#sexo').select('femenino')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
  })
})
