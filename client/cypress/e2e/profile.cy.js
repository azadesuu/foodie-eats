// Prevent Cypress from cancelling XHR request
/*function preventFormSubmitDefault(selector) {
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
        
        // Make changes to username, email, bio
        cy.get('.r3 > .profile-details > .profile-title > :nth-child(3) > .MuiButtonBase-root > [data-testid="EditIcon"]').click();
        cy.get('#usernameEdit').clear().type('profile-test-change');
        cy.get('#bioEdit').clear().type('Bio has been changed.');
        preventFormSubmitDefault('.edit-profile-done');
        cy.get('.edit-profile-done').click();
        cy.get('.nav2 > :nth-child(1) > .active-link').click(); // logout

        // Relogin and check if changes made
        cy.visit('/login');
        cy.get('#email').type('profile-test@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');

        cy.reload();
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > :nth-child(1) > #username').should('have.value', 'profile-test-change');
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > :nth-child(2) > #email').should('have.value', 'profile-test@mail.com');
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > .form-control-profile-bio > #bio').should('have.value', 'Bio has been changed.');

        /*
        // Relogin and check if changes have been made
        cy.get('.content-MyProfile > .nav > .bigScreen-nav > .css-e8h9ec > .MuiPaper-root > .MuiToolbar-root > .MuiGrid-root > .nav2 > :nth-child(1) > .active-link').click();
        cy.get(':nth-child(2) > div > button').click();
        cy.get('#email').type('profile-test-changed@mail.com');
        cy.get('#password').type('ProfileTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');

        

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
        cy.wait(500);
        
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > .changepw > a').click();
        cy.url().should('match', /\/change-password$/);
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(1) > input').type('wrong-password'); // current password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(2) > input').type('Changed1234@'); // new password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(3) > input').type('Changed1234@'); // confirm new password
        cy.get('.r1 > .changepw-details > .user-container > .button-group > .confirm').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Current password was incorrect, change unsuccessful.`);
        })
    })
    
    it('successfully change password', () => {
        // Login with original credentials
        cy.viewport(1280, 800); // Macbook 13 dimensions
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
        cy.wait(500);
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`password changed.`);
        })
    })

    it('successfully change password back to original', () => {
        // Login with changed credentials
        cy.viewport(1280, 800); // Macbook 13 dimensions
        cy.visit('/login');
        cy.get('#email').type('profile-test@mail.com');
        cy.get('#password').type('Changed12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
        cy.visit('/my-profile');
        cy.wait(500);

        // Change back to original password
        cy.visit('/my-profile');
        cy.get('.r3 > .profile-details > :nth-child(2) > :nth-child(1) > .changepw > a').click();
        cy.url().should('match', /\/change-password$/);
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(1) > input').type('Changed12345@'); // current password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(2) > input').type('ProfileTest12345@'); // new password
        cy.get('.r1 > .changepw-details > .user-container > form > :nth-child(3) > input').type('ProfileTest12345@'); // confirm new password
        cy.get('.r1 > .changepw-details > .user-container > .button-group > .confirm').click();
        cy.wait(500);
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`password changed.`);
        })
    })
})
