/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW_SEVETH_COL = 'table tbody tr:nth-child(1) td:nth-child(7)'

describe('applicant user password page', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/user/password/1').as('password')
    cy.visit('http://localhost:3000/user/password/1')
    cy.wait('@password')
  })

  it('password edit', () => {
    cy.get('#logo').should('have.text', 'Applicant')
    cy.get('h2').should('have.text', 'Registrar Nuevo Password')
    cy.get('#__next div p:nth-child(2)').should('have.text', 'Nombre: Edmundo Dante del Carmen Ogaz Barahona')
    cy.get('#__next div p:nth-child(3)').should('have.text', 'Email: edmundo.ogaz@gmail.com.cl')
    cy.get('#__next div p:nth-child(4)').should('have.text', 'Compañía: Applicant')
    cy.get('#__next form button').should('be.disabled')
    cy.get('#password').type('1234')
    cy.get('#repeatPassword').type('1234')
    cy.get('#__next form button').should('not.be.disabled')
  })
})
