/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW_SEVETH_COL = 'table tbody tr:nth-child(1) td:nth-child(7)'

describe('applicant user edit', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/login').as('login')
    cy.visit('http://localhost:3000/login')
    cy.wait('@login')
    let x = document.cookie;
    console.log('cookies', x)
    //cy.getCookie('applicantApp').should('exist')
    cy.getCookie('applicantApp').should('not.exist')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.get('#company').select('1')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    cy.intercept('http://localhost:3000/user/list').as('userList')
    cy.visit('http://localhost:3000/user/list')
    cy.wait('@userList')
    cy.get('#rut').type('3848123-1')
    cy.get('#search').click()
    cy.intercept('http://localhost:3000/user/edit/*').as('edit')
    cy.get(`${FILTER_TABLE_FIRST_ROW_SEVETH_COL} a:nth-child(1)`).click()
    //cy.wait('@edit')
  })

  it('edit', () => {
    cy.get('h2').should('have.text', 'Actualizar Usuario')
    cy.get('#rut').should('be.disabled')
    cy.get('#firstName').clear()
    cy.get('#firstName').type('Edmundo Dante del Carmen')
    cy.get('#lastName').clear()
    cy.get('#lastName').type('Ogaz Barahona')
    cy.get('#email').clear()
    cy.get('#email').type('edmundo.ogaz@gmail.com.cl')
    cy.get('#company').should('be.disabled')
    cy.get('#company').select('1', {force: true})
    cy.get('#profile').select('1')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')
  })
})
