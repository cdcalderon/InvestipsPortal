export interface IDisplaySignalSignal {
    id: number;
    symbol: string;
    weekNumber: number;
    activationDirection: string;
    activationPrice: number;
    activationDate: Date;
    zigzagType: string;
    support?: number;
    resistance?: number;
}
