/// <reference types="cypress" />

describe('applicant test ic instruction', () => {
  beforeEach(() => {
    cy.intercept(`http://localhost:3000/public/test/instruction/${Cypress.env('test_ic_id')}`).as('instruction')
    cy.visit(`http://localhost:3000/public/test/instruction/${Cypress.env('test_ic_id')}`)
    cy.wait('@instruction')
  })
  it('ic test instruction', () => {
    cy.get('header h1').should('have.text', 'Applicant')
    cy.get('.display-4').should('have.text', 'TEST IC')
    cy.get('.lead').should('have.text', 'Evaluación de la aptitud para comprender e interpretar rápida y correctamente órdenes complejas.')
    cy.get('.jumbotron :nth-child(4)').should('have.text', 'Tienes 8 minutos para completar el test. Si te sales de la página, perderás tus respuestas. Es TÚ responsabilidad realizarlo de forma sensata. Buena suerte!')
    cy.get('.jumbotron a').should('have.text', 'Ir a la prueba')
    cy.get('.jumbotron a').should("have.attr", "href").and('include', `public/test/start?id=${Cypress.env('test_ic_id')}`)
    
    
  })
})
