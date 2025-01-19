import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObg: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  editIndex: number | null = null;  


  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(this.employeeObg.employeeId),
      name: new FormControl(this.employeeObg.name),
      city: new FormControl(this.employeeObg.city),
      address: new FormControl(this.employeeObg.address),
      contact: new FormControl(this.employeeObg.contact),
      email: new FormControl(this.employeeObg.email),
      pinCode: new FormControl(this.employeeObg.pinCode),
      state: new FormControl(this.employeeObg.state),
    });
  }

  onSave() {
    debugger
    if (this.editIndex !== null) {
      this.employeeList[this.editIndex] = this.employeeForm.value;
      this.editIndex = null; 
    } else {
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeForm.controls['employeeId'].setValue(parseData.length + 1);
        this.employeeList.unshift(this.employeeForm.value);
      } else {
        this.employeeList.unshift(this.employeeForm.value);
      }
    }
  
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  }

  getFieldError(fieldName: string): string | null | undefined {
    const control = this.employeeForm.get(fieldName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required.';
      }
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength}.`;
      }
      if (control.errors['pattern']) {
        return 'Invalid format.';
      }
      if (control.errors['email']) {
        return 'Invalid email address.';
      }
    }
    return null;
  }

  onEdit(employee: EmployeeModel, index: number) {
    this.employeeForm.patchValue({
      employeeId: employee.employeeId,
      name: employee.name,
      city: employee.city,
      address: employee.address,
      contact: employee.contact,
      email: employee.email,
      pinCode: employee.pinCode,
      state: employee.state,
    });
    
    this.editIndex = index;
  }

  onDelete(index: number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      this.employeeList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
  
}
