/// <reference types="cypress" />

describe('applicant test ic instruction', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('ic test instruction', () => {
    cy.visit(`http://localhost:3000/public/test/instruction/${Cypress.env('test_disc_id')}`)
    cy.get('.display-4').should('have.text', 'TEST DISC')
    cy.get('.lead').should('have.text', 'CONTESTE CON SINCERIDAD SIN DETENERSE DEMASIADO TIEMPO EN CADA UNA')
    cy.get('.jumbotron :nth-child(4)').should('have.text', 'En cada uno de los 28 grupos de palabras, escoja la palabra que más lo(a) represente y márquela en la columna MAS y escoja una palabra que menos lo(a) represente y márquela en la columna MENOS.')
    cy.get('.jumbotron a').should('have.text', 'Ir a la prueba')
    cy.get('.jumbotron a').should("have.attr", "href").and('include', `public/test/start?id=${Cypress.env('test_disc_id')}`)
    
    
  })
})
