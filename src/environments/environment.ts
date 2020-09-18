// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  type: 'develop',
  baseUrl: 'https://bsp-api-qa.azurewebsites.net/parse/functions/',
  webUrl: 'https://banesco-seguros-dev.azurewebsites.net/',
  paseApplicationId: 'BSPAPQA',
  contentType: 'application/json'
};
