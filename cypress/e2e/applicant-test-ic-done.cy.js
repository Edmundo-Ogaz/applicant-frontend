/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW = 'table tbody tr:nth-child(1)'

describe('applicant search done', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.get('#company').select('1')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('search ic done', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#test').select('1')
    cy.get('#state').select('2')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(6)`).should('have.text', 'completo')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(1) a`).click()
    cy.get('#certificate #logo').find('img')
  })
})
