import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BasePage } from '../../shared/common/generic/base.page';
import { ProductManagerService } from '../../shared/modules/product-manager/services/product-manager.service';
import { CustomValidators } from '../../shared/common/generic/custom-validators';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrl: './create-product.page.scss'
})
export class CreateProductPage extends BasePage implements OnInit {
  createProductForm: FormGroup;

  constructor(private productManagerSrv: ProductManagerService, private formBuilder: FormBuilder) {
    super();
    this.createProductForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(200)])],
      logo: ['', Validators.compose([Validators.required])],
      releaseDate: ['', Validators.compose([Validators.required, CustomValidators.dateGreaterOrEqualThanTodayValidator])],
      revisionDate: [{ value: '', disabled: true }]
    })
  }
  ngOnInit(): void {
    this.createProductForm.get('releaseDate')?.valueChanges.subscribe(value => {
      this.calculateReviewDate(value);
    });
  }

  onSubmit() {
    console.log('entro a enviar el formulario');
    console.log('this.createProductForm.invalid :>> ', this.createProductForm.invalid);
    if (this.createProductForm.invalid) {
      this.errorMessage = 'Por favor revisa los errores en el formulario.';
      return;
    }

    this.productManagerSrv.saveProduct({
      id: this.createProductForm.get('id')?.value,
      description: this.createProductForm.get('description')?.value,
      logo: this.createProductForm.get('logo')?.value,
      name: this.createProductForm.get('name')?.value,
      releaseDate: this.createProductForm.get('releaseDate')?.value,
      revisionDate: this.createProductForm.get('revisionDate')?.value
    }).subscribe({
      next: (data) => {
        console.log('data :>> ', data);
        this.successMessage = 'Producto creado correctamente';
      },
      error: (error) => {
        // Deberiamos manejar el error, para no presentar errores tecniso al usuario
        // para efectos del ejercicio se lo deja asi
        this.errorMessage = error.message;
      }
    })
  }

  onReset() {
    this.errorMessage = null;
    this.successMessage = null;
  }

  calculateReviewDate(releaseDateInput: string): void {
    if (releaseDateInput) {
      const releaseDate = new Date(releaseDateInput + 'T00:00:00');
      const reviewDate = new Date(releaseDate);
      reviewDate.setFullYear(releaseDate.getFullYear() + 1);
      this.createProductForm.get('revisionDate')?.setValue(reviewDate.toISOString().split('T')[0]);
    } else {
      this.createProductForm.get('revisionDate')?.setValue('');
    }
  }


}
