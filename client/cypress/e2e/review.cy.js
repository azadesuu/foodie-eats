// Prevent Cypress from cancelling XHR request, bookmarking a review
function preventFormSubmitDefault(selector) {
    cy.get(selector).then(form$ => {
      form$.on("submit", e => {
        e.preventDefault();
      });
    });
  }

describe('Create a Review', () => {
    beforeEach(() => {
        cy.viewport(1280, 800); // Macbook 13 dimensions
        cy.visit('/login');
        cy.get('#email').type('review-test@mail.com');
        cy.get('#password').type('ReviewTest12345@');
        cy.get('[data-testid="LoginIcon"]').click();
        cy.wait(10000);
    })
    
    it('successfully displays alert when restaurant name field empty', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > .description-tags > .details-container > textarea').type('test'); // description
        cy.get('.r3-content2 > .details-container > input').type('test'); // street address
        cy.get(':nth-child(2) > .suburb-container > input').type('test'); // suburb
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="VIC"]').click(); // state
        cy.get(':nth-child(3) > .postcode-container > input').type('3000'); // postcode
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`restaurant name is missing`);
        })
    })

    it('successfully displays alert when street address field empty', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > :nth-child(1) > input').type('test'); // restaurant name
        cy.get('.r3-content1 > .description-tags > .details-container > textarea').type('test'); // description
        cy.get(':nth-child(2) > .suburb-container > input').type('test'); // suburb
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="VIC"]').click(); // state
        cy.get(':nth-child(3) > .postcode-container > input').type('3000'); // postcode
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`street address is missing`);
        })
    })
    
    it('successfully displays alert when suburb field empty', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > :nth-child(1) > input').type('test'); // restaurant name
        cy.get('.r3-content1 > .description-tags > .details-container > textarea'); // description
        cy.get('.r3-content2 > .details-container > input').type('test'); // street address
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="VIC"]').click(); // state
        cy.get(':nth-child(3) > .postcode-container > input').type('3000'); // postcode
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`suburb is missing`);
        })
    })
    
    it('successfully displays alert when state field empty', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > :nth-child(1) > input').type('test'); // restaurant name
        cy.get('.r3-content1 > .description-tags > .details-container > textarea').type('test'); // description
        cy.get(':nth-child(2) > .suburb-container > input').type('test'); // suburb
        cy.get('.r3-content2 > .details-container > input').type('test'); // street address
        cy.get(':nth-child(3) > .postcode-container > input').type('3000'); // postcode
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`state is missing`);
        })
    })

    it('successfully displays alert when postcode field empty', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > :nth-child(1) > input').type('test'); // restaurant name
        cy.get('.r3-content1 > .description-tags > .details-container > textarea').type('test'); // description
        cy.get(':nth-child(2) > .suburb-container > input').type('test'); // suburb
        cy.get('.r3-content2 > .details-container > input').type('test'); // street address
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="VIC"]').click(); // state
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`postcode is missing`);
        })
    })

    it('successfully displays alert when invalid postcode entered', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > :nth-child(1) > input').type('test'); // restaurant name
        cy.get('.r3-content1 > .description-tags > .details-container > textarea').type('test'); // description
        cy.get(':nth-child(2) > .suburb-container > input').type('test'); // suburb
        cy.get('.r3-content2 > .details-container > input').type('test'); // street address
        cy.get(':nth-child(3) > .postcode-container > input').type('4000'); // postcode
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="VIC"]').click(); // state
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`postcode must be between 3000 and 3999`);
        })
    })

    it('successfully displays alert when description field empty', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > :nth-child(1) > input').type('test'); // restaurant name
        cy.get(':nth-child(2) > .suburb-container > input').type('test'); // suburb
        cy.get('.r3-content2 > .details-container > input').type('test'); // street address
        cy.get(':nth-child(3) > .postcode-container > input').type('3000'); // postcode
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="VIC"]').click(); // state
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`description is missing`);
        })
    })
    
    it('successfully creates a new review', () => {
        cy.visit('/create-review');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.get('.r3-content1 > :nth-child(1) > input').type('test'); // restaurant name
        cy.get('.r3-content1 > :nth-child(2) > input').type('2022-10-11'); // date
        cy.get('.r3-content1 > .description-tags > .details-container > textarea').type('test'); // description
        cy.get(':nth-child(2) > .suburb-container > input').type('test'); // suburb
        cy.get('.r3-content2 > .details-container > input').type('test'); // street address
        cy.get(':nth-child(3) > .postcode-container > input').type('3000'); // postcode
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="VIC"]').click(); // state
        cy.get(':nth-child(2) > .postReviewButton').click(); // post button
        cy.wait(1000);
        
        // Check if review has been made
        cy.get('.bigScreen-Review > #outer > .r1 > .ratingContainer').should('be.visible'); // stars
        cy.get('h3').should('be.visible'); // restaurant name
        cy.get('h4').should('be.visible'); // address
        cy.get('.review-container > :nth-child(4)').should('be.visible'); // description
        cy.visit('/my-reviews');
        cy.wait(1000);
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiList-root > .MuiButtonBase-root').should('be.visible'); // review in my-reviews
    })

    it('successfully edits a review', () => {
        cy.visit('/my-reviews');
        cy.wait(10000);
        cy.get('.MuiGrid-root > .MuiList-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiListItemText-secondary > .css-1lckfwf-MuiTypography-root > #link').click(); // cy.get('.MuiGrid-root > .MuiList-root > .MuiButtonBase-root').should('be.visible').click({ multiple: true }, {force:true}); // click specific review
        cy.wait(10000);
        cy.get(':nth-child(4) > .editReviewButton').click();
        cy.get('#outer > .switchContainer > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click(); // private
        cy.get('[for=":r1v:"]').click().click().click(); // 1 star, a bit buggy still
        cy.get('.r3-content1 > :nth-child(1) > input').clear().type('changed'); // restaurant name
        cy.get('.r3-content1 > :nth-child(2) > input').type('2022-10-10'); // date
        cy.get('.r3-content1 > .description-tags > .details-container > textarea').clear().type('changed'); // description
        cy.get('.r3-content2 > .details-container > input').clear().type('changed'); // street address
        cy.get(':nth-child(2) > .suburb-container > input').clear().type('changed'); // suburb
        cy.get(':nth-child(2) > .state-container > .MuiFormControl-root > .MuiInputBase-root > #state-select').click();
        cy.get('[data-value="NSW"]').click();
        cy.get(':nth-child(3) > .postcode-container > input').clear().type('3001');
        preventFormSubmitDefault("form");
        cy.get(':nth-child(2) > .editReviewButton').click();
        cy.wait(1000);

        // Check if changes have been made
        cy.get('h3').contains('changed'); // restaurant name
        cy.get('.review-container > :nth-child(4)').contains('changed'); // description
    })

    it('successfully deletes a review', () => {
        cy.visit('/my-reviews');
        cy.wait(1000);
        cy.get('.MuiGrid-root > .MuiList-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiListItemText-secondary > .css-1lckfwf-MuiTypography-root > #link').click(); // cy.get('.MuiGrid-root > .MuiList-root > .MuiButtonBase-root').click({ multiple: true });
        cy.wait(1000);
        cy.get(':nth-child(4) > .editReviewButton').click();
        cy.get('[data-testid="DeleteIcon"]').click();
        cy.get(':nth-child(2) > .editReviewButton').click();
        cy.on("window:confirm", (t) => {
            expect(t).to.equal("Are you sure you wish to delete this review?");
        });
        cy.get(':nth-child(2) > button').click();
        
        // Check that there are no reviews in my reviews
        cy.visit('/my-reviews');
        cy.wait(1000); 
        cy.get('.MuiBox-root > div > h2').contains('User has not posted'); 
    })
})