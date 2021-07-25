import { HelperMethods } from '../util/helper-methods';
import { HomePage } from '../pages/home.po';

describe('Welcome Page', () => {
    beforeEach(() => {
        HelperMethods.testSetup();
    });

    it('should open and display Welcome Page', () => {
        const welcomePage = new HomePage().goToHome();
        // cy.get("eb-welcome > h1").should("contain.text", "Welcome");
        // welcomePage.getTitle().should('contain.text', 'Welcome');
        // welcomePage.getQuickLinksSection().should('contain.text', 'Quick Links');
        // welcomePage.getQuickLinksSection().should('contain.text', 'Dashboard');
        // welcomePage.getQuickLinksSection().should('contain.text', 'Loan Codes & Fees');
        // welcomePage.getQuickLinksSection().should('contain.text', 'WorkCenter');
        // welcomePage.getWelcomeContentSection().should('contain.text', 'Welcome to investips USA PartnerPortal.');
        // welcomePage.getWelcomeContentSection().should('contain.text', 'Here you will have access to loan application details, reports, and other resources to help you increase your sales.');
        // welcomePage.getWelcomeContentSection().should('contain.text', 'Site questions? Visit our Help page or contact support at 1-888-700-9610.');
        // welcomePage.clickCarouselButtons();
        // welcomePage.getCarouselBody().should('contain.text', 'Get Real-Time Sales TrackingThe Dashboard allows you to track sales performance for jobs financed.');
        // welcomePage.getCarouselBody().should('contain.text', 'Save time. No longer uploading InvoicesThe loan document request eliminates the need to submit invoices to initiate the preparation of loan documents.');
        // welcomePage.getCarouselBody().should('contain.text', 'One stop location for Fees and CodesPartnerPortal now displays both your loan codes and dealer fees for easy reference.');
        // welcomePage.getCarouselBody().should('contain.text', 'Easily create custom reports anytimeThe Report Builder allows you to create custom reports that provide insights you can use to manage and grow your business.');
        // assertHtmlElementAttribute(welcomePage.getFooterContactUsLink(), 'target', '_blank');
        // assertHtmlElementAttribute(welcomePage.getFooterContactUsLink(), 'href', 'https://investips.com/contact');
        // welcomePage.clickHeader();
        // cy.url().should('contain', 'workcenter');
    });
});
