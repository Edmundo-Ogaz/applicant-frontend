/// <reference types="cypress" />

describe('applicant', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept('http://localhost:9000/.netlify/functions/server/users/login').as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('search by rut', () => {
    cy.visit('http://localhost:3000/test/ic/instruction?postulant=355826578262852096&company=1')
    cy.get('.display-4').should('have.text', 'TEST IC')
    cy.get('.lead').should('have.text', 'Evaluación de la aptitud para comprender e interpretar rápida y correctamente órdenes complejas.')
    cy.get('.jumbotron :nth-child(4)').should('have.text', 'Tienes 8 minutos para completar el test. Si te sales de la página, perderás tus respuestas. Es TÚ responsabilidad realizarlo de forma sensata. Buena suerte!')
    cy.get('.jumbotron a').should('have.text', 'Ir a la prueba')
    cy.get('.jumbotron a').should("have.attr", "href").and('include', "/test/ic/ic?postulant=")
    
    
  })
})
