/// <reference types="cypress" />

describe('applicant test ceal test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type('1234')
    cy.get('#company').select('1')
    cy.intercept(`${Cypress.env('api')}/users/login`).as('login')
    cy.get('#login').click()
    cy.wait('@login')
  })

  it('ceal test', () => {
    cy.visit(`http://localhost:3000/public/test/start?id=${Cypress.env('test_ceal_id')}`)
    //cy.get('#time-alert').should('have.css', 'display', 'none') 
    // cy.get('#time-alert')
    //     .invoke('attr', 'style', 'display: block')
    //     .should('have.attr', 'style', 'display: block') 
    // cy.get('#time-alert').should('not.be.visible')
    // cy.get('#time-alert').invoke('show');
    // cy.get('#time-alert').should('have.text', 'Prepárate, quedan 2 minutos')
    
    cy.get('.questionary .box:nth-child(1) .question .col').should('have.text', 'Sus subordinados no han estado respondiendo a su conversación amistosa y a su obvio interés por el bienestar de ellos.  El rendimiento del grupo se ha mantenido bajo.')
    cy.get('.questionary .box:nth-child(1) .answer:nth-child(1) .col-11').should('have.text', 'Enfatizo el uso de procedimientos uniformes y la necesidad del cumplimiento de las tareas.')
    cy.get('.questionary .box:nth-child(1) .answer:nth-child(2) .col-11').should('have.text', 'Estoy disponible para la discusión, pero presiono.')
    cy.get('.questionary .box:nth-child(1) .answer:nth-child(3) .col-11').should('have.text', 'Hablo con los subordinados y luego establezco objetivos.')
    cy.get('.questionary .box:nth-child(1) .answer:nth-child(4) .col-11').should('have.text', 'Me cuido de no intervenir.')
    
    cy.get('.questionary .box:nth-child(2) .question .col').should('have.text', 'El rendimiento observable de su grupo está aumentando, Ud. se ha preocupado de que todos los miembros estén conscientes de sus funciones y normas.')
    cy.get('.questionary .box:nth-child(2) .answer:nth-child(1) .col-11').should('have.text', 'Me comprometo a la interacción amistosa, pero continúo asegurándome de que todos los miembros estén conscientes de sus funciones y normas de rendimiento.')
    cy.get('.questionary .box:nth-child(2) .answer:nth-child(2) .col-11').should('have.text', 'No ejecuto ninguna acción definida.')
    cy.get('.questionary .box:nth-child(2) .answer:nth-child(3) .col-11').should('have.text', 'Hago lo que puedo para que el grupo se sienta importante y comprometido.')
    cy.get('.questionary .box:nth-child(2) .answer:nth-child(4) .col-11').should('have.text', 'D)\tEnfatizo la importancia de las tareas y sus plazos.')
    
    cy.get('.questionary .box:nth-child(3) .question .col').should('have.text', 'Los miembros de su grupo se muestran incapaces de resolver un problema por su cuenta. Normalmente Ud. los ha dejado solos. El rendimiento y las relaciones interpersonales del grupo han estado buenas.')
    cy.get('.questionary .box:nth-child(3) .answer:nth-child(1) .col-11').should('have.text', 'Comprometo al grupo y juntos tratamos de resolver el problema.')
    cy.get('.questionary .box:nth-child(3) .answer:nth-child(2) .col-11').should('have.text', 'Dejo que el grupo lo resuelva.')
    cy.get('.questionary .box:nth-child(3) .answer:nth-child(3) .col-11').should('have.text', 'Actúo rápida y firmemente para corregir y reorientar.')
    cy.get('.questionary .box:nth-child(3) .answer:nth-child(4) .col-11').should('have.text', 'Estimulo al grupo para que trabaje en el problema y estoy disponible para la discusión.')
    
    cy.get('.questionary .box:nth-child(4) .question .col').should('have.text', 'Ud. está considerando un gran cambio. Sus subordinados tienen una buena historia de rendimiento. Ellos están de acuerdo con la necesidad de cambio.')
    cy.get('.questionary .box:nth-child(4) .answer:nth-child(1) .col-11').should('have.text', 'Permito que el grupo participe en el desarrollo del cambio, pero no presiono.')
    cy.get('.questionary .box:nth-child(4) .answer:nth-child(2) .col-11').should('have.text', 'Anuncio los cambios y los implemento con una supervisión estrecha.')
    cy.get('.questionary .box:nth-child(4) .answer:nth-child(3) .col-11').should('have.text', 'Permito que el grupo formule su propia dirección.')
    cy.get('.questionary .box:nth-child(4) .answer:nth-child(4) .col-11').should('have.text', 'Incorporo las recomendaciones del grupo pero dirijo el cambio.')
    
    cy.get('.questionary .box:nth-child(5) .question .col').should('have.text', 'El rendimiento de su grupo ha estado bajando en los últimos meses. Los miembros se han mostrado indiferentes con el cumplimiento de los objetivos propuestos. Continuamente ha sido necesario recordarles que hagan sus tareas a tiempo. En el pasado, el redefinir las funciones ha sido una ayuda.')
    cy.get('.questionary .box:nth-child(5) .answer:nth-child(1) .col-11').should('have.text', 'Permito que el grupo formule su propia dirección.')
    cy.get('.questionary .box:nth-child(5) .answer:nth-child(2) .col-11').should('have.text', 'Acojo recomendaciones del grupo, pero veo que se cumplan los objetivos.')
    cy.get('.questionary .box:nth-child(5) .answer:nth-child(3) .col-11').should('have.text', 'Redefino los objetivos y superviso cuidadosamente.')
    cy.get('.questionary .box:nth-child(5) .answer:nth-child(4) .col-11').should('have.text', 'Permito que el grupo participe en la definición de los objetivos, pero no presiono.')
    
    cy.get('.questionary .box:nth-child(6) .question .col').should('have.text', 'Ud. se incorporó a una situación manejada eficientemente. El administrador anterior era muy exigente. Ud. quiere mantener una situación productiva pero le gustaría comenzar a humanizar el ambiente.')
    //cy.get('.questionary .box:nth-child(6) .answer:nth-child(1) .col-11').should('have.text', 'Hago lo que puedo para que el grupo se sienta importante y comprometido.')
    cy.get('.questionary .box:nth-child(6) .answer:nth-child(2) .col-11').should('have.text', 'Enfatizo la importancia de las tareas y sus plazos.')
    cy.get('.questionary .box:nth-child(6) .answer:nth-child(3) .col-11').should('have.text', 'Me cuido de no intervenir.')
    cy.get('.questionary .box:nth-child(6) .answer:nth-child(4) .col-11').should('have.text', 'Hago que el grupo se comprometa en la toma de decisiones, pero veo que los objetivos se cumplan.')
    
    cy.get('.questionary .box:nth-child(7) .question .col').should('have.text', 'Ud. está considerando la posibilidad de realizar cambios mayores en la estructura de su organización. Los miembros del grupo han hecho algunas sugerencias acerca del cambio necesario. El grupo ha demostrado flexibilidad en sus operaciones diarias.')
    cy.get('.questionary .box:nth-child(7) .answer:nth-child(1) .col-11').should('have.text', 'Defino el cambio y superviso cuidadosamente.')
    cy.get('.questionary .box:nth-child(7) .answer:nth-child(2) .col-11').should('have.text', 'Obtengo sugerencias del grupo sobre el cambio y permito que los miembros organicen la implementación.')
    cy.get('.questionary .box:nth-child(7) .answer:nth-child(3) .col-11').should('have.text', 'Me muestro dispuesto a realizar los cambios recomendados, pero mantengo el control de la')
    cy.get('.questionary .box:nth-child(7) .answer:nth-child(4) .col-11').should('have.text', 'Evito la confrontación: dejo las cosas solas.')
    
    cy.get('.questionary .box:nth-child(8) .question .col').should('have.text', 'El rendimiento del grupo y las relaciones interpersonales son buenas. Ud. se siente inseguro acerca de cómo está dirigiendo el grupo.')
    cy.get('.questionary .box:nth-child(8) .answer:nth-child(1) .col-11').should('have.text', 'Dejo al grupo solo.')
    cy.get('.questionary .box:nth-child(8) .answer:nth-child(2) .col-11').should('have.text', 'Discuto la situación con el grupo y luego inicio los cambios necesarios.')
    cy.get('.questionary .box:nth-child(8) .answer:nth-child(3) .col-11').should('have.text', 'Doy algunos pasos para dirigir a mis subordinados para que trabajen de una manera bien definida.')
    cy.get('.questionary .box:nth-child(8) .answer:nth-child(4) .col-11').should('have.text', 'Tengo cuidado de no dañar las relaciones jefe - subordinados, siendo demasiado directivo.')
    
    cy.get('.questionary .box:nth-child(9) .question .col').should('have.text', 'Su superior le ha asignado la dirección de una tarea fuera del horario de trabajo, haciendo las recomendaciones requeridas para el cambio. El grupo no tiene claro sus objetivos. La asistencia a reuniones de trabajo ha estado pobre. Las sesiones se han transformado en reuniones sociales. Potencialmente el grupo tiene el talento necesario para ayudar.')
    cy.get('.questionary .box:nth-child(9) .answer:nth-child(1) .col-11').should('have.text', 'Dejo que el grupo lo resuelva.')
    cy.get('.questionary .box:nth-child(9) .answer:nth-child(2) .col-11').should('have.text', 'Incorporo las recomendaciones del grupo, pero veo que los objetivos se cumplan.')
    cy.get('.questionary .box:nth-child(9) .answer:nth-child(3) .col-11').should('have.text', 'Redefino los objetivos y superviso cuidadosamente.')
    cy.get('.questionary .box:nth-child(9) .answer:nth-child(4) .col-11').should('have.text', 'Permito que el grupo se comprometa estableciendo objetivos, pero no presiono.')
    
    cy.get('.questionary .box:nth-child(10) .question .col').should('have.text', 'Sus subordinados, generalmente capaces de asumir responsabilidades, no están respondiendo a su reciente redefinición de las normas.')
    cy.get('.questionary .box:nth-child(10) .answer:nth-child(1) .col-11').should('have.text', 'Permito que el grupo se comprometa en la redefinición de las normas, pero no presiono.')
    cy.get('.questionary .box:nth-child(10) .answer:nth-child(2) .col-11').should('have.text', 'Redefino las normas y superviso cuidadosamente.')
    cy.get('.questionary .box:nth-child(10) .answer:nth-child(3) .col-11').should('have.text', 'Evito la confrontación, no presionando.')
    cy.get('.questionary .box:nth-child(10) .answer:nth-child(4) .col-11').should('have.text', 'Incorporo recomendaciones del grupo, pero veo que se cumplan las nuevas normas.')
    
    cy.get('.questionary .box:nth-child(11) .question .col').should('have.text', 'Ud. ha sido promovido a una nueva posición. El supervisor anterior no estaba comprometido con los asuntos del grupo. El grupo ha manejado adecuadamente sus tareas y ese estilo de dirección. Las relaciones en el grupo son buenas.')
    cy.get('.questionary .box:nth-child(11) .answer:nth-child(1) .col-11').should('have.text', 'Doy pasos para dirigir a los subordinados a trabajar de una manera bien definida.')
    cy.get('.questionary .box:nth-child(11) .answer:nth-child(2) .col-11').should('have.text', 'Comprometo a los subordinados en la toma de decisiones y refuerzo las buenas contribuciones.')
    cy.get('.questionary .box:nth-child(11) .answer:nth-child(3) .col-11').should('have.text', 'Discuto el rendimiento pasado con el grupo y luego examino la necesidad de nuevas prácticas.')
    cy.get('.questionary .box:nth-child(11) .answer:nth-child(4) .col-11').should('have.text', 'Continúo dejando al grupo solo.')
    
    cy.get('.questionary .box:nth-child(12) .question .col').should('have.text', 'La información reciente indica la existencia de dificultades internas entre los subordinados. El grupo tiene una historia de excelentes logros. Los miembros han mantenido en forma efectiva los objetivos a largo plazo y han trabajado en armonía todo el año anterior. Todos están bien calificados para sus tareas.')
    cy.get('.questionary .box:nth-child(12) .answer:nth-child(1) .col-11').should('have.text', 'Pruebo una solución mía con los subordinados, mientras reviso la necesidad de nuevas práctica.')
    cy.get('.questionary .box:nth-child(12) .answer:nth-child(2) .col-11').should('have.text', 'Permito a los miembros del grupo que lo resuelvan por sí mismos.')
    cy.get('.questionary .box:nth-child(12) .answer:nth-child(3) .col-11').should('have.text', 'Actúo rápida y firmemente para corregir y reorientar.')
    cy.get('.questionary .box:nth-child(12) .answer:nth-child(4) .col-11').should('have.text', 'Estoy disponible para la discusión, pero tengo cuidado de no dañar las relaciones jefe- subordinados.')
    
    // cy.get('.questionary .box:nth-child(2) .answer:nth-child(4) .col-11').should('have.text', 'D) Enfatizo la importancia de las tareas y sus plazos.')
    // cy.get('.questionary .box:nth-child(7) .answer:nth-child(3) .col-11').should('have.text', 'Me muestro dispuesto a realizar los cambios recomendados, pero mantengo el control de la...')

    cy.get('.btn.btn-warning').should('have.text', 'Finalizar Test')
  })

  
})
