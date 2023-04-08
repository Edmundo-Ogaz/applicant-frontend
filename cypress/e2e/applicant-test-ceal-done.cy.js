/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW = 'table tbody tr:nth-child(1)'

describe('applicant search done', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('search ic done', () => {
    cy.visit('http://localhost:3000/search')
    cy.get('#test').select('3')
    cy.get('#state').select('2')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?company=1&test=3&state=2&limit=10&offset=0`).as('searchCealcDone')
    cy.get('#search').click()
    cy.wait('@searchCealcDone')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(6)`).should('have.text', 'completo')
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(1) a`).click()
    cy.get('.container #logo').find('img')
  })
})
