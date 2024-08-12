const fs = require('fs');

describe('API Test', () => {
  const url = 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_ordencabecera/1?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2';
  const params = {
    headers: {
      Authorization: 'Bearer 215|aMUuQFQaJ14Xar9eU2k55VChiyDgwRsqKos9SshU',
      'Content-Type': 'application/json'
    }
  };

  const normalizeApiDataGestionAll = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        id: item.id,
        instancia_id: item.instancia_id,
        empresa_id: item.empresa_id,
        agencias: item.agencias || null,
        auto_id: item.auto_id,
        gestion_prin_id: item.gestion_prin_id || null,
        gestion_general_tipo: item.gestion_general_tipo || null,
        gestion_estado: item.gestion_estado || null,
        users_id: item.users_id || null,
        usuarios3s_id: item.usuarios3s_id || null,
        usersugars_id: item.usersugars_id || null,
        ordenes: item.ordenes || null,
        oportunidades: item.oportunidades || null,
        repuestos: item.repuestos || null,
        accesorios: item.accesorios || null,
        servicios: item.servicios || null,
        stock: item.stock || null,
        total_inicial: item.total_inicial || null,
        subtotal_inicialrepuestos: item.subtotal_inicialrepuestos || null,
        subtotal_inicialservicios: item.subtotal_inicialservicios || null,
        subtotal_inicialaccesorios: item.subtotal_inicialaccesorios || null,
        recuperado: item.recuperado || null,
        rechazado: item.rechazado || null,
        pendiente: item.pendiente || null,
        cita_fecha: item.cita_fecha || null,
        llamada_fecha: item.llamada_fecha || null
      }));
    } else if (typeof data === 'object' && data !== null) {
      return [{
        id: data.id,
        instancia_id: data.instancia_id,
        empresa_id: data.empresa_id,
        agencias: data.agencias || null,
        auto_id: data.auto_id,
        gestion_prin_id: data.gestion_prin_id || null,
        gestion_general_tipo: data.gestion_general_tipo || null,
        gestion_estado: data.gestion_estado || null,
        users_id: data.users_id || null,
        usuarios3s_id: data.usuarios3s_id || null,
        usersugars_id: data.usersugars_id || null,
        ordenes: data.ordenes || null,
        oportunidades: data.oportunidades || null,
        repuestos: data.repuestos || null,
        accesorios: data.accesorios || null,
        servicios: data.servicios || null,
        stock: data.stock || null,
        total_inicial: data.total_inicial || null,
        subtotal_inicialrepuestos: data.subtotal_inicialrepuestos || null,
        subtotal_inicialservicios: data.subtotal_inicialservicios || null,
        subtotal_inicialaccesorios: data.subtotal_inicialaccesorios || null,
        recuperado: data.recuperado || null,
        rechazado: data.rechazado || null,
        pendiente: data.pendiente || null,
        cita_fecha: data.cita_fecha || null,
        llamada_fecha: data.llamada_fecha || null
      }];
    } else {
      throw new Error('Data format is not supported');
    }
  };

  const normalizeDbDataGestionAll = (data) => {
    return data.map(item => ({
      id: item.id,
      instancia_id: item.instancia_id,
      empresa_id: item.empresa_id,
      agencias: item.agencias,
      auto_id: item.auto_id,
      gestion_prin_id: item.gestion_prin_id,
      gestion_general_tipo: item.gestion_general_tipo,
      gestion_estado: item.gestion_estado,
      users_id: item.users_id,
      usuarios3s_id: item.usuarios3s_id,
      usersugars_id: item.usersugars_id,
      ordenes: item.ordenes,
      oportunidades: item.oportunidades,
      repuestos: item.repuestos,
      accesorios: item.accesorios,
      servicios: item.servicios,
      stock: item.stock,
      total_inicial: item.total_inicial,
      subtotal_inicialrepuestos: item.subtotal_inicialrepuestos,
      subtotal_inicialservicios: item.subtotal_inicialservicios,
      subtotal_inicialaccesorios: item.subtotal_inicialaccesorios,
      recuperado: item.recuperado,
      rechazado: item.rechazado,
      pendiente: item.pendiente,
      cita_fecha: item.cita_fecha,
      llamada_fecha: item.llamada_fecha
    }));
  };

  // Función para obtener los tipos de datos
  const getTypes = (obj) => {
    const types = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        types[key] = typeof obj[key];
      }
    }
    return types;
  };

  // Función para transformar datos de la API
  function transformApiTypes(apiTypes) {
    return {
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
      cita_fecha: apiTypes.cita_fecha, // Si `cita_fecha` ya es un objeto, déjalo tal como está
      llamada_fecha: apiTypes.llamada_fecha // Si `llamada_fecha` ya es un objeto, déjalo tal como está
    };
  }

  it('should return a successful response from the API and compare types with DB data', () => {
    cy.request({
      url,
      method: 'GET',
      headers: params.headers,
    }).then(response => {
      cy.log('API Response:', JSON.stringify(response.body, null, 2));
      
      const result = {
        status: response.status,
        hasData: response.body.data && response.body.data.length > 0,
        apiData: response.body.data,
      };

      cy.log('result.hasData:', result.hasData);

      if (result.hasData) {
        const apiData = result.apiData;
        const normalizeApiDataGestionAllResult = normalizeApiDataGestionAll(apiData);

        // Realiza la consulta a la base de datos
        cy.task('queryDatabase', 'SELECT ...')
          .then(datosDB => {
            cy.log('DB Data:', JSON.stringify(datosDB, null, 2));
            const normalizeDbDataGestionAllResult = normalizeDbDataGestionAll(datosDB);

            // Comparar los tipos de datos
            const apiTypes = getTypes(normalizeApiDataGestionAllResult[0]);
            const dbTypes = getTypes(normalizeDbDataGestionAllResult[0]);

            // Generar el reporte
            result.apiTypes = apiTypes;
            result.dbTypes = dbTypes;
            result.comparison = {
              apiTypesMatch: JSON.stringify(apiTypes) === JSON.stringify(dbTypes)
            };

            // Guardar el resultado en un archivo usando cy.task
            cy.task('writeFile', { filePath: 'cypress/results/report.json', content: JSON.stringify(result, null, 2) });

            // Comprobar el resultado
            expect(result.comparison.apiTypesMatch).to.be.true;
          });
      } else {
        // Si no hay datos, registra el error
        cy.task('writeFile', { filePath: 'cypress/results/report.json', content: JSON.stringify(result, null, 2) });
        expect(result.hasData).to.be.true;
      }
    });
  });
});
