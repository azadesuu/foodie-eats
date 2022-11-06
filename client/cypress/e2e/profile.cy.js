
// Prevent Cypress from cancelling XHR request
/*function preventFormSubmitDefault(selector) {
    cy.get(selector).then(form$ => {
      form$.on("submit", e => {
        e.preventDefault();
      });
    });
  }
describe('The Profile Page', () => {
    before(() => {
        cy.viewport(1280, 800); // Macbook 13 dimensions
        cy.visit('/login');
        cy.get('#email').type('profile-test@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');
    })

    it('successfully edits profile', () => {
        // Make changes to username, email, bio
        /*cy.get('.r3 > .profile-details > .profile-title > :nth-child(3) > .MuiButtonBase-root > [data-testid="EditIcon"]').click();
        cy.get('#usernameEdit').type('profile-test-changed');
        cy.get('#emailEdit').type('profile-test-changed@mail.com');
        cy.get('#bioEdit').type('Bio has been changed.');

        cy.get('.edit-profile-done').click();*/


        //cy.get('.r3 > .profile-details > .profile-title > :nth-child(3) > .MuiButtonBase-root').click();


        //cy.get('.r3 > .profile-details > .profile-title > :nth-child(3) > .MuiButtonBase-root > [data-testid="EditIcon"]').click();
        //cy.get('#usernameEdit').type('changed');
        
        //cy.wait(300);
        //cy.get('#usernameEdit').should('be.visible');
        //cy.get('#usernameEdit').click();
        //cy.get('#usernameEdit').click({force: true}).type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('profile-test-changed', { force: true });
        //cy.get('#emailEdit').click({force: true}).type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('profile-test-changed@mail.com', { force: true });
        //cy.get('#bioEdit').click({force: true}).type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('Bio has been changed.', { force: true });
        //cy.get('#usernameEdit').click().type('profile-test-changed{enter}');
        //cy.get('#usernameEdit').clear();
        //.type('{selectall}{backspace}', { force: true }).type('profile-test-changed@mail.com', { force: true }).type('Cypress.io{enter}');
        //cy.get('#usernameEdit').click().clear().type('profile-test-changed').type('Cypress.io{enter}');
        //cy.get('#emailEdit').click().clear().type('profile-test-changed@mail.com').type('Cypress.io{enter}');
        //cy.get('#bioEdit').click().clear().type('Bio has been changed.').type('Cypress.io{enter}');
        //cy.get('#usernameEdit').type('{selectall}{backspace}', { force: true }).type('Cypress.io{enter}',  { force: true });
        //cy.get('#usernameEdit').type('profile-test-changed', { force: true });


        //cy.get('#emailEdit').type('{selectall}{backspace}', { force: true });
        //cy.get('#emailEdit').type('profile-test-changed@mail.com', { force: true });
        //cy.get('#bioEdit').type('{selectall}{backspace}', { force: true });
        //cy.get('#bioEdit').type('Bio has been changed.', { force: true });
        /*cy.get('.edit-profile-done').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Successfully updated. Re-login to see changes.`);
        })

        // Relogin and check if changes have been made
        cy.get('.content-MyProfile > .nav > .bigScreen-nav > .css-e8h9ec > .MuiPaper-root > .MuiToolbar-root > .MuiGrid-root > .nav2 > :nth-child(1) > .active-link').click();
        cy.get(':nth-child(2) > div > button').click();
        cy.get('#email').type('profile-test-changed@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');

        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > :nth-child(1) > #username').should('have.value', 'profile-test-changed');
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > :nth-child(2) > #email').should('have.value', 'profile-test-changed@mail.com');
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > .form-control-profile-bio > #bio').should('have.value', 'Bio has been changed.');

        // Revert back
        cy.get('.r3 > .profile-details > .profile-title > :nth-child(3) > .MuiButtonBase-root > [data-testid="EditIcon"]').click();
        cy.get('#usernameEdit').type('profile-test');
        cy.get('#emailEdit').type('profile-test@mail.com');
        cy.get('#bioEdit').type('Original bio');
        cy.get('.edit-profile-done').click();*/
    //})
//})

describe('The Change Password Page', () => {
    it('successfully displays alert when current password incorrect', () => {
        // Login with original credentials
        cy.viewport(1280, 800); // Macbook 13 dimensions
        cy.visit('/login');
        cy.get('#email').type('profile-test@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');
    })

    it('successfully displays alert when current password incorrect', () => {
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > .changepw > a').click();
        cy.url().should('match', /\/change-password$/);
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(1) > input').type('wrong-password'); // current password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(2) > input').type('NewPassword12345@'); // new password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(3) > input').type('NewPassword12345@'); // confirm new password
        cy.get('.r1 > .changepw-details > .user-container > .button-group > .confirm').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Current Password is incorrect`);
        })
    })
    
    it('successfully change password', () => {
        cy.viewport(1280, 800); // Macbook 13 dimensions
        
        // Login and go to My Profile page
        cy.visit('/login');
        cy.get('#email').type('profile-test@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');
        cy.wait(500);
        
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > .changepw > a').click();
        cy.url().should('match', /\/change-password$/);
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(1) > input').type('ProfileTest12345@'); // current password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(2) > input').type('Changed12345@'); // new password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(3) > input').type('Changed12345@'); // confirm new password
        cy.get('.r1 > .changepw-details > .user-container > .button-group > .confirm').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`password changed.`);
        })
    })
})

