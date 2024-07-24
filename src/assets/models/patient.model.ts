export interface Patient {
    id?: number; // Make the ID optional as it might not be present when adding a new patient
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    address: Address;
  }
  
  export interface Address {
    city: string;
    state: string;
    zip: string;
  }
  