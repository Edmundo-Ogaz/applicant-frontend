/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW = 'table tbody tr:nth-child(1)'

describe('applicant search pending', () => {
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
    cy.get('#state').select('1')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(6)`).should('have.text', 'pendiente')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(1) a`).click()
    cy.get('#modal #url').should("contain", "/instruction/")
  })
})
