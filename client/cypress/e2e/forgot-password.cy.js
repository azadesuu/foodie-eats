describe('The Forgot Password Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 800); // Macbook 13 dimensions
        cy.visit('/forgot-password');
    })

    it('successfully displays alert when email not registered', () => {
        cy.get('#email').type('email-not-registered@mail.com');
        cy.get('#submit-btn').click();
        cy.get('.MuiAlert-message').should('be.visible');
    })
})