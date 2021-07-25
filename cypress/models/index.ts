import { Factory } from 'fishery';

/**
 * Factories are defined in /cypress/factories and are used to generate test data
 * see https://github.com/thoughtbot/fishery for more info
 */
export interface Factories {
    Authorization: Factory<Authorization>;
}

/**
 * Represents a Cypress Route
 * https://docs.cypress.io/api/commands/route.html
 */
export interface Route {
    /**
     * to use in conjunction with cy.wait() etc
     */
    alias?: string;
    /**
     * wildcard matching available in string option
     */
    url: string | RegExp;
    /**
     * should use response model object from the back-end api
     */
    response?: string | object | Array<any>;
    /**
     * To use when a custom status wants to be responded
     */
    status?: number;
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE';
    callbackFn?: Function;
    options?: Object; // TODO: create cypress options object, which cy.server() could also use
}

/**
 * An interface representing SessionResponse
 */
export interface SessionResponse {
    userId?: string;
    userName: string;
    displayName: string;
    accessId?: string;
    contractorName?: string;
    stUserId?: string;
    stUserName?: string;
}

/**
 * An interface representing Authorization.
 */
export interface Authorization {
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly roles?: string[];
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly permissions?: string[];
}

export interface ListResult<T> {
    results: T[];
}

/**
 * An interface representing Subject.
 */
export interface Subject {
    subjectId?: string;
    name?: string;
    givenName?: string;
    familyName?: string;
    userPrincipalName?: string;
    createdDate?: Date;
}


/**
 * An interface representing MicrosoftAspNetCoreMvcCreatedResult.
 */
export interface MicrosoftAspNetCoreMvcCreatedResult {
    location?: string;
    value?: any;
    formatters?: any[];
    contentTypes?: string[];
    declaredType?: string;
    statusCode?: number;
}

/**
 * An interface representing
 * BadRequestErrorResponse.
 */
export interface BadRequestErrorResponse {
    code?: number;
    message?: string;
}

/**
 * An interface representing MicrosoftExtensionsPrimitivesStringSegment.
 */
export interface MicrosoftExtensionsPrimitivesStringSegment {
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly bufferProperty?: string;
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly offset?: number;
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly length?: number;
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly value?: string;
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly hasValue?: boolean;
}

/**
 * An interface representing MicrosoftNetHttpHeadersEntityTagHeaderValue.
 */
export interface MicrosoftNetHttpHeadersEntityTagHeaderValue {
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly tag?: MicrosoftExtensionsPrimitivesStringSegment;
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly isWeak?: boolean;
}

/**
 * An interface representing MicrosoftAspNetCoreMvcFileContentResult.
 */
export interface MicrosoftAspNetCoreMvcFileContentResult {
    fileContents?: Uint8Array;
    /**
     * **NOTE: This property will not be serialized. It can only be populated by the server.**
     */
    readonly contentType?: string;
    fileDownloadName?: string;
    lastModified?: Date;
    entityTag?: MicrosoftNetHttpHeadersEntityTagHeaderValue;
    enableRangeProcessing?: boolean;
}

/**
 * An interface representing HealthCheckBuildModel.
 */
export interface HealthCheckBuildModel {
    timestamp?: Date;
    version?: string;
    tag?: string;
    suffix?: string;
}

/**
 * An interface representing HealthCheckServiceStatusModel.
 */
export interface HealthCheckServiceStatusModel {
    healthy?: boolean;
    /**
     * Possible values include: 'ok', 'degraded', 'failure'
     */
    status?: Status;
    statusDetail?: string;
    timestamp?: Date;
}

/**
 * An interface representing HealthCheckChecksModel.
 */
export interface HealthCheckChecksModel {
    identityServer?: HealthCheckServiceStatusModel;
}

/**
 * An interface representing HealthCheckHealthModel.
 */
export interface HealthCheckHealthModel {
    service?: string;
    build?: HealthCheckBuildModel;
    checks?: HealthCheckChecksModel;
    /**
     * Possible values include: 'ok', 'degraded', 'failure'
     */
    status?: Status;
    statusDetail?: string;
    healthy?: boolean;
    timestamp?: Date;
    uptime?: string;
    cached?: boolean;
}

export interface ListResult<T> {
    results: T[];
}

/**
 * Defines values for Type.
 * Possible values include: 'decimal', 'option'
 * @readonly
 * @enum {string}
 */
export type Type = 'decimal' | 'option';

/**
 * Defines values for Status.
 * Possible values include: 'ok', 'degraded', 'failure'
 * @readonly
 * @enum {string}
 */
export type Status = 'ok' | 'degraded' | 'failure';
