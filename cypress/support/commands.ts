import { Route } from '../models';

// add new command to the existing Cypress interface
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /**
             * Yield the element with name attribute matching input
             * **MATCHES**: <div name="myNameIsEarl">
             *
             * @param value
             */
            getName: (value: string) => Chainable<JQuery<HTMLElement>>;

            /**
             * Sets up a cypress intercept.
             *
             * @param route
             */
            setRoute: (route: Route) => Chainable<null>;
        }
    }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getName(value: string) {
    return cy.get(`[name="${value}"]`);
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function setRoute(route: Route) {
    // strip out the @ symbol so that we can set and wait with the same property
    if (!route.alias) {
        throw new Error('define an alias for the mocked route');
    }

    return cy
        .intercept(
            {
                url: route.url,
                method: route.method ?? 'GET',
            },
            (req) => {
                req.reply(route.status ?? 200, route.response);
            }
        )
        .as(route.alias.replace('@', ''));
}

Cypress.Commands.add('getName', getName);
Cypress.Commands.add('setRoute', setRoute);
