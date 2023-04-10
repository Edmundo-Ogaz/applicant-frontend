/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW = 'table tbody tr:nth-child(1)'

describe('applicant user list', () => {
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
    document.cookie = `applicantApp=logged=true,id=test,email=test,company=1;`;
    cy.visit('http://localhost:3000/user/list')
  })

  it('title', () => {
    cy.get('h2').should('have.text', 'Usuarios')
  })

  it('search by rut', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(1)`).should('have.text', '15331265-6')
  })

  it('search by name', () => {
    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(2)`).should('contain', 'Edmundo')
  })

  it('search by email', () => {
    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(3)`).should('have.text', '1234@1234.cl')
  })

  it('search by company', () => {
    cy.get('#company').should('be.disabled')
    cy.get('#company').select('1', {force: true})
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(4)`).should('have.text', 'Applicant')
  })

  it('search by profile', () => {
    cy.get('#profile').select('1')
    cy.get('#search').click()
    cy.get(`${FILTER_TABLE_FIRST_ROW} td:nth-child(5)`).should('have.text', 'Administrador')
  })
})
