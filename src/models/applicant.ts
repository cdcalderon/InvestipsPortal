export interface Applicant {
    firstName: string | null;
    lastName: string | null;
    suffix: string | null;
    dateOfBirth: Date | null;
    annualIncome: number | null;
    address: string | null;
    address2: string | null;
    zipCode: string | null;
    city: string | null;
    state: string | null;
    email: string | null;
    emailConfirmation: string | null;
    preferredPhone: number | null;
    workPhone: number | null;
    workPhoneExt: number | null;
    ssn: number | null;
}
