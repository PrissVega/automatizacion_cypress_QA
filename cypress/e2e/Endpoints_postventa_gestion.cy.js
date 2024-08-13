// Define params al inicio del archivo
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

const normalizeDataOrdenCabecera = (data, defaultValues = {}) => {
  return Array.isArray(data) ? 
    data.map(item => ({ ...defaultValues, ...item })) :
    [ { ...defaultValues, ...data } ];
};

// Función para obtener tipos de datos
const getTypes = (obj) => {
  const types = Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, typeof value]));
  delete types.links; // Excluir la propiedad 'links'
  delete types.gestion_prin_cabecera; // Excluir 'gestion_prin_cabecera'
  delete types.agencias;
  return types;
};

describe('API Test SugarCRM/Gestion', () => {
  const compareApiAndDbData = (apiData, dbQuery) => {
    if (apiData && apiData.length > 0) {
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

      cy.task('queryDatabase', dbQuery)
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

          expect(JSON.stringify(apiTypes)).to.equal(JSON.stringify(dbTypes));
        });
    } else {
      cy.log('No se encontraron datos en la respuesta de la API.');
    }
  };

  // Para orden Cabecera
  const compareApiAndDbDataOrdenCabecera = (apiData, dbQuery) => {
    if (apiData && apiData.length > 0) {
      const normalizedApiDataOrdenCabecera = normalizeDataOrdenCabecera(apiData, {
        id: null,
        instancia_id: null,
        empresa_id: null,
        auto_id: null,
        gestion_id: null,
        ordTaller: null,
        ordFechaCrea: null,
        codOrdAsesor: null,
        nomOrdAsesor: null,
        codAgencia: null,
        nomAgencia: null
      });

      cy.task('queryDatabase', dbQuery)
        .then(datosDB => {
          const normalizedDbDataOrdenCabecera = normalizeDataOrdenCabecera(datosDB, {
            id: null,
            instancia_id: null,
            empresa_id: null,
            auto_id: null,
            gestion_id: null,
            ordTaller: null,
            ordFechaCrea: null,
            codOrdAsesor: null,
            nomOrdAsesor: null,
            codAgencia: null,
            nomAgencia: null
          });

          const apiTypes = getTypes(normalizedApiDataOrdenCabecera[0]);
          const dbTypes = getTypes(normalizedDbDataOrdenCabecera[0]);

          expect(JSON.stringify(apiTypes)).to.equal(JSON.stringify(dbTypes));
        });
    } else {
      cy.log('No se encontraron datos en la respuesta de la API.');
    }
  };

  it('should return a successful response from the API and compare types with DB data: SugarCRM_Gestion_gestion_all', () => {
    cy.request({
      url: 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_gestion?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
      method: 'GET',
      headers: params.headers,
      failOnStatusCode: false
    }).then(response => {
      compareApiAndDbData(response.body.data, 'SELECT PG.id,PG.instancia_id,POC.empresa_id,POC.codAgencia agencias,PG.auto_id,PG.gestion_prin_id,PG.gestion_general_tipo,PG.gestion_estado,PG.users_id,PG.usuarios3s_id,PG.usersugars_id,PG.ordenes,PG.oportunidades,PG.repuestos,PG.accesorios,PG.servicios,PG.stock,PG.total_inicial,PG.subtotal_inicialrepuestos,PG.subtotal_inicialservicios,PG.subtotal_inicialaccesorios,PG.recuperado,PG.rechazado,PG.pendiente,PG.cita_fecha,PG.llamada_fecha FROM postvetas_centra_v3.pvt_gestions PG inner join postvetas_centra_v3.pvt_orden_cabeceras POC on PG.auto_id = POC.auto_id;');
    });
  });

  it('should return a successful response from the API and compare types with DB data: SugarCRM_Gestion_gestion_individual', () => {
    cy.request({
      url: 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_gestion/4?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
      method: 'GET',
      headers: params.headers,
      failOnStatusCode: false
    }).then(response => {
      compareApiAndDbData(response.body.data, 'SELECT PG.id,PG.instancia_id,POC.empresa_id,POC.codAgencia agencias,PG.auto_id,PG.gestion_prin_id,PG.gestion_general_tipo,PG.gestion_estado,PG.users_id,PG.usuarios3s_id,PG.usersugars_id,PG.ordenes,PG.oportunidades,PG.repuestos,PG.accesorios,PG.servicios,PG.stock,PG.total_inicial,PG.subtotal_inicialrepuestos,PG.subtotal_inicialservicios,PG.subtotal_inicialaccesorios,PG.recuperado,PG.rechazado,PG.pendiente,PG.cita_fecha,PG.llamada_fecha FROM postvetas_centra_v3.pvt_gestions PG inner join postvetas_centra_v3.pvt_orden_cabeceras POC on PG.auto_id = POC.auto_id;');
    });
  });

  it('should return a successful response from the API and compare types with DB data: SugarCRM_Gestion_orden_cabecera', () => {
    cy.request({
      url: 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_gestion/1/ordenCabecera?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
      method: 'GET',
      headers: params.headers,
      failOnStatusCode: false
    }).then(response => {
      compareApiAndDbDataOrdenCabecera(response.body.data, 'SELECT PG.id, PG.instancia_id, PG.empresa_id, PG.auto_id, POC.gestion_id, POC.ordTaller, POC.ordFechaCrea, POC.codOrdAsesor, POC.nomOrdAsesor, POC.codAgencia, POC.nomAgencia FROM postvetas_centra_v3.pvt_gestions PG inner join postvetas_centra_v3.pvt_orden_cabeceras POC on PG.id = POC.id and PG.instancia_id = POC.instancia_id and PG.empresa_id = POC.empresa_id');
    });
  });
});
