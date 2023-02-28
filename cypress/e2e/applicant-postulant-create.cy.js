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

  it('create', () => {
    cy.visit('http://localhost:3000/postulant/create')
    cy.get('h2').should('have.text', 'Crear Postulante')
    cy.get('#rut').type('15331265-6')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#age').type('40')
    cy.get('#sexo').select('masculino')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
    cy.wait(5000)
    cy.get('#rut').type('15331265-6')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#age').type('40')
    cy.get('#sexo').select('masculino')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'POSTULANT_EXIST')
  })
})
