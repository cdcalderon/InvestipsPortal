import { Applicant } from './applicant';

export interface CustomerForm {
    customerFormId: number | null;
    ownershipResidencyStatus: string | null;
    propertyType: string | null;
    mortgageRentPayment: number | null;
    programPhoneNumber: string | null;
    loanCode: string | null;
    contractorId: string | null;
    estimatedProjectCost: number | null;
    projectType: string | null; // Dropdown with the list of Eligible Improvements for the selected contractor
    hasCoApplicant: boolean | null;
    applicant: Applicant | null;
    coapplicant: Applicant | null;
    isSameAddress: boolean | null;
}
