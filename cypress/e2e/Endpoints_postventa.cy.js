const fs = require('fs');
const path = 'cypress/results';

const params = {
  headers: {
    Authorization: 'Bearer 215|aMUuQFQaJ14Xar9eU2k55VChiyDgwRsqKos9SshU',
    'Content-Type': 'application/json'
  }
};

// Función para normalizar datos
const normalizeData = (data, defaultValues = {}) => {
  return Array.isArray(data) ? 
    data.map(item => ({ ...defaultValues, ...item })) :
    [ { ...defaultValues, ...data } ];
};

// Función para obtener tipos de datos
const getTypes = (obj) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, typeof value]));
};

// Función para transformar tipos de datos
const transformApiTypes = (apiTypes) => ({
  id: Number(apiTypes.id),
  instancia_id: Number(apiTypes.instancia_id),
  empresa_id: Number(apiTypes.empresa_id),
  agencias: String(apiTypes.agencias),
  auto_id: Number(apiTypes.auto_id),
  gestion_prin_id: String(apiTypes.gestion_prin_id),
  gestion_general_tipo: String(apiTypes.gestion_general_tipo),
  gestion_estado: String(apiTypes.gestion_estado),
  users_id: Number(apiTypes.users_id),
  usuarios3s_id: Number(apiTypes.usuarios3s_id),
  usersugars_id: String(apiTypes.usersugars_id),
  ordenes: Number(apiTypes.ordenes),
  oportunidades: Number(apiTypes.oportunidades),
  repuestos: Number(apiTypes.repuestos),
  accesorios: Number(apiTypes.accesorios),
  servicios: Number(apiTypes.servicios),
  stock: Number(apiTypes.stock),
  total_inicial: Number(apiTypes.total_inicial),
  subtotal_inicialrepuestos: Number(apiTypes.subtotal_inicialrepuestos),
  subtotal_inicialservicios: Number(apiTypes.subtotal_inicialservicios),
  subtotal_inicialaccesorios: Number(apiTypes.subtotal_inicialaccesorios),
  recuperado: Number(apiTypes.recuperado),
  rechazado: Number(apiTypes.rechazado),
  pendiente: Number(apiTypes.pendiente),
  cita_fecha: apiTypes.cita_fecha,
  llamada_fecha: apiTypes.llamada_fecha
});

describe('API Test', () => {
  it('should return a successful response from the API and compare types with DB data: SugarCRM_Gestion_gestion_all', () => {
    cy.request({
      url:'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_ordencabecera/1?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
      method: 'GET',
      headers: params.headers,
      failOnStatusCode: false
    }).then(response => {
      const apiData = response.body.data;
      const hasData = apiData && apiData.length > 0;
      const result = {
        status: response.status,
        hasData,
        apiData
      };

      if (hasData) {
        const normalizedApiData = normalizeData(apiData, {
          id: null,
          instancia_id: null,
          empresa_id: null,
          agencias: null,
          auto_id: null,
          gestion_prin_id: null,
          gestion_general_tipo: null,
          gestion_estado: null,
          users_id: null,
          usuarios3s_id: null,
          usersugars_id: null,
          ordenes: null,
          oportunidades: null,
          repuestos: null,
          accesorios: null,
          servicios: null,
          stock: null,
          total_inicial: null,
          subtotal_inicialrepuestos: null,
          subtotal_inicialservicios: null,
          subtotal_inicialaccesorios: null,
          recuperado: null,
          rechazado: null,
          pendiente: null,
          cita_fecha: null,
          llamada_fecha: null
        });

        cy.task('queryDatabase', 'SELECT ...')
          .then(datosDB => {
            const normalizedDbData = normalizeData(datosDB, {
              id: null,
              instancia_id: null,
              empresa_id: null,
              agencias: null,
              auto_id: null,
              gestion_prin_id: null,
              gestion_general_tipo: null,
              gestion_estado: null,
              users_id: null,
              usuarios3s_id: null,
              usersugars_id: null,
              ordenes: null,
              oportunidades: null,
              repuestos: null,
              accesorios: null,
              servicios: null,
              stock: null,
              total_inicial: null,
              subtotal_inicialrepuestos: null,
              subtotal_inicialservicios: null,
              subtotal_inicialaccesorios: null,
              recuperado: null,
              rechazado: null,
              pendiente: null,
              cita_fecha: null,
              llamada_fecha: null
            });

            const apiTypes = getTypes(normalizedApiData[0]);
            const dbTypes = getTypes(normalizedDbData[0]);

            result.apiTypes = apiTypes;
            result.dbTypes = dbTypes;
            result.comparison = {
              apiTypesMatch: JSON.stringify(apiTypes) === JSON.stringify(dbTypes)
            };

            cy.task('writeFile', { filePath: 'cypress/results/report.json', content: JSON.stringify(result, null, 2) });

            expect(result.comparison.apiTypesMatch).to.be.true;
          });
      } else {
        cy.task('writeFile', { filePath: 'cypress/results/report.json', content: JSON.stringify(result, null, 2) });
        cy.log('No se encontraron datos en la respuesta de la API.');
      }
    });
  });
});