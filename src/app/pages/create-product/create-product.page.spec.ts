import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CreateProductPage } from './create-product.page';
import { ProductManagerService } from '../../shared/modules/product-manager/services/product-manager.service';
import { of, throwError } from 'rxjs';
import { CustomValidators } from '../../shared/common/generic/custom-validators';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../components/components.module';

describe('CreateProductPage', () => {
  let component: CreateProductPage;
  let fixture: ComponentFixture<CreateProductPage>;
  let productManagerServiceMock: any;

  beforeEach(async () => {
    productManagerServiceMock = {
      saveProduct: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CreateProductPage],
      imports: [ReactiveFormsModule, ComponentsModule],
      providers: [
        FormBuilder,
        { provide: ProductManagerService, useValue: productManagerServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.createProductForm).toBeTruthy();
    expect(component.createProductForm.get('id')?.value).toBe('');
    expect(component.createProductForm.get('name')?.value).toBe('');
    expect(component.createProductForm.get('description')?.value).toBe('');
    expect(component.createProductForm.get('logo')?.value).toBe('');
    expect(component.createProductForm.get('releaseDate')?.value).toBe('');
    expect(component.createProductForm.get('revisionDate')?.value).toBe('');
  });

  it('should validate the form fields correctly', () => {
    const idControl = component.createProductForm.get('id');
    idControl?.setValue('');
    expect(idControl?.valid).toBeFalsy();
    idControl?.setValue('12');
    expect(idControl?.valid).toBeFalsy();
    idControl?.setValue('123');
    expect(idControl?.valid).toBeTruthy();

    const nameControl = component.createProductForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
    nameControl?.setValue('abcd');
    expect(nameControl?.valid).toBeFalsy();
    nameControl?.setValue('abcde');
    expect(nameControl?.valid).toBeTruthy();

    const releaseDateControl = component.createProductForm.get('releaseDate');
    releaseDateControl?.setValue('');
    expect(releaseDateControl?.valid).toBeFalsy();
    releaseDateControl?.setValue('2100-05-31');
    console.log('errorsJS :>> ', releaseDateControl?.errors);
    expect(releaseDateControl?.valid).toBeTruthy();
  });

  it('should calculate review date correctly', () => {
    const releaseDateControl = component.createProductForm.get('releaseDate');
    releaseDateControl?.setValue('2023-05-27');
    fixture.detectChanges();
    expect(component.createProductForm.get('revisionDate')?.value).toBe('2024-05-27');

    releaseDateControl?.setValue('');
    fixture.detectChanges();
    expect(component.createProductForm.get('revisionDate')?.value).toBe('');
  });

  it('should show error message if form is invalid on submit', () => {
    component.createProductForm.get('id')?.setValue('');
    component.onSubmit();
    expect(component.errorMessage).toBe('Por favor revisa los errores en el formulario.');
    expect(productManagerServiceMock.saveProduct).not.toHaveBeenCalled();
  });

  it('should call saveProduct and set success message on valid form submit', () => {
    productManagerServiceMock.saveProduct.mockReturnValue(of({ success: true }));

    component.createProductForm.get('id')?.setValue('123');
    component.createProductForm.get('name')?.setValue('Valid Name');
    component.createProductForm.get('description')?.setValue('Valid Description');
    component.createProductForm.get('logo')?.setValue('valid-logo.png');
    component.createProductForm.get('releaseDate')?.setValue('2100-05-27');

    component.onSubmit();

    expect(productManagerServiceMock.saveProduct).toHaveBeenCalled();
    expect(component.successMessage).toBe('Producto creado correctamente');
  });

  it('should set error message on saveProduct failure', () => {
    productManagerServiceMock.saveProduct.mockReturnValue(throwError({ message: 'Save failed' }));

    component.createProductForm.get('id')?.setValue('123');
    component.createProductForm.get('name')?.setValue('Valid Name');
    component.createProductForm.get('description')?.setValue('Valid Description');
    component.createProductForm.get('logo')?.setValue('valid-logo.png');
    component.createProductForm.get('releaseDate')?.setValue('2100-05-27');

    component.onSubmit();

    expect(productManagerServiceMock.saveProduct).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Save failed');
  });

  it('should reset errorMessage and successMessage on reset', () => {
    component.errorMessage = 'Some error';
    component.successMessage = 'Some success';

    component.onReset();

    expect(component.errorMessage).toBeNull();
    expect(component.successMessage).toBeNull();
  });
});
