import { HttpClientModule } from '@angular/common/http';
import { IApiConnectorServiceConfig } from './interfaces/api-connector-service-config.interface';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { ApiConnectorService } from './services/api-connector.sevice';


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        ApiConnectorService
    ],

})
export class ApiConnectorModule {

    constructor(@Optional() @SkipSelf() parentModule: ApiConnectorModule) {
        if (parentModule) {
            throw new Error(
                'ApiConnectorModule already loaded. Import it in the AppModule only'
            );
        }
    }
    static forRoot(config: IApiConnectorServiceConfig): ModuleWithProviders<ApiConnectorModule> {
        return {
            ngModule: ApiConnectorModule,
            providers: [
                { provide: 'API_CONNECTOR_CONFIG', useValue: config }
            ]
        };
    }
}