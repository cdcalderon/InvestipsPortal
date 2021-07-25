import { Brand } from './brand';
export interface ProjectType {
    projectTypeId: number;
    name: string;
    leasable: boolean;
    brands: Array<Brand>;
}
