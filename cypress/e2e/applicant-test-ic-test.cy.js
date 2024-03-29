/// <reference types="cypress" />

describe('applicant test ic test', () => {
  beforeEach(() => {
    cy.intercept(`http://localhost:3000/public/test/start?id=${Cypress.env('test_ic_id')}`).as('start')
    cy.visit(`http://localhost:3000/public/test/start?id=${Cypress.env('test_ic_id')}`)
    cy.wait('@start')
  })

  it('ic test header', () => {
    cy.get('header h1').should('have.text', 'Applicant')
  })

  it('ic test', () => {
    //cy.visit(`http://localhost:3000/public/test/start?id=${Cypress.env('test_ic_id')}`)
    //cy.get('#time-alert').should('have.css', 'display', 'none') 
    // cy.get('#time-alert')
    //     .invoke('attr', 'style', 'display: block')
    //     .should('have.attr', 'style', 'display: block') 
    // cy.get('#time-alert').should('not.be.visible')
    // cy.get('#time-alert').invoke('show');
    // cy.get('#time-alert').should('have.text', 'Prepárate, quedan 2 minutos')
    
    cy.get('#sidebar h1').should('have.text', 'TEST IC')
    cy.get('#sidebar ol li:nth-child(1)').should('have.text', 'Escriba una cruz (X) en la columna 1 a la altura de cada seguro de incendios o accidentes, desde 150.000 a 450.000 pesos inclusive, contratado entre el 15 de Marzo de 1975 y el 10 de Mayo de 1976.')
    cy.get('#sidebar ol li:nth-child(2)').should('have.text', 'Escriba una cruz (X) en la columna 2 a la altura de cada seguro de vida o accidentes, hasta 300.000 pesos inclusive, contratado entre el 15 de Octubre de 1975 y el 20 de Agosto de 1976.')
    cy.get('#sidebar ol li:nth-child(3)').should('have.text', 'Escriba una cruz (X) en la columna 3 a la altura de cada seguro de incendios o de vida, desde 200.000 a 500.000 pesos inclusive, contratado entre el 10 de Febrero de 1975 y el 15 de Junio de 1976.')
    //cy.get('#clock').should('have.text', 'Minutes: ')
    cy.get('#button_send').should('have.text', 'ENVIAR RESPUESTAS')
  })

  it('ic test labels', () => {
    //cy.visit(`http://localhost:3000/public/test/start?id=${Cypress.env('test_ic_id')}`)
    cy.get('#ic_form table thead tr th:nth-child(1)').should('have.text', 'CANTIDAD ASEGURADA')
    cy.get('#ic_form table thead tr th:nth-child(2)').should('have.text', 'CLASES DE SEGURO')
    cy.get('#ic_form table thead tr th:nth-child(3)').should('have.text', 'FECHA')
    cy.get('#ic_form table thead tr th:nth-child(4)').should('have.text', '1')
    cy.get('#ic_form table thead tr th:nth-child(5)').should('have.text', '2')
    cy.get('#ic_form table thead tr th:nth-child(6)').should('have.text', '3')

    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(1)').should('have.text', '300.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(2)').should('have.text', 'Incendios')
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(3)').should('have.text', '02/ene./76')
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(4) label input').should('have.value', '0')
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(5) label input').should('have.value', '25')
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(6) label input').should('have.value', '50')
    
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(1)').should('have.text', '100.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(3)').should('have.text', '22/oct./75')
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(4) label input').should('have.value', '1')
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(5) label input').should('have.value', '26')
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(6) label input').should('have.value', '51')
    
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(1)').should('have.text', '400.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(3)').should('have.text', '14/sep/75')
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(4) label input').should('have.value', '2')
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(5) label input').should('have.value', '27')
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(6) label input').should('have.value', '52')
    
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(1)').should('have.text', '200.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(3)').should('have.text', '13/nov./76')
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(4) label input').should('have.value', '3')
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(5) label input').should('have.value', '28')
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(6) label input').should('have.value', '53')
    
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(1)').should('have.text', '400.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(2)').should('have.text', 'Incendios')
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(3)').should('have.text', '17/may./76')
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(4) label input').should('have.value', '4')
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(5) label input').should('have.value', '29')
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(6) label input').should('have.value', '54')
    
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(1)').should('have.text', '300.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(3)').should('have.text', '12/oct./75')
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(4) label input').should('have.value', '5')
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(5) label input').should('have.value', '30')
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(6) label input').should('have.value', '55')
    
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(1)').should('have.text', '500.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(3)').should('have.text', '16/feb./76')
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(4) label input').should('have.value', '6')
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(5) label input').should('have.value', '31')
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(6) label input').should('have.value', '56')
    
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(1)').should('have.text', '100.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(2)').should('have.text', 'Incendios')
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(3)').should('have.text', '03/ago./76')
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(4) label input').should('have.value', '7')
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(5) label input').should('have.value', '32')
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(6) label input').should('have.value', '57')
  
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(1)').should('have.text', '400.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(2)').should('have.text', 'Incendios')
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(3)').should('have.text', '11/ago./76')
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(4) label input').should('have.value', '8')
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(5) label input').should('have.value', '33')
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(6) label input').should('have.value', '58')

    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(1)').should('have.text', '200.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(3)').should('have.text', '21/may./75')
    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(4) label input').should('have.value', '9')
    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(5) label input').should('have.value', '34')
    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(6) label input').should('have.value', '59')

    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(1)').should('have.text', '500.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(3)').should('have.text', '09/mar./75')
    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(4) label input').should('have.value', '10')
    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(5) label input').should('have.value', '35')
    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(6) label input').should('have.value', '60')

    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(1)').should('have.text', '300.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(2)').should('have.text', 'Incendios')
    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(3)').should('have.text', '17/jul./76')
    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(4) label input').should('have.value', '11')
    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(5) label input').should('have.value', '36')
    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(6) label input').should('have.value', '61')

    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(1)').should('have.text', '100.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(3)').should('have.text', '04/jun./76')
    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(4) label input').should('have.value', '12')
    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(5) label input').should('have.value', '37')
    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(6) label input').should('have.value', '62')

    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(1)').should('have.text', '100.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(3)').should('have.text', '23/nov./76')
    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(4) label input').should('have.value', '13')
    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(5) label input').should('have.value', '38')
    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(6) label input').should('have.value', '63')

    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(1)').should('have.text', '500.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(3)').should('have.text', '18/abr./75')
    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(4) label input').should('have.value', '14')
    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(5) label input').should('have.value', '39')
    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(6) label input').should('have.value', '64')

    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(1)').should('have.text', '200.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(3)').should('have.text', '24/dic./76')
    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(4) label input').should('have.value', '15')
    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(5) label input').should('have.value', '40')
    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(6) label input').should('have.value', '65')

    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(1)').should('have.text', '500.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(3)').should('have.text', '19/abr./75')
    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(4) label input').should('have.value', '16')
    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(5) label input').should('have.value', '41')
    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(6) label input').should('have.value', '66')

    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(1)').should('have.text', '200.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(3)').should('have.text', '07/dic./76')
    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(4) label input').should('have.value', '17')
    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(5) label input').should('have.value', '42')
    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(6) label input').should('have.value', '67')

    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(1)').should('have.text', '400.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(2)').should('have.text', 'Incendios')
    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(3)').should('have.text', '25/may./75')
    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(4) label input').should('have.value', '18')
    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(5) label input').should('have.value', '43')
    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(6) label input').should('have.value', '68')

    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(1)').should('have.text', '300.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(3)').should('have.text', '06/ene./76')
    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(4) label input').should('have.value', '19')
    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(5) label input').should('have.value', '44')
    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(6) label input').should('have.value', '69')

    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(1)').should('have.text', '500.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(3)').should('have.text', '29/mar./75')
    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(4) label input').should('have.value', '20')
    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(5) label input').should('have.value', '45')
    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(6) label input').should('have.value', '70')

    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(1)').should('have.text', '300.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(2)').should('have.text', 'Vida')
    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(3)').should('have.text', '28/jun./75')
    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(4) label input').should('have.value', '21')
    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(5) label input').should('have.value', '46')
    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(6) label input').should('have.value', '71')

    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(1)').should('have.text', '400.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(3)').should('have.text', '08/feb./76')
    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(4) label input').should('have.value', '22')
    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(5) label input').should('have.value', '47')
    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(6) label input').should('have.value', '72')

    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(1)').should('have.text', '100.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(2)').should('have.text', 'Incendios')
    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(3)').should('have.text', '27/jul./75')
    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(4) label input').should('have.value', '23')
    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(5) label input').should('have.value', '48')
    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(6) label input').should('have.value', '73')

    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(1)').should('have.text', '200.000 pesos')
    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(2)').should('have.text', 'Accidentes')
    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(3)').should('have.text', '21/ene./76')
    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(4) label input').should('have.value', '24')
    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(5) label input').should('have.value', '49')
    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(6) label input').should('have.value', '74')
  })

  it('ic test clicks', () => {
    cy.visit(`http://localhost:3000/public/test/start?id=${Cypress.env('test_ic_id')}`)
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(1) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(2) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(3) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(4) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(5) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(6) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(7) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(8) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(9) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(10) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(11) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(12) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(13) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(14) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(15) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(16) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(17) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(18) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(19) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(20) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(21) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(22) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(23) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(24) td:nth-child(6) label span').click()

    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(4) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(5) label span').click()
    cy.get('#ic_form table tbody tr:nth-child(25) td:nth-child(6) label span').click()
  })
})
