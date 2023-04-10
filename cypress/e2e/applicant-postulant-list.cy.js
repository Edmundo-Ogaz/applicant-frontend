/// <reference types="cypress" />

const FILTER_TABLE_FIRST_CELL = 'table tbody tr:nth-child(1)'

describe('applicant postulant list', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/login').as('login')
    cy.visit('http://localhost:3000/login')
    cy.wait('@login')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.get('#company').select('1')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    cy.intercept('http://localhost:3000/postulant/list').as('list')
    cy.visit('http://localhost:3000/postulant/list')
    cy.wait('@list')
  })

  it('title', () => {
    cy.get('h2').should('have.text', 'Postulantes')
  })

  it('search by rut', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_CELL} td:nth-child(1)`).should('have.text', '15331265-6')
  })

  it('search by name', () => {
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_CELL} td:nth-child(2)`).should('contain', 'Edmundo')
  })

  it('search by email', () => {
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_CELL} td:nth-child(1)`).should('have.text', '15331265-6')
  })
})
