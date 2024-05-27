import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductManagerService } from './product-manager.service';
import { ApiConnectorService } from '../../api-connector/services/api-connector.service';
import { Product } from '../interfaces/product.interface';

describe('ProductManagerService', () => {
    let service: ProductManagerService;
    let apiConnectorMock: any;

    beforeEach(() => {
        apiConnectorMock = {
            getAPI: jest.fn(),
            postAPI: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                ProductManagerService,
                { provide: ApiConnectorService, useValue: apiConnectorMock }
            ]
        });

        service = TestBed.inject(ProductManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getProductList and return product list', (done) => {
        const mockProductList = [{ id: '1', name: 'Product 1' }];
        apiConnectorMock.getAPI.mockReturnValue(of(mockProductList));

        service.getProductList().subscribe((products) => {
            expect(products).toEqual(mockProductList);
            expect(apiConnectorMock.getAPI).toHaveBeenCalledWith(service['CONTEXT_GET_PRODUCT_LIST']);
            done();
        });
    });

    it('should call saveProduct and return success when id does not exist', (done) => {
        const mockProduct: Product = {
            id: '2',
            name: 'Product 2',
            description: 'Description 2',
            logo: 'logo2.png',
            releaseDate: '2023-05-27',
            revisionDate: '2024-05-27'
        };
        apiConnectorMock.getAPI.mockReturnValueOnce(of(false));
        apiConnectorMock.postAPI.mockReturnValueOnce(of({ success: true }));

        service.saveProduct(mockProduct).subscribe((result) => {
            expect(result).toEqual({ success: true });
            expect(apiConnectorMock.getAPI).toHaveBeenCalledWith(`${service['CONTEXT_VALIDATE_ID']}?id=${mockProduct.id}`);
            expect(apiConnectorMock.postAPI).toHaveBeenCalledWith(service['CONTEXT_CREATE_PRODUCT'], {
                id: mockProduct.id,
                name: mockProduct.name,
                description: mockProduct.description,
                logo: mockProduct.logo,
                date_release: mockProduct.releaseDate,
                date_revision: mockProduct.revisionDate
            });
            done();
        });
    });

    it('should throw error when saveProduct is called and id already exists', (done) => {
        const mockProduct: Product = {
            id: '3',
            name: 'Product 3',
            description: 'Description 3',
            logo: 'logo3.png',
            releaseDate: '2023-05-27',
            revisionDate: '2024-05-27'
        };
        apiConnectorMock.getAPI.mockReturnValueOnce(of(true));

        service.saveProduct(mockProduct).subscribe({
            next: () => {
                // This block should not be executed
            },
            error: (err) => {
                expect(err).toEqual(new Error('Id ya existe.'));
                expect(apiConnectorMock.getAPI).toHaveBeenCalledWith(`${service['CONTEXT_VALIDATE_ID']}?id=${mockProduct.id}`);
                expect(apiConnectorMock.postAPI).not.toHaveBeenCalled();
                done();
            }
        });
    });

    it('should handle error when postAPI fails in saveProduct', (done) => {
        const mockProduct: Product = {
            id: '4',
            name: 'Product 4',
            description: 'Description 4',
            logo: 'logo4.png',
            releaseDate: '2023-05-27',
            revisionDate: '2024-05-27'
        };
        apiConnectorMock.getAPI.mockReturnValueOnce(of(false));
        apiConnectorMock.postAPI.mockReturnValueOnce(throwError(new Error('Save failed')));

        service.saveProduct(mockProduct).subscribe({
            next: () => {
                // This block should not be executed
            },
            error: (err) => {
                expect(err).toEqual(new Error('Save failed'));
                expect(apiConnectorMock.getAPI).toHaveBeenCalledWith(`${service['CONTEXT_VALIDATE_ID']}?id=${mockProduct.id}`);
                expect(apiConnectorMock.postAPI).toHaveBeenCalledWith(service['CONTEXT_CREATE_PRODUCT'], {
                    id: mockProduct.id,
                    name: mockProduct.name,
                    description: mockProduct.description,
                    logo: mockProduct.logo,
                    date_release: mockProduct.releaseDate,
                    date_revision: mockProduct.revisionDate
                });
                done();
            }
        });
    });
});
