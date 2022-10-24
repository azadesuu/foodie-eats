describe('The Home Page', () => {
    it('successfully loads to the home page', () => {
        cy.viewport(1280, 800);
        cy.visit('/home');
    })
})