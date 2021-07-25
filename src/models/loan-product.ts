import { Product } from './product';
import { ProjectType } from './project-type';
import { Salesperson } from './salesperson';
import { PropertyTypeCreditParam } from './property-type-credit-param';

export interface LoanProduct {
    programPhone: string;
    loanCode: string;
    contractorNumber: number;
    sponsorProgramID: number;
    sponsorID: number;
    sponsorNumber: number;
    contractorID: number;
    isDefaultProduct: boolean;
    requestedAmountOK: boolean;
    maxApproval: boolean;
    product: Product | null;
    comboProducts: Array<Product> | null;
    disbursementRule: string;
    projectTypes: Array<ProjectType> | null;
    documentDeliveryMethods: Array<string> | null;
    salespersons: Array<Salesperson> | null;
    propertyTypeCreditParams: Array<PropertyTypeCreditParam> | null;
    fundingNoticeMethod: string;
}
