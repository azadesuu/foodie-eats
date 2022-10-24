describe('The Forgot Password Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 800); // Macbook 13 dimensions
        cy.visit('/forgot-password');
    })

    it('successfully displays alert when email registered', () => {
        cy.get('#email').type('review-test@mail.com');
        cy.get('#submit-btn').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Email sent successfully. Please wait for token to reset password`);
        })
    })

    it('successfully displays alert when email not registered', () => {
        cy.get('#email').type('email-not-registered@mail.com');
        cy.get('#submit-btn').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Email not registered`);
        })
    })
})