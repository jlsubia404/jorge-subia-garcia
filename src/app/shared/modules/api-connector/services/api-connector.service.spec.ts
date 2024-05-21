import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConnectorService } from './api-connector.service';
import { IApiConnectorServiceConfig } from '../interfaces/api-connector-service-config.interface';

describe('ApiConnectorService', () => {
    let service: ApiConnectorService;
    let httpMock: HttpTestingController;
    const mockConfig: IApiConnectorServiceConfig = {
        apiEndPoint: 'http://example.com/api',
        timeoutApi: 30000,
        authorId: '12345',
        isProduction: false
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ApiConnectorService,
                { provide: 'API_CONNECTOR_CONFIG', useValue: mockConfig }
            ]
        });
        service = TestBed.inject(ApiConnectorService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getAPI with correct URL and headers', () => {
        const mockResponse = { data: 'test' };
        service.getAPI('/test').subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://example.com/api/test');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('authorId')).toBe('12345');
        req.flush(mockResponse);
    });

    it('should call postAPI with correct URL, params and headers', () => {
        const mockResponse = { data: 'test' };
        const mockParams = { key: 'value' };
        service.postAPI('/test', mockParams).subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://example.com/api/test');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockParams);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('authorId')).toBe('12345');
        req.flush(mockResponse);
    });

    it('should handle errors correctly', (done) => {
        jest.spyOn(console, 'log');
        service.getAPI('/test').subscribe({
            next: () => fail('should have failed with 500 status'),
            error: (error: { message: any; }) => {
                done();
                expect(error.message).toBe('Error Code: 500\nMessage: Internal Server Error');
            }
        }
        );

        const req = httpMock.expectOne('http://example.com/api/test');
        req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

        //expect(console.log).toHaveBeenCalledWith('Error Code: 500\nMessage: Internal Server Error');
    });
});
