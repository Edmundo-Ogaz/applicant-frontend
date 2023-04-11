/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW_SEVETH_COL = 'table tbody tr:nth-child(1) td:nth-child(7)'

describe('applicant user password', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/login').as('login')
    cy.visit('http://localhost:3000/login')
    cy.wait('@login')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    cy.intercept('http://localhost:3000/user/list').as('userList')
    cy.visit('http://localhost:3000/user/list')
    cy.wait('@userList')
    cy.get('#rut').type('3848123-1')
    cy.get('#search').click()
    cy.intercept('http://localhost:3000/user/password/*').as('password')
    cy.get(`${FILTER_TABLE_FIRST_ROW_SEVETH_COL} img:nth-child(2)`).click()
    //cy.wait('@edit')
  })

  it('password', () => {
    cy.get('#modal #url').should("contain", "/user/password/")
  })
})
