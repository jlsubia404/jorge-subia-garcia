import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';

import {
    HttpClient,
    HttpErrorResponse
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IApiConnectorServiceConfig } from '../interfaces/api-connector-service-config.interface';

@Injectable()
export class ApiConnectorService {
    config: IApiConnectorServiceConfig;

    constructor(
        private httpClient: HttpClient,
        @Inject('API_CONNECTOR_CONFIG') config: IApiConnectorServiceConfig
    ) {
        this.config = config;
    }

    getAPI<T>(relativePath: string, headers?: Record<string, string>): Observable<T> {

        const url = this.config.apiEndPoint + relativePath;
        return this.get(url, {
            headers: {
                ...this.getCommonHeadersAPI(),
                ...headers,
            },
        })
    }
    postAPI<T>(relativePath: string, params: any, headers?: Record<string, string>): Observable<T> {

        const url = this.config.apiEndPoint + relativePath;
        return this.post(url, params, {
            headers: {
                ...this.getCommonHeadersAPI(),
                ...headers,
            },
        })
    }

    post(url: string, params: any, options: any): Observable<any> {
        return this.httpClient
            .post<any>(url, params, options)
            .pipe(
                timeout(this.config.timeoutApi),
                retry(0),
                catchError(this.processError)
            );
    }
    public get(url: string, options?: any): Observable<any> {
        return this.httpClient
            .get(url, options)
            .pipe(
                timeout(this.config.timeoutApi),
                retry(0),
                catchError(this.processError)
            );
    }

    processError(err: any) {
        let message = '';
        if (err.error instanceof ErrorEvent) {
            message = err.error.message;
        } else if (err instanceof HttpErrorResponse) {
            message = err.error.message;
        } else {
            message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        console.log(message);
        return throwError(() => new Error(message));
    }

    private getCommonHeadersAPI() {
        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = { 'Content-Type': 'application/json', 'authorId': this.config.authorId };
        return headers;
    }


}
