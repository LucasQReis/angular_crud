export class EmployeeModel {
    employeeId: number;
    name: string;
    city: string;
    state: string;
    email: string;
    contact: string;
    address: string;
    pinCode: string;

    constructor() {
        this.address = '';
        this.city = '';
        this.contact = '';
        this.email = '';
        this.employeeId = 0;
        this.name = ''
        this.state = '';
        this.pinCode = '';
    }
}