import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      console.error('Formulario inválido', this.form.value);
      this.snackBar.open('Completa el formulario correctamente.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const { email, password } = this.form.value;

    this.auth.login(email ?? '', password ?? '').subscribe({
      next: () => {
        this.snackBar.open('✅ Inicio de sesión exitoso', 'Cerrar', {
          duration: 2500,
        });
        console.log('Login OK', { email });
      },
      error: () => {
        this.snackBar.open('❌ Credenciales incorrectas', 'Cerrar', {
          duration: 3000,
        });
        console.error('Login FAIL');
      },
    });
  }
}