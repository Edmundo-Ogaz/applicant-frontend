/// <reference types="cypress" />

describe('applicant assign test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('assign test postulant', () => {
    cy.visit('http://localhost:3000/test/assign')
    cy.get('h2').should('have.text', 'Asignar Test a Postulante')
    cy.get('#rut').type('3848123-1')
    cy.intercept(`${Cypress.env('api')}/postulants?company=1&rut=3848123-1`).as('getPostulant')
    cy.get('#search-button').click()
    cy.wait('@getPostulant')
    cy.get('#search-section :nth-child(3)').should('have.text', 'Nombre: Edmundo Dante del Carmen Ogaz Barahona')
    cy.get('#test fieldset div:nth-child(1) input').click()
    cy.get('#company').should('be.disabled')
    cy.get('#analyst').select('1')
    cy.intercept('POST', `${Cypress.env('api')}/postulants/1`,
    {
      statusCode: 200,
      body: 
        {
          sucess: true,
        }
    }).as('apisave')
    cy.get('#save-button').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
  })
})
