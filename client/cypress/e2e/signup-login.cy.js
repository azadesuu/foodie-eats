Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('The Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  })

  it('successfully displays alert when email not entered', () => {
    cy.get('#username').type('login-test');
    cy.get(':nth-child(5) > #password').type('LoginTest12345@');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('LoginTest12345@');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`must provide an email, a password, and a username.`);
    })
  })

  it('successfully displays alert when email/username has been used', () => {
    cy.get('.content-register > :nth-child(2) > :nth-child(1) > #email').type('login-test@mail.com');
    cy.get('#username').type('login-test');
    cy.get(':nth-child(5) > #password').type('LoginTest12345@');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('LoginTest12345@');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`That username/email is already taken.`);
    })
  })

  it('successfully displays alert when password not strong enough', () => {
    cy.get('.content-register > :nth-child(2) > :nth-child(1) > #email').type('login-test@mail.com');
    cy.get('#username').type('login-test');
    cy.get(':nth-child(5) > #password').type('12345');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('12345');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Your password isn't strong enough.`);
    })
  })

  it('successfully displays alert when confirm password field does not match password', () => {
    cy.get('.content-register > :nth-child(2) > :nth-child(1) > #email').type('login-test@mail.com');
    cy.get('#username').type('login-test');
    cy.get(':nth-child(5) > #password').type('LoginTest12345@');
    cy.get('.form-control-signup-pw-con > .form-control > #password').type('12345');
    cy.get('.done').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Please re-confirm your password`);
    })
  })
})

describe('The Login Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 800); // Macbook 13 dimensions
    cy.visit('/login');
  })
  

  it('successfully redirects to home page after correct login info', () => {
    cy.reload();
    cy.get('#email').type('login-test@mail.com');
    cy.get('#password').type('LoginTest12345@');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.wait(10000);
    cy.url().should('match', /\/home$/);
  })

  it('successfully displays alert when email and password not provided', function(){
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Must provide email and a password`);
    })
  })

  it('successfully displays alert when email not provided', function(){
    cy.get('#password').type('LoginTest12345@');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Must provide email and a password`);
    })
  })

  it('successfully displays alert when password not provided', function(){
    cy.get('#email').type('login-test@mail.com');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Must provide email and a password`);
    })
  })

  it('successfully displays alert when email has not been registered', function(){
    cy.reload();
    cy.get('#email').type('email-not-registered@mail.com');
    cy.get('#password').type('email-not-registered');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Email not found or password doesn't match.`);
    })
  })

  it('successfully displays alert when wrong password entered', function(){
    cy.reload();
    cy.get('#email').type('login-test@mail.com');
    cy.get('#password').type('wrong-password');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Email not found or password doesn't match.`);
    })
  })

  it('successfully logs out', function(){
    cy.reload();
    cy.get('#email').type('login-test@mail.com');
    cy.get('#password').type('LoginTest12345@');
    cy.get('[data-testid="LoginIcon"]').click();
    cy.wait(10000);
    cy.get('.nav2 > :nth-child(1) > .active-link').click();
    cy.url().should('match', /\/login$/);
  })
})