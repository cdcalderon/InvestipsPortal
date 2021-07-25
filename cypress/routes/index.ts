import { Route } from '../models';
import { authorizationFactory } from '../factories';

/**
 * GET '/api/**\/session'
 * default response is a simple json object
 */
export const getSession = {
    alias: '@getSession',
    url: '**/session',
    method: 'GET',
    response: {
        userId: null,
        userName: 'mocky_mcMockerson@investipsusa.com',
        displayName: 'Mocky McMockerson',
        accessId: null,
        contractorName: null,
        stUserId: null,
        stUserName: null,
    },
} as Route;

/**
 * GET '/api/**\/authorization'
 * default response is `factories.Authorizations.build()`
 */
export const getAuthorization = {
    alias: '@getAuthorization',
    url: '**/authorization',
    method: 'GET',
    response: authorizationFactory.build(),
} as Route;

/**
 * GET '/api/**\/user'
 * default response is a simple json object
 */
export const getUser = {
    alias: '@getUser',
    url: '**/user',
    method: 'GET',
    response: {
        displayUserName: 'Mocky McMockerson',
        username: 'Mocky McMockerson',
    },
} as Route;
