/// <reference types="cypress" />

describe('applicant', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
    cy.visit('http://localhost:3000/user/create')
  })

  it('title', () => {
    cy.get('h2').should('have.text', 'Crear Usuario')
  })
  it('create', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#company').should('be.disabled')
    cy.get('#company').select('1', {force: true})
    cy.get('#profile').select('1')
    cy.intercept('POST', `${Cypress.env('api')}/users`,
    {
      statusCode: 200,
      body: 
        {
          sucess: true,
        }
    }).as('apisave')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
  })
  it('rut already exit', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('edmundo.ogaz@gmail.cl')
    cy.get('#company').should('be.disabled')
    cy.get('#company').select('1', {force: true})
    cy.get('#profile').select('2')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'USER_EXIST')
  })
  it('email already exit', () => {
    cy.get('#rut').type('3838123-1')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#company').should('be.disabled')
    cy.get('#company').select('1', {force: true})
    cy.get('#profile').select('2')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'USER_EXIST')
  })
})
