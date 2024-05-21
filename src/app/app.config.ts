import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { ApiConnectorModule } from './shared/modules/api-connector/api-connector.module';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(ApiConnectorModule.forRoot({
    // TODO: colocar en el archivo de environment
    apiEndPoint: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net',
    isProduction: false,
    timeoutApi: 10000,
    authorId: '100'
  }))
  ]
};
