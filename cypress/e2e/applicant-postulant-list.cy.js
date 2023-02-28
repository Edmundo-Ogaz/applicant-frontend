/// <reference types="cypress" />

const FILTER_TABLE_FIRST_CELL = 'table tbody tr:nth-child(1) td:nth-child(1)'

describe('applicant postulant list', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/login').as('login')
    cy.visit('http://localhost:3000/login')
    cy.wait('@login')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    cy.intercept('http://localhost:3000/postulant/list').as('list')
    cy.visit('http://localhost:3000/postulant/list')
    cy.wait('@list')
  })

  it('search by rut', () => {
    cy.get('h2').should('have.text', 'Postulantes')
  })

  it('search by rut', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_CELL).should('have.text', '15331265-6')
  })

  it('search by name', () => {
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_CELL).should('have.text', '15331265-6')
  })

  it('search by email', () => {
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_CELL).should('have.text', '15331265-6')
  })
})
