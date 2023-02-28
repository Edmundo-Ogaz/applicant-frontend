/// <reference types="cypress" />

describe('applicant test assign serarch', () => {
  beforeEach(() => {
    cy.intercept(`${Cypress.env('api')}/postulants?rut=*`).as('getPostulant')

    cy.intercept('http://localhost:3000/login').as('login')
    cy.visit('http://localhost:3000/login')
    cy.wait('@login')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    cy.intercept('http://localhost:3000/test/assign').as('assign')
    cy.visit('http://localhost:3000/test/assign')
    cy.wait('@assign')
  })

  it('search by rut', () => {
    cy.get('h2').should('have.text', 'Asignar Test a Postulante')
  })

  it('search by rut', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#search-button').click()
    cy.wait('@getPostulant')
    cy.get('#search-section :nth-child(3)').should('have.text', 'Nombre: Edmundo Ogaz')
  })

  it('search by rut and NOT FOUND', () => {
    cy.get('#rut').type('16847835-6')
    cy.get('#search-button').click()
    cy.wait('@getPostulant')
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'NOT_FOUND')
  })
})
