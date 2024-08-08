describe('Postventa process', () => {
  beforeEach(() => {
    // Puedes poner aquí las credenciales predeterminadas si es necesario
    cy.visit('http://localhost:9000/#/');
  });

  const login = (email, password) => {
    cy.get('input[placeholder="Correo electronico"]').type(email);
    cy.get('input[placeholder="password"]').type(password);
    cy.get('.button').contains("Iniciar Sesión").click();
  };

  it('login with correct credentials', () => {
    login('wcadena@casabaca.com', 'wcadena@casabaca.com');
  });

  it('logout', () => {
    login('wcadena@casabaca.com', 'wcadena@casabaca.com');
    //Logica de cierre de sesión
    cy.wait(10000);
    cy.get(':nth-child(5) > .q-btn__content').click();
    cy.get(':nth-child(2) > .q-item__section--side').click();
  })

  it('login with incorrect credentials', () => {
    login('wcadena@casabaca.com', 'wrongpassword');
    // Añadir verificaciones si es necesario
  });

  it('postventa access', () => {
    login('wcadena@casabaca.com', 'wcadena@casabaca.com'); // Credenciales predeterminadas
    cy.get('.call-card').click();
    // Verificaciones adicionales aquí si es necesario
  });

  it('find and select card', () => {
    login('wcadena@casabaca.com', 'wcadena@casabaca.com'); // Credenciales predeterminadas
    cy.get('.call-card').click();
    cy.get('input[placeholder="Placa o número de orden"]').type('MXAA52');
    cy.contains('button', 'Buscar').click();
    cy.contains('h2', 'PDS5736').parent('div.header-card').click();
    cy.contains('div', 'Usuario').click();
  });

  it('User details', () =>{
    login('wcadena@casabaca.com', 'wcadena@casabaca.com'); // Credenciales predeterminadas
    cy.get('.call-card').click();
    cy.get('input[placeholder="Placa o número de orden"]').type('MXAA52');
    cy.contains('button', 'Buscar').click();
    cy.contains('h2', 'PDS5736').parent('div.header-card').click();
    cy.contains('div', 'Usuario').click();
    cy.get(':nth-child(2) > .accordeon-data > .person-data > .header-person-data > .action-show').click();
    cy.get(':nth-child(3) > .header-data-container > .q-icon').click();
    cy.get(':nth-child(3) > .accordeon-data > .person-data > .header-person-data > .action-show').click();
  })

  it('Select opportunities for car', () =>{
    login('wcadena@casabaca.com', 'wcadena@casabaca.com'); // Credenciales predeterminadas
    cy.get('.call-card').click();
    cy.get('input[placeholder="Placa o número de orden"]').type('MXAA52');
    cy.contains('button', 'Buscar').click();
    cy.contains('h2', 'PDS5736').parent('div.header-card').click();
    cy.get('[style="border: 1px solid rgb(206, 206, 206); color: rgb(48, 48, 48); font-weight: 600; border-radius: 6px;"]').click();
    cy.get('.container-scroll-intern > :nth-child(3)').then($container => {
      const container = $container[0];
      
      // Encuentra el último elemento dentro del contenedor
      const lastElement = $container.find('.element-to-view').last()[0];
      
      if (lastElement) {
        container.scrollTop = lastElement.offsetTop;
      } else {
        console.error('No se encontró el último elemento.');
      }
    });
});
});