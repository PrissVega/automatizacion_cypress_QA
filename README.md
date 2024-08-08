*Iniciar prueba cypress
1) Clonar repo:
   git clone 
2) Abrir raíz proyecto (visual studio code) o una terminal (cmd)
3) Ejecutar:
  npm install
4) Ejecutar:
   npx cypress open / npx cypress run (cual elegir se detalla más abajo)

******
Tipo de ejecuciones:
* Ejecutar en modo dev --> 
npx cypress open
* Ejecutar en modo headless (CI/CD) para verificar checklist de pruebas -->
npx cypress run
* Ejecutar prueba específica -->
  npx cypress run --spec "cypress/integration/test.js"
