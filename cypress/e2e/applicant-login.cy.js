/// <reference types="cypress" />

describe('applicant login', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/login').as('login')
    cy.visit('http://localhost:3000/login')
    cy.wait('@login')
  })

  it('login', () => {
    cy.get('#logo').should('have.text', 'Applicant')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.intercept(`${Cypress.env('api')}/users/login`,
    {
      statusCode: 201,
      body: 
        {
          id: "0",
          email: "test@test.cl"
        }
    }).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    //cy.intercept('http://localhost:3000/').as('home')
    //cy.wait('@home')
    cy.get('#logo').should('have.text', 'Applicant')
    cy.get('#username').should('have.text', 'test@test.cl')
    
  })
})
