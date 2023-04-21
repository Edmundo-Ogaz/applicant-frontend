/// <reference types="cypress" />

describe('applicant postulant create', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
    cy.visit('http://localhost:3000/postulant/create')
  })

  it('create', () => {
    cy.get('h2').should('have.text', 'Crear Postulante')
  })
  it('create', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#birthday').type('1982-05-19')
    cy.get('#sexo').select('masculino')
    cy.intercept('POST', `${Cypress.env('api')}/postulants`,
    {
      statusCode: 200,
      body: 
        {
          sucess: true,
        }
    }).as('apisave')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Guardado')
  })
  it('rut already exist', () => {
    cy.get('#rut').type('15331265-6')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#birthday').type('1982-05-19')
    cy.get('#sexo').select('masculino')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'POSTULANT_EXIST')
  })
  it('email already exit', () => {
    cy.get('#rut').type('3838123-1')
    cy.get('#firstName').type('Edmundo')
    cy.get('#lastName').type('Ogaz')
    cy.get('#email').type('1234@1234.cl')
    cy.get('#birthday').type('1982-05-19')
    cy.get('#sexo').select('masculino')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'POSTULANT_EXIST')
  })
})
