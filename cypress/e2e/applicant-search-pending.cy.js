/// <reference types="cypress" />

const FILTER_TABLE_FIRST_CELL = 'table tbody tr:nth-child(1) td:nth-child(1) a'
const FILTER_TABLE_SEXTH_CELL = 'table tbody tr:nth-child(1) td:nth-child(6)'

describe('applicant', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('search pending', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SEXTH_CELL).should('have.text', 'pendiente')
    cy.get(FILTER_TABLE_FIRST_CELL).should("have.attr", "href").and('include', "/test/ic/instruction?postulant=")
  })
})
