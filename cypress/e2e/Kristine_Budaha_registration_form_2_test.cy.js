beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

it('User can use only same both first and validation passwords', () => {
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        // Change the test, so the passwords would match
        // Add assertion, that error message is not visible anymore
        // Add assertion, that submit button is now enabled
        
        // Add test steps for filling in only mandatory fields
        cy.get('input[name="username"]').type('DB');
        cy.get('input[name="name"]').type('Daniel');
        cy.get('input[name="email"]').type('db@email.com');
        cy.get('#lastName').type('Bumble');
        cy.get('[data-testid="phoneNumberTestId"]').type('13131313')    
        
        // Type confirmation password which is different from first password
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password9999')

        // Click on some other field or element on the page to trigger validation
        cy.get('h2').contains('username').click()

        //  Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled');

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('.error_message').should('be.visible')

        // Change the test so the passwords would match
        cy.get('[name="confirm"]').clear().type('Password123');

        // Click on some other field or element on the page to trigger validation
        cy.get('h2').contains('username').click()
        
        // Add assertion, that error message is not visible anymore
        cy.get('.error_message').should('not.be.visible');

        // Add assertion, that submit button is now enabled
        cy.get('.submit_button').should('be.enabled');
        
    });
    
    
it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        
        // Add test steps for filling in only mandatory fields
                cy.get('input[name="username"]').type('NB');
                cy.get('input[name="name"]').type('Nia');
                cy.get('input[name="email"]').type('NB@email.com');
                cy.get('#lastName').type('BumbleBee');
                cy.get('[data-testid="phoneNumberTestId"]').type('999999') 
                cy.get('#htmlFavLanguage').click().should('be.checked');
                cy.get('#vehicle1').click().should('be.checked');
                cy.get('#vehicle2').check();
                cy.get('#vehicle3').check();
                cy.get('select[name="cars"]').select('Audi');
                cy.get('#animal').select('cat');
                
                // Type confirmation password 
                cy.get('input[name="password"]').type('Password999999')
                cy.get('[name="confirm"]').type('Password999999')
        
                // Click on some other field or element on the page to trigger validation
                cy.get('h2').contains('username').click()
        
                // Add assertion, that submit button is enabled
                cy.get('.submit_button').should('be.enabled')
     });
            

it('User can submit form with valid data and only mandatory fields added', () => { 
   // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        function fillInMandatoryData() {
            cy.get('input[name="username"]').type('NB');
            cy.get('input[name="name"]').type('Nia');
            cy.get('input[name="email"]').type('NB@email.com');
            cy.get('#lastName').type('BumbleBee');
            cy.get('[data-testid="phoneNumberTestId"]').type('999999');
          }
            fillInMandatoryData();
            // Assert that the submit button is initially enabled
            // Click on some other field or element on the page to trigger validation
            cy.get('h2').contains('username').click()
            cy.get('.submit_button').should('be.enabled').click();
        
            // Assert that after submitting the form, the system shows a successful message
            cy.get('#success_message').should('be.visible').and('contain','User successfully submitted registration');
            });
        });
        

    // Add at least 1 test for checking some mandatory field's absence

    it('User can not submit form if one 1 or more mandatory fields are empty', ()=>{
        // Add test steps for filling in all but one or more mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows error message

        inputValidData('johnDoe')
        // Assert that the submit button is initially enabled
        cy.get('.submit_button').should('be.enabled');

        // Clear the 'name' field to simulate an empty mandatory field
        cy.get('input[name="name"]').clear();
        cy.get('h2').contains('name').click()
      
        // Assert that the submit button is disabled after leaving a mandatory field empty
        cy.get('.submit_button').should('be.disabled');

        cy.get('#success_message').should('not.be.visible');

        // Assert that after submitting the form with empty mandatory fields, the system shows an error message
        cy.get('#input_error_message').should('be.visible').and('contain.text', 'Mandatory input field is not valid or empty!');
    })

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    });

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include','cypress_logo')
        // get element and check its parameter height
        // it should be less than 116 and greater than 88
        cy.get('img').eq(1).invoke('height').should('equal', 88)
        cy.get('img').eq(1).invoke('width').should('equal', 116)
              
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    });

    it('Test for checking the second link', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
    
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
        .and('have.attr', 'href', 'registration_form_3.html')
        .click()
    
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
    
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying checkboxes

    it('Check that checkbox list is correct for transport', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the checkbox buttons
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
    
        //Verify default state of checkbox buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

    // Selecting one should not affect the selection of the others
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
    cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

    // Now, let's check selecting another checkbox
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').eq(1).should('have.text', 'Saab')
        cy.get('#cars').find('option').eq(2).should('have.text', 'Opel')
        cy.get('#cars').find('option').eq(3).should('have.text', 'Audi')
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one
    it('Check that the dropdown of favorite animals is correct', () => {
        // Verify that the animal dropdown has 6 options
        cy.get('#animal').children('option').should('have.length', 6);
    
        // Verify all values in the dropdown
        const animalOptions = ['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse'];
        cy.get('#animal').children('option').each(($option, index) => {
            cy.wrap($option).should('have.text', animalOptions[index]);
        });
    });
    
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}