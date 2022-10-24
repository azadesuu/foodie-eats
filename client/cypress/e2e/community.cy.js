describe('The Community Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 800); // Macbook 13 dimensions
        cy.visit('/home');
    })

    it('successfully loads 6 top recommendations and at least 3 most recent reviews', () => {
        cy.wait(10000);
        // 6 top recommended restaurants
        cy.get('.toprecom > h2').should('be.visible');
        cy.get('.toprecom > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(1) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
        cy.get('.toprecom > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(2) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
        cy.get('.toprecom > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(3) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
        cy.get('.toprecom > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(4) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
        cy.get('.toprecom > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(5) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
        cy.get('.toprecom > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(6) > .MuiList-root > .MuiButtonBase-root').should('be.visible');

        // at least 3 most recent reviews
        cy.get('.recent > h2')
        cy.get('.recent > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(1) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
        cy.get('.recent > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(1) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
        cy.get('.recent > .bigScreen-Community > .MuiBox-root > .MuiGrid-container > :nth-child(1) > .MuiList-root > .MuiButtonBase-root').should('be.visible');
    })

    it('successfully navigates through pages using the navigation bar', () => {
        cy.visit('/login');
        cy.get('#email').type('review-test@mail.com');
        cy.get('#password').type('ReviewTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);

        cy.get(':nth-child(2) > .active-link').click();
        cy.url().should('match', /\/my-reviews$/);
        cy.get(':nth-child(3) > .active-link').click();
        cy.url().should('match', /\/my-bookmarks$/);
        cy.get(':nth-child(4) > .active-link').click();
        cy.url().should('match', /\/create-review$/);
    })
})