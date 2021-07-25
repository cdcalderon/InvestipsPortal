import { getSession, getUser, getAuthorization } from '../routes';

export class HelperMethods {
    public static testSetup() {
        cy.server();
        this.setCommonRoutes();
    }

    /**
     * Sets default mocked responses to backend routes. Tests should customize as needed.
     */
    private static setCommonRoutes() {
        cy.setRoute(getSession);
        cy.setRoute(getAuthorization);
        cy.setRoute(getUser);
    }
}
