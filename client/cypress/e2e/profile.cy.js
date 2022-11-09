// Prevent Cypress from cancelling XHR request
function preventFormSubmitDefault(selector) {
    cy.get(selector).then(form$ => {
      form$.on("submit", e => {
        e.preventDefault();
      });
    });
  }

describe('The Profile Page', () => {
    it('successfully edits profile', () => {
        cy.viewport(1280, 800); // Macbook 13 dimensions
        
        // Login with original credentials
        cy.visit('/login');
        cy.get('#email').type('profile-test@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');
        
        // Make changes to username and bio
        cy.get('.r3 > .profile-details > .profile-title > :nth-child(3) > .MuiButtonBase-root > [data-testid="EditIcon"]').click();
        cy.get('#usernameEdit').clear().type('changed-profile');
        cy.get('#bioEdit').clear().type('Bio has been changed.');
        preventFormSubmitDefault('.edit-profile-done');
        cy.get('#btn').click();
        cy.wait(10000);

        // Relogin and check if changes made
        cy.visit('/login');
        cy.get('#email').type('profile-test@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');

        cy.reload();
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > :nth-child(1) > #username').should('have.value', 'changed-profile');
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > .form-control-profile-bio > #bio').should('have.value', 'Bio has been changed.');


        // Revert back
        cy.get('.r3 > .profile-details > .profile-title > :nth-child(3) > .MuiButtonBase-root > [data-testid="EditIcon"]').click();
        cy.get('#usernameEdit').clear().type('profile-test');
        cy.get('#bioEdit').clear().type('Original bio.');
        preventFormSubmitDefault('.edit-profile-done');
        cy.get('#btn').click();
    })
})
