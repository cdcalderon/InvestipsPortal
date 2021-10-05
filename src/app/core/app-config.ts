export interface AppConfig {
    logging: {
        minimumLevel: string;
    };
    addressApi: {
        url: string;
        apiKey: string;
    };
    eodhistoricaldataApi: {
        url: string;
    };
    investipsApiGatewayBase: {
        url: string;
    };
}
