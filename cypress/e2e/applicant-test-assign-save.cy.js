/// <reference types="cypress" />

describe('applicant', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('search by rut', () => {
    cy.visit('http://localhost:3000/test/assign')
    cy.get('h2').should('have.text', 'Asignar Test a Postulante')
    cy.get('#rut').type('15331265-6')
    cy.intercept(`${Cypress.env('api')}/postulants?rut=*`).as('getPostulant')
    cy.get('#search-button').click()
    cy.wait('@getPostulant')
    cy.get('#search-section :nth-child(3)').should('have.text', 'Nombre: Edmundo Ogaz')
    cy.get('#test').select('1')
    cy.get('#company').select('1')
    cy.get('#analyst').select('1')
    cy.get('#save-button').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
  })
})
