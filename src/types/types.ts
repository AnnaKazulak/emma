export interface Employee {
  id:number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  status: string[];
  dateOfBirth: string;  // Using ISO format string for dates
  startDate: string;    // Using ISO format string for dates
  address: {
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
  };
}
