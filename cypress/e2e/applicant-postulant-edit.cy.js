/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW_SEXTH_COL = 'table tbody tr:nth-child(1) td:nth-child(6)'

describe('applicant', () => {
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
    cy.get('#name').type('test')
    cy.intercept(`${Cypress.env('api')}/postulants?name=test`).as('searchPostulantByName')
    cy.get('#search').click()
    cy.wait('@searchPostulantByName')
    //cy.intercept('http://localhost:3000/postulant/edit/1').as('edit')
    cy.get(`${FILTER_TABLE_FIRST_ROW_SEXTH_COL} a:nth-child(1)`).click()
  })

  it('edit', () => {
    cy.get('h2').should('have.text', 'Actualizar Postulante')
    cy.get('#rut').should('be.disabled')
    cy.get('#firstName').clear() 
    cy.get('#firstName').type('test')
    cy.get('#lastName').clear() 
    cy.get('#lastName').type('test')
    cy.get('#email').clear() 
    cy.get('#email').type('test@test.cl')
    cy.get('#age').clear() 
    cy.get('#age').type('87')
    cy.get('#sexo').select('femenino')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
  })
})
