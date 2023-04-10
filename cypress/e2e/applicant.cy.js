/// <reference types="cypress" />

const FILTER_TABLE_FIRST_ROW_FIRST_CELL = 'table tbody tr:nth-child(1) td:nth-child(1)'
const FILTER_TABLE_FIRST_ROW_SECOND_COL = 'table tbody tr:nth-child(1) td:nth-child(2)'
const FILTER_TABLE_FIRST_ROW_SEXTH_COL = 'table tbody tr:nth-child(1) td:nth-child(6)'
const FILTER_TABLE_FIRST_ROW_SEVETH_COL = 'table tbody tr:nth-child(1) td:nth-child(7)'
const FILTER_TABLE_SECOND_ROW = 'table tbody tr:nth-child(2) td:nth-child(1)'

describe('applicant', () => {
  beforeEach(() => {
  })

  it('test', () => {
    cy.intercept('http://localhost:3000/login').as('home')
    cy.visit('http://localhost:3000/login')
    cy.wait('@home')
    cy.get('#logo').should('have.text', 'Applicant')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.get('#company').select('1')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('apiLogin')
    cy.get('#login').click()
    cy.wait('@apiLogin')
    cy.get('#logo').should('have.text', 'Applicant')
    cy.get('#username').should('have.text', 'test@test.cl')
   
    //USER
    cy.intercept('http://localhost:3000/user/list').as('userList')
    cy.visit('http://localhost:3000/user/list')
    cy.wait('@userList')
    
    cy.get('h2').should('have.text', 'Usuarios')

    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).should('have.text', '15331265-6')
    cy.get('#rut').clear()

    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).should('have.text', '15331265-6')
    cy.get('#name').clear()

    cy.get('#email').type('1234@1234.cl')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).should('have.text', '15331265-6')
    cy.get('#email').clear()

    cy.get('#company').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_ROW).should('have.text', '15331265-6')
    cy.get('#company').select('')

    cy.get('#profile').select('1')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_SECOND_ROW).should('have.text', '15331265-6')
    cy.get('#profile').select('')

    cy.get('#name').type('test')
    cy.get('#search').click()
    cy.intercept(`http://localhost:3000/user/edit/1`).as('edit')
    cy.get(`${FILTER_TABLE_FIRST_ROW_SEVETH_COL} a:nth-child(1)`).click()
    //cy.wait('@edit')

    cy.get('h2').should('have.text', 'Actualizar Usuario')
    cy.get('#rut').should('be.disabled')
    cy.get('#firstName').clear()
    cy.get('#firstName').type('test')
    cy.get('#lastName').clear()
    cy.get('#lastName').type('test')
    cy.get('#email').clear()
    cy.get('#email').type('test@test.cl')
    cy.get('#company').select('1')
    cy.get('#profile').select('1')
    cy.get('#save').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Saved')

    //POSTULANT
    cy.intercept('http://localhost:3000/postulant/list').as('postulantList')
    cy.visit('http://localhost:3000/postulant/list')
    cy.wait('@postulantList')
    cy.get('h2').should('have.text', 'Postulantes')
    
    cy.get('#rut').type('15331265-6')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).should('have.text', '15331265-6')
    cy.get('#rut').clear()

    cy.get('#name').type('Edmundo')
    cy.get('#search').click()
    cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).should('have.text', '15331265-6')
    cy.get('#name').clear()

    cy.get('#email').type('1234@1234.cl')
    cy.intercept(`${Cypress.env('api')}/postulants?email=1234@1234.cl`).as('searchPostulantByEmail')
    cy.get('#search').click()
    cy.wait('@searchPostulantByEmail')
    cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).should('have.text', '15331265-6')
    cy.get('#email').clear()

    cy.get('#name').type('test')
    cy.intercept(`${Cypress.env('api')}/postulants?name=test`).as('searchPostulantByName')
    cy.get('#search').click()
    cy.wait('@searchPostulantByName')
    //cy.intercept('http://localhost:3000/postulant/edit/1').as('edit')
    cy.get(`${FILTER_TABLE_FIRST_ROW_SEXTH_COL} a:nth-child(1)`).click()

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

    //ASSIGN
    cy.intercept('http://localhost:3000/test/assign').as('assign')
    cy.visit('http://localhost:3000/test/assign')
    cy.wait('@assign')
    cy.get('h2').should('have.text', 'Asignar Test a Postulante')
    
    cy.get('#rut').type('15331265-6')
    cy.intercept(`${Cypress.env('api')}/postulants?rut=*`).as('getPostulant')
    cy.get('#search-button').click()
    cy.wait('@getPostulant')
    cy.get('#search-section :nth-child(3)').should('have.text', 'Nombre: Edmundo Ogaz')
  
    cy.get('#rut').type('16847835-6')
    cy.intercept(`${Cypress.env('api')}/postulants?rut=*`).as('getPostulant')
    cy.get('#search-button').click()
    cy.wait('@getPostulant')
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'BAD_REQUEST')
    cy.wait(5000)
    cy.get('#rut').clear()

    cy.get('#rut').type('16847835-6')
    cy.intercept(`${Cypress.env('api')}/postulants?rut=*`).as('getPostulant')
    cy.get('#search-button').click()
    cy.wait('@getPostulant')
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'NOT_FOUND')
    cy.wait(5000)
    
    //SEARCH
    cy.intercept('http://localhost:3000/search').as('search')
    cy.visit('http://localhost:3000/search')
    cy.wait('@search')
    cy.get('h2').should('have.text', 'Buscar Tests')

    cy.get('#rut').type('15331265-6')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?rut=15331265-6&`).as('searchByRut')
    cy.get('#search').click()
    cy.wait('@searchByRut')
    cy.get(FILTER_TABLE_FIRST_ROW_SECOND_COL).should('have.text', '1234@1234.cl')
    cy.get('#rut').clear()

    cy.intercept(`${Cypress.env('api')}/tests/postulants?`).as('apiSearch')
    cy.get('#search').click()
    cy.wait('@apiSearch')

    cy.get('#name').type('Edmundo')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?name=Edmundo&`).as('searchByName')
    cy.get('#search').click()
    cy.wait('@searchByName')
    cy.get(FILTER_TABLE_FIRST_ROW_SECOND_COL).should('have.text', '1234@1234.cl')
    cy.get('#name').clear()
  
    cy.get('#search').click()
    cy.wait('@apiSearch')

    cy.get('#email').type('1234@1234.cl')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?email=1234@1234.cl&`).as('searchByEmail')
    cy.get('#search').click()
    cy.wait('@searchByEmail')
    cy.get(FILTER_TABLE_FIRST_ROW_SECOND_COL).should('have.text', '1234@1234.cl')
    cy.get('#email').clear()

    cy.get('#search').click()
    cy.wait('@apiSearch')

    cy.intercept(`${Cypress.env('api')}/users?companyId=1&profileId=2`).as('searchAnalysts')
    cy.get('#company').select('1')
    cy.wait('@searchAnalysts')
    cy.get('#email').type('1234@1234.cl')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?email=1234@1234.cl&company=1&`).as('searchByCompany')
    cy.get('#search').click()
    cy.wait('@searchByCompany')
    cy.get(FILTER_TABLE_FIRST_ROW_SECOND_COL).should('have.text', '1234@1234.cl')
    cy.get('#company').select('')
    cy.get('#email').clear()

    cy.get('#search').click()
    cy.wait('@apiSearch')

    cy.intercept(`${Cypress.env('api')}/users?companyId=1&profileId=2`).as('searchByCompanyAndState')
    cy.get('#company').select('1')
    cy.wait('@searchByCompanyAndState')
    cy.get('#analyst').select('1')
    cy.get('#email').type('1234@1234.cl')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?email=1234@1234.cl&company=1&analyst=1&`).as('searchByAnalyst')
    cy.get('#search').click()
    cy.wait('@searchByAnalyst')
    cy.get(FILTER_TABLE_FIRST_ROW_SECOND_COL).should('have.text', '1234@1234.cl')
    cy.get('#company').select('')
    cy.get('#analyst').select('')
    cy.get('#email').clear()

    cy.get('#search').click()
    cy.wait('@apiSearch')

    cy.get('#test').select('1')
    cy.get('#email').type('1234@1234.cl')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?email=1234@1234.cl&test=1&`).as('searchByTest')
    cy.get('#search').click()
    cy.wait('@searchByTest')
    cy.get(FILTER_TABLE_FIRST_ROW_SECOND_COL).should('have.text', '1234@1234.cl')
    cy.get('#test').select('')
    cy.get('#email').clear()

    cy.get('#search').click()
    cy.wait('@apiSearch')

    cy.get('#state').select('1')
    cy.get('#email').type('1234@1234.cl')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?email=1234@1234.cl&state=1&`).as('searchByState')
    cy.get('#search').click()
    cy.wait('@searchByState')
    cy.get(FILTER_TABLE_FIRST_ROW_SECOND_COL).should('have.text', '1234@1234.cl')
    cy.get('#state').select('')
    cy.get('#email').clear()

    cy.get('#search').click()
    cy.wait('@apiSearch')

    cy.get('#test').select('1')
    cy.get('#state').select('1')
    cy.intercept(`${Cypress.env('api')}/tests/postulants?test=1&state=1&`).as('searchByTestAndState')
    cy.get('#search').click()
    cy.wait('@searchByTestAndState')
    cy.get(FILTER_TABLE_FIRST_ROW_SEXTH_COL).should('have.text', 'pendiente')
    //cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).should("have.attr", "href").and('include', "/test/ic/instruction?postulant=")
  
    //cy.get(FILTER_TABLE_FIRST_ROW_FIRST_CELL).click()


    cy.visit('http://localhost:3000/public/test/ic/instruction/1')
    //cy.get('.modal-dialog').should('be.visible')
    cy.get('.display-4').should('have.text', 'TEST IC')
    cy.get('.lead').should('have.text', 'Evaluación de la aptitud para comprender e interpretar rápida y correctamente órdenes complejas.')
    cy.get('.jumbotron :nth-child(4)').should('have.text', 'Tienes 8 minutos para completar el test. Si te sales de la página, perderás tus respuestas. Es TÚ responsabilidad realizarlo de forma sensata. Buena suerte!')
    cy.get('.jumbotron a').should('have.text', 'Ir a la prueba')
    cy.get('.jumbotron a').should("have.attr", "href").and('include', "/public/test/ic/test?id=1")
    
  })
})
