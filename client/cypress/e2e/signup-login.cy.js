/*describe('The Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  })
  
  it('successfully loads', () => {
    // Email
    cy.get('.content-register > :nth-child(2) > :nth-child(1) > label').should('be.visible');
    cy.get(':nth-child(2) > :nth-child(1) > #email').should('be.visible');
    // Username
    cy.get(':nth-child(2) > label').should('be.visible');
    cy.get('#username').should('be.visible');
    // Password
    cy.get(':nth-child(3) > label').should('be.visible');
    cy.get(':nth-child(3) > #password').should('be.visible');
    // Confirm password
    cy.get('.form-control-signup-pw-con > .form-control > label').should('be.visible');
    cy.get('.form-control-signup-pw-con > .form-control > #password').should('be.visible');
    // Done
    cy.get('.done').should('be.visible');
  })

  it('successfully signs up a new user', () => {
    cy.deleteOne({username: "login-test"}, { collection: 'users', database: 'foodie-eats' }).then(res => {
      cy.log(res); // prints 1 (or 0) document deleted
    });
    
    cy.get(':nth-child(2) > :nth-child(1) > #email').type('login-test@mail.com');
    cy.get('#username').type('login-test');
    cy.get(':nth-child(3) > #password').type('LoginTest12345@');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('LoginTest12345@');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Signup successful. Please Login.`);
    })
  })

  it('successfully displays alert when email not entered', () => {
    cy.get('#username').type('login-test');
    cy.get(':nth-child(3) > #password').type('LoginTest12345@');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('LoginTest12345@');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`must provide an email, a password, and a username`);
    })
  })

  it('successfully displays alert when email/username has been used', () => {
    cy.get(':nth-child(2) > :nth-child(1) > #email').type('login-test@mail.com');
    cy.get('#username').type('login-test');
    cy.get(':nth-child(3) > #password').type('LoginTest12345@');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('LoginTest12345@');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`That username/email is already taken.`);
    })
  })

  it('successfully displays alert when password not strong enough', () => {
    cy.get(':nth-child(2) > :nth-child(1) > #email').type('login-test@mail.com');
    cy.get('#username').type('login-test');
    cy.get(':nth-child(3) > #password').type('12345');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('12345');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Your password isn't strong enough.`);
    })
  })

  it('successfully displays alert when confirm password field does not match password', () => {
    cy.get(':nth-child(2) > :nth-child(1) > #email').type('login-test@mail.com');
    cy.get('#username').type('login-test');
    cy.get(':nth-child(3) > #password').type('LoginTest12345@');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('12345');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Please re-confirm your password`);
    })
  })
})*/

describe('The Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  })
  
  it('successfully loads', () => {
     // Username
     cy.get('.content-Login > #form > :nth-child(1) > label').should('be.visible');
     cy.get('.content-Login > #form > :nth-child(1) > #email').should('be.visible');
     // Password
     cy.get('#form-control-pw > .form-control > label').should('be.visible');
     cy.get('.row > #password').should('be.visible');
     // Login button
     cy.get('[data-testid="LoginIcon"]').should('be.visible');
     // Forgot password link
     cy.get('.forgetpw > a').should('be.visible');
  })

  it('successfully redirects to home page after correct login info', () => {
    cy.reload();
    cy.get('#email').type('login-test@mail.com');
    cy.get('#password').type('LoginTest12345@');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.url().should('match', /\/home$/);
  })

  it('successfully displays alert when email and password not provided', function(){
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Must provide email and a password`)
    })
  })

  it('successfully displays alert when email not provided', function(){
    cy.get('#password').type('LoginTest12345@');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Must provide email and a password`)
    })
  })

  it('successfully displays alert when password not provided', function(){
    cy.get('#email').type('login-test@mail.com');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Must provide email and a password`)
    })
  })

  /*

  it('successfully displays alert when email not found', function(){
    cy.reload();
    cy.get('#email').type('email-not-found@mail.com');
    cy.get('#password').type('email-not-found');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Email not found or password doesn't match.`)
    })
  })

  it('successfully displays alert when password does not match', function(){
    cy.reload();
    cy.get('#email').type('login-test@mail.com');
    cy.get('#password').type('wrong-password');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Email not found or password doesn't match.`)
    })
  })

  */
})