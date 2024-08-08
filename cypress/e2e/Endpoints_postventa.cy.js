describe('API Test', () => {
    const url = 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_ordencabecera/1?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2';
    const params = {
      headers: {
        Authorization: 'Bearer 215|aMUuQFQaJ14Xar9eU2k55VChiyDgwRsqKos9SshU',
        'Content-Type': 'application/json'
      }
    };
  
    it('should return a successful response from the API: Orden_Cabecera-Orden_Cabecera_Individual', () => {
      cy.request({
        url,
        method: 'GET',
        headers: params.headers,
      }).then(response => {
        // Verifica que la respuesta tenga un estado 200
        expect(response.status).to.eq(200);
        
        // Verifica el contenido de la respuesta (opcional)
        expect(response.body).to.have.property('data');
  
        // Opcional: Verifica otros aspectos de la respuesta
        console.log('Response Body:', response.body);
      });
    });
  });
  