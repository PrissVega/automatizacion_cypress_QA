const params = {
    headers: {
      Authorization: 'Bearer 215|aMUuQFQaJ14Xar9eU2k55VChiyDgwRsqKos9SshU',
      'Content-Type': 'application/json'
    }
  };
  
  // Función para normalizar datos
  const normalizeDataOrdenCabecera = (data, defaultValues = {}) => {
    return Array.isArray(data) ? 
      data.map(item => ({ ...defaultValues, ...item })) :
      [ { ...defaultValues, ...data } ];
  };
  
  // Función para normalizar datos detalle oportunidades
  const normalizeDataDetalleOportunidades = (data) => {
    return Array.isArray(data) ? 
      data.map(item => ({
        id: item.id,
        ws_log_id: item.ws_log_id,
        auto_id: item.auto_id,
        codAgencia: item.codAgencia,
        nomAgencia: item.nomAgencia,
        ordTaller: item.ordTaller,
        kmVehiculo: Number(item.kmVehiculo),
        kmRelVehiculo: Number(item.kmRelVehiculo),
        ordFechaCita: item.ordFechaCita,
        ordFechaCrea: item.ordFechaCrea,
        ordFchaCierre: item.ordFchaCierre,
        codOrdAsesor: item.codOrdAsesor,
        nomOrdAsesor: item.nomOrdAsesor,
        codServ: item.codServ,
        descServ: item.descServ,
        cantidad: Number(item.cantidad),
        cargosCobrar: item.cargosCobrar,
        tipoCL: item.tipoCL,
        facturado: item.facturado,
        tipoServ: item.tipoServ,
        franquicia: item.franquicia,
        codEstOrdTaller: item.codEstOrdTaller,
        lado: item.lado,
        flatLocal: item.flatLocal,
        codCliFactura: item.codCliFactura,
        nomUsuarioVista: item.nomUsuarioVista,
        cita_fecha: item.cita_fecha,
        s3s_codigo_seguimiento: item.s3s_codigo_seguimiento,
        s3s_codigo_estado_taller: item.s3s_codigo_estado_taller,
        s3s_usuarios3s_id: Number(item.s3s_usuarios3s_id),
        facturacion_fecha: item.facturacion_fecha,
        facturacion_agente: item.facturacion_agente,
        perdida_fecha: item.perdida_fecha,
        perdida_agente: item.perdida_agente,
        perdida_motivo: item.perdida_motivo,
        ganado_fecha: item.ganado_fecha,
        ganado_factura: item.ganado_factura,
        agendado_fecha: item.agendado_fecha,
        tipo_agendamiento: item.tipo_agendamiento,
        asunto_agendamiento: item.asunto_agendamiento,
        observacion_agendamiento: item.observacion_agendamiento,
        gestion_fecha: item.gestion_fecha,
        gestion_tipo: item.gestion_tipo,
        no_contesta_fecha: item.no_contesta_fecha,
        no_contesta_contador: Number(item.no_contesta_contador),
        no_contesta_mensaje: item.no_contesta_mensaje,
        created_at: item.created_at,
        updated_at: item.updated_at
      })) :
      [ /* ... mismo mapeo que arriba ... */ ];
  };
  
  // Función para obtener tipos de datos
  const getTypes = (obj) => {
    const types = Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, typeof value]));
    delete types.links; // Excluir propiedades irrelevantes
    delete types.gestion_prin_cabecera;
    delete types.agencias;
    delete types.oportunidad_id;
    delete types.claveunicaprincipal;
    delete types.descservtotal;
    delete types.claveunicaprincipaljson;
    delete types.nombre_estado_taller;
    delete types.claveunicaprincipals3s;
    delete types.claveunicaprincipals3svariable;
    delete types.idgestion;
    delete types.primergestioestado;
    delete types.gestionestados;
    delete types.stock_avalible;
    return types;
  };
  
  describe('API Test SugarCRM/OrdenCabecera', () => {
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
          .then(datosDBOrdenCabecera => {
            const normalizedDbDataOrdenCabecera = normalizeDataOrdenCabecera(datosDBOrdenCabecera, {
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
  
            console.log('Normalized API Data:', normalizedApiDataOrdenCabecera);
            console.log('Normalized DB Data:', normalizedDbDataOrdenCabecera);
  
            const apiTypes = getTypes(normalizedApiDataOrdenCabecera[0]);
            const dbTypes = getTypes(normalizedDbDataOrdenCabecera[0]);

            console.log('API Data Types:', apiTypes);
            console.log('DB Data Types:', dbTypes);    
  
            // Comparar los tipos de datos de API y DB
            Object.entries(apiTypes).forEach(([key, type]) => {
              const dbType = dbTypes[key];
              if (type !== dbType) {
                console.log(`Tipo de dato para ${key}: API (${type}) vs DB (${dbType})`);
              }
              expect(type).to.equal(dbType, `Tipo de dato para ${key} no coincide.`);
            });
  
            // Comparar las cabeceras de los datos
            const apiHeaders = Object.keys(normalizedApiDataOrdenCabecera[0]);
            const dbHeaders = Object.keys(normalizedDbDataOrdenCabecera[0]);
  
            apiHeaders.forEach(header => {
                if (!dbHeaders.includes(header)) {
                    console.log(`Falta el encabezado ${header} en la base de datos.`);
                  }
                  expect(dbHeaders).to.include(header, `Falta el encabezado ${header} en la base de datos.`);
                });
  
            dbHeaders.forEach(header => {
                if (!apiHeaders.includes(header)) {
                    console.log(`Falta el encabezado ${header} en la API.`);
                  }
                  expect(apiHeaders).to.include(header, `Falta el encabezado ${header} en la API.`);
                });
          });
      }
    };
  
    const compareApiAndDbDataDetalleOportunidades = (apiData, dbQuery) => {
      if (apiData && apiData.length > 0) {
        const normalizedApiDetalleOportunidades = normalizeDataDetalleOportunidades(apiData, {
          id: null,
          ws_log_id: null,
          auto_id: null,
          codAgencia: null,
          nomAgencia: null,
          ordTaller: null,
          kmVehiculo: null,
          kmRelVehiculo: null,
          ordFechaCita: null,
          ordFechaCrea: null,
          ordFchaCierre: null,
          codOrdAsesor: null,
          nomOrdAsesor: null,
          codServ: null,
          descServ: null,
          cantidad: null,
          cargosCobrar: null,
          tipoCL: null,
          facturado: null,
          tipoServ: null,
          franquicia: null,
          codEstOrdTaller: null,
          lado: null,
          flatLocal: null,
          codCliFactura: null,
          nomUsuarioVista: null,
          cita_fecha: null,
          s3s_codigo_seguimiento: null,
          s3s_codigo_estado_taller: null,
          s3s_usuarios3s_id: null,
          facturacion_fecha: null,
          facturacion_agente: null,
          perdida_fecha: null,
          perdida_agente: null,
          perdida_motivo: null,
          ganado_fecha: null,
          ganado_factura: null,
          agendado_fecha: null,
          tipo_agendamiento: null,
          asunto_agendamiento: null,
          observacion_agendamiento: null,
          gestion_fecha: null,
          gestion_tipo: null,
          no_contesta_fecha: null,
          no_contesta_contador: null,
          no_contesta_mensaje: null,
          created_at: null,
          updated_at: null
        });
  
        cy.task('queryDatabase', dbQuery)
          .then(datosDB => {
            const normalizedDbDataDetalleOportunidades = normalizeDataDetalleOportunidades(datosDB, {
              id: null,
              ws_log_id: null,
              auto_id: null,
              codAgencia: null,
              nomAgencia: null,
              ordTaller: null,
              kmVehiculo: null,
              kmRelVehiculo: null,
              ordFechaCita: null,
              ordFechaCrea: null,
              ordFchaCierre: null,
              codOrdAsesor: null,
              nomOrdAsesor: null,
              codServ: null,
              descServ: null,
              cantidad: null,
              cargosCobrar: null,
              tipoCL: null,
              facturado: null,
              tipoServ: null,
              franquicia: null,
              codEstOrdTaller: null,
              lado: null,
              flatLocal: null,
              codCliFactura: null,
              nomUsuarioVista: null,
              cita_fecha: null,
              s3s_codigo_seguimiento: null,
              s3s_codigo_estado_taller: null,
              s3s_usuarios3s_id: null,
              facturacion_fecha: null,
              facturacion_agente: null,
              perdida_fecha: null,
              perdida_agente: null,
              perdida_motivo: null,
              ganado_fecha: null,
              ganado_factura: null,
              agendado_fecha: null,
              tipo_agendamiento: null,
              asunto_agendamiento: null,
              observacion_agendamiento: null,
              gestion_fecha: null,
              gestion_tipo: null,
              no_contesta_fecha: null,
              no_contesta_contador: null,
              no_contesta_mensaje: null,
              created_at: null,
              updated_at: null
            });
  
            console.log('Normalized API Data:', normalizedApiDetalleOportunidades);
            console.log('Normalized DB Data:', normalizedDbDataDetalleOportunidades);
  
            const apiTypes = getTypes(normalizedApiDetalleOportunidades[0]);
            const dbTypes = getTypes(normalizedDbDataDetalleOportunidades[0]);
  
            console.log('API Data Types:', apiTypes);
            console.log('DB Data Types:', dbTypes);  
            
            // Comparar los tipos de datos de API y DB
            Object.entries(apiTypes).forEach(([key, type]) => {
              const dbType = dbTypes[key];
              expect(type).to.equal(dbType, `Tipo de dato para ${key} no coincide.`);
            });
  
            // Comparar las cabeceras de los datos
            const apiHeaders = Object.keys(normalizedApiDetalleOportunidades[0]);
            const dbHeaders = Object.keys(normalizedDbDataDetalleOportunidades[0]);
  
            apiHeaders.forEach(header => {
              expect(dbHeaders).to.include(header, `Falta el encabezado ${header} en la base de datos.`);
            });
  
            dbHeaders.forEach(header => {
              expect(apiHeaders).to.include(header, `Falta el encabezado ${header} en la API.`);
            });
          });
      }
    };
  
    it('should return a successful response from the API and compare types with DB data: SugarCRM_OrdenCabecera_ordenCabecera_all', () => {
      cy.request({
        method: 'GET',
        url: 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_ordencabecera?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
        headers: params.headers
      }).then(response => {
        const dbQuery = 'SELECT PG.id, PG.instancia_id, PG.empresa_id, PG.auto_id, POC.gestion_id, POC.ordTaller, POC.ordFechaCrea, POC.codOrdAsesor, POC.nomOrdAsesor, POC.codAgencia, POC.nomAgencia FROM postvetas_centra_v3.pvt_gestions PG inner join postvetas_centra_v3.pvt_orden_cabeceras POC on PG.id = POC.id and PG.instancia_id = POC.instancia_id and PG.empresa_id = POC.empresa_id'; 
        compareApiAndDbDataOrdenCabecera(response.body, dbQuery);
      });
    });
  
    it('should return a successful response from the API and compare types with DB data: SugarCRM_OrdenCabecera_ordenCabecera_individual', () => {
        cy.request({
          url: 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_ordencabecera/1?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
          method: 'GET',
          headers: params.headers,
          failOnStatusCode: false
        }).then(response => {
          compareApiAndDbDataOrdenCabecera(response.body.data, 'SELECT PG.id, PG.instancia_id, PG.empresa_id, PG.auto_id, POC.gestion_id, POC.ordTaller, POC.ordFechaCrea, POC.codOrdAsesor, POC.nomOrdAsesor, POC.codAgencia, POC.nomAgencia FROM postvetas_centra_v3.pvt_gestions PG inner join postvetas_centra_v3.pvt_orden_cabeceras POC on PG.id = POC.id and PG.instancia_id = POC.instancia_id and PG.empresa_id = POC.empresa_id');
        });
      });
      
    it('should return a successful response from the API and compare types with DB data: SugarCRM_OrdenCabecera_detalleGestionOportunidades_all', () => {
      cy.request({
        method: 'GET',
        url: 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_ordencabecera/1/detallegestionoportunidades_todos?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
        headers: params.headers
      }).then(response => {
        const dbQuery = 'SELECT PG.id, DGO.ws_log_id, PG.auto_id, POC.codAgencia, POC.nomAgencia, POC.ordTaller, DGO.kmVehiculo, DGO.kmRelVehiculo, DGO.ordFechaCita, POC.ordFechaCrea, DGO.ordFchaCierre, POC.codOrdAsesor, POC.nomOrdAsesor, DGO.codServ, DGO.descServ, DGO.cantidad, DGO.cargosCobrar, DGO.tipoCL, DGO.facturado, DGO.tipoServ, DGO.franquicia, DGO.codEstOrdTaller, DGO.lado, DGO.flatLocal, DGO.codCliFactura, DGO.nomUsuarioVista, DGO.cita_fecha, DGO.s3s_codigo_seguimiento, DGO.s3s_codigo_estado_taller, DGO.s3s_usuarios3s_id, DGO.facturacion_fecha, DGO.facturacion_agente, DGO.perdida_fecha, DGO.perdida_agente, DGO.perdida_motivo, DGO.ganado_fecha, DGO.ganado_factura, DGO.agendado_fecha, DGO.tipo_agendamiento, DGO.asunto_agendamiento, DGO.observacion_agendamiento, DGO.gestion_fecha, DGO.gestion_tipo, DGO.no_contesta_fecha, DGO.no_contesta_contador, DGO.no_contesta_mensaje, DGO.created_at, DGO.updated_at FROM postvetas_centra_v3.pvt_gestions PG inner join postvetas_centra_v3.pvt_orden_cabeceras POC on PG.id = POC.id inner join postvetas_centra_v3.pvt_detalle_gestion_oportunidades DGO on PG.id = DGO.id';
        compareApiAndDbDataDetalleOportunidades(response.body, dbQuery);
      });
    });

    it('should return a successful response from the API and compare types with DB data: SugarCRM_OrdenCabecera_detalleGestionOportunidades_individual', () => {
      cy.request({
        method: 'GET',
        url: 'https://api-sugarcrm.casabaca.loc/api/v2/postventa/sugar_ordencabecera/1/detalleGestionOportunidades?appId=c81e728d9d4c2f636f067f89cc14862c&usuId=2',
        headers: params.headers
      }).then(response => {
        const dbQuery = 'SELECT PG.id, DGO.ws_log_id, PG.auto_id, POC.codAgencia, POC.nomAgencia, POC.ordTaller, DGO.kmVehiculo, DGO.kmRelVehiculo, DGO.ordFechaCita, POC.ordFechaCrea, DGO.ordFchaCierre, POC.codOrdAsesor, POC.nomOrdAsesor, DGO.codServ, DGO.descServ, DGO.cantidad, DGO.cargosCobrar, DGO.tipoCL, DGO.facturado, DGO.tipoServ, DGO.franquicia, DGO.codEstOrdTaller, DGO.lado, DGO.flatLocal, DGO.codCliFactura, DGO.nomUsuarioVista, DGO.cita_fecha, DGO.s3s_codigo_seguimiento, DGO.s3s_codigo_estado_taller, DGO.s3s_usuarios3s_id, DGO.facturacion_fecha, DGO.facturacion_agente, DGO.perdida_fecha, DGO.perdida_agente, DGO.perdida_motivo, DGO.ganado_fecha, DGO.ganado_factura, DGO.agendado_fecha, DGO.tipo_agendamiento, DGO.asunto_agendamiento, DGO.observacion_agendamiento, DGO.gestion_fecha, DGO.gestion_tipo, DGO.no_contesta_fecha, DGO.no_contesta_contador, DGO.no_contesta_mensaje, DGO.created_at, DGO.updated_at FROM postvetas_centra_v3.pvt_gestions PG inner join postvetas_centra_v3.pvt_orden_cabeceras POC on PG.id = POC.id inner join postvetas_centra_v3.pvt_detalle_gestion_oportunidades DGO on PG.id = DGO.id';
        compareApiAndDbDataDetalleOportunidades(response.body, dbQuery);
      });
    });
  });
  