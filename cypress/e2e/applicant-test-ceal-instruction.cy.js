/// <reference types="cypress" />

describe('applicant test ceal instruction', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('ceal test instruction', () => {
    cy.visit(`http://localhost:3000/public/test/instruction/${Cypress.env('test_ceal_id')}`)
    cy.get('.display-4').should('have.text', 'TEST CEAL')
    cy.get('.lead').should('have.text', 'Instrucciones')
    cy.get('.jumbotron :nth-child(4)  li:nth-child(1)').should('have.text', ' - Esta prueba consta de 12 situaciones. ')
    cy.get('.jumbotron :nth-child(4)  li:nth-child(2)').should('have.text', ' - Lea cada situación atentamente y piense lo que Ud. haría en cada circunstancia. ')
    cy.get('.jumbotron :nth-child(4)  li:nth-child(3)').should('have.text', ' - Marque la letra de la alternativa que, según Ud., describe mejor su comportamiento en la situación que se presenta. ')
    cy.get('.jumbotron :nth-child(4)  li:nth-child(4)').should('have.text', ' - Debe marcar la elección para cada situación en la hoja de respuestas, colocando la letra A,B,C ó D que, según su opinión, describe mejor su comportamiento de líder. ')
    cy.get('.jumbotron :nth-child(4)  li:nth-child(5)').should('have.text', ' - No deje ninguna pregunta sin responder. ')
    cy.get('.jumbotron :nth-child(4)  li:nth-child(6)').should('have.text', ' - Responda con sinceridad y espontaneidad. ')
    cy.get('.jumbotron :nth-child(4)  li:nth-child(7)').should('have.text', ' - Es una prueba sin tiempo. ')
    cy.get('.jumbotron a').should('have.text', 'Ir a la prueba')
    cy.get('.jumbotron a').should("have.attr", "href").and('include', `public/test/start?id=${Cypress.env('test_ceal_id')}`)
    
    
  })
})
