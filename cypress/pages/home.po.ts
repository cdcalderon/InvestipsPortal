export class HomePage {
    
    public goToHome() {
        return cy.visit('/'); 
    }

    public goToWelcomePage() {
        cy.visit('/welcome'); // replace with link clicking
        // return new WelcomePage();
    }

   
}
