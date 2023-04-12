/// <reference types="cypress" />

describe('applicant test ic instruction', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/public/test/disc/success`)
  })
  it('ic test instruction', () => {
    cy.get('header h1').should('have.text', 'Applicant')
  })
})
