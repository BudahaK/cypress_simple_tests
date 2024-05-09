import faker from 'faker';

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
 */
//

it('Logo test', () => {
    cy.get('[data-testid="picture"]') .should('exist') .should('have.attr', 'src').should('include', 'cerebrum_hub_logo.png'); 
    cy.get('[data-testid="picture"]').invoke('height').should('equal', 166)    
    cy.get('[data-testid="picture"]').invoke('width').should('equal', 178);
});

it('Should select only one option from radio buttons', () => {
    cy.get('[type="radio"]').next().eq(0).should('have.text','Daily')
    cy.get('[type="radio"]').next().eq(1).should('have.text','Weekly')
    cy.get('[type="radio"]').next().eq(2).should('have.text','Monthly')
    cy.get('[type="radio"]').next().eq(3).should('have.text','Never')
  });

it('Should update city dropdown based on country selection', () => {
    cy.get('#country').select('Spain');
    cy.get('#city').should('contain', 'Malaga','Madrid','Valencia');
    cy.get('#country').select('Austria');
    cy.get('#city').should('contain', 'Vienna','Salzburg','Innsbruck');
    cy.get('#country').select('Estonia');
    cy.get('#city').should('contain', 'Tallinn','Haapsalu','Tartu');
  });

it('Should clear the country in case a city is already selected', () => {
    cy.get('#country').select('Spain');
    cy.get('#city').should('contain', 'Malaga', 'Madrid', 'Valencia');
    cy.get('#city').select('Madrid'); 
    cy.get('#country').select('Estonia');
    cy.get('#city').should('not.have.value'); 
    cy.get('#country').select('Austria');
    cy.get('#city').should('not.have.value'); 
  });
  
  it('Should accept valid email format', () => {
    const validEmail = 'email@mail.lv';
    cy.get('input.email').type(validEmail).should('have.value', validEmail);
  });
  
  it('Should reject invalid email format and display error message', () => {
    const invalidEmail = 'invalidemail'; 
    cy.get('input.email').type(invalidEmail).blur(); 
    cy.get('span[ng-show="myForm.email.$error.email"]').should('be.visible').and('contain', 'Invalid email address.'); 
});
  
  /*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
        * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

it('should fill in all fields and submit the form with checkboxes checked', () => {
  const randomName = faker.name.findName();
  const randomEmail = faker.internet.email();
  const randomBirthday = faker.date.past(30).toISOString().split('T')[0]; // Generates a random past date within the last 30 years

  cy.get('input[name="name"]').type(randomName);
  cy.get('input[name="email"]').type(randomEmail);
  cy.get('input[name="birthday"]').type(randomBirthday);
  cy.get('#country').select('Estonia');
  cy.get('#city').select('Tartu');
  cy.get('input[type="checkbox"]').check();
  cy.get('button[type="submit"]').click();
});
  

it('Submit button should be disabled if privacy policy checkbox is not checked', () => {
  const randomName = faker.name.findName();
  const randomEmail = faker.internet.email();
  const randomBirthday = faker.date.past(30).toISOString().split('T')[0];

  cy.get('input[name="name"]').type(randomName);
  cy.get('input[name="email"]').type(randomEmail);
  cy.get('input[name="birthday"]').type(randomBirthday);
  cy.get('#country').select('Estonia');
  cy.get('#city').select('Tartu');
  cy.get('input[type="submit"]').should('be.disabled');
  cy.get('input[type="checkbox"]').eq(0).uncheck();
  cy.get('input[type="submit"]').should('be.disabled');
});

function fillFormAndSubmit(data) {
  cy.get('input[name="name"]').type(data.name);
  cy.get('input[name="email"]').type(data.email);
  cy.get('input[name="birthday"]').type(data.birthday);
  cy.get('#country').find('option:not(:disabled)').then(($countryOptions) => {
    const randomCountry = Cypress._.sample($countryOptions).text;

    // Wait for city dropdown to be populated based on the selected country
  cy.get('#city').should('not.be.empty');
  cy.get('#city').find('option:not(:disabled)').then(($cityOptions) => {
      const randomCity = Cypress._.sample($cityOptions).text;
      
                });
  });
}

it('Should fail form submission when mandatory fields are absent', () => {
  //HTML indicates that Name field is manadatory but I was able to submit the form without adding the name. That is a bug. KB 09/05/24
  const randomName = faker.name.findName();
  const randomEmail = faker.internet.email();
  const randomBirthday = faker.date.past(30).toISOString().split('T')[0]; // Generates a random past date within the last 30 years
  const randomCountry = faker.address.country();
  const randomCity = faker.address.city();

   fillFormAndSubmit({
    name: randomName,
    email: randomEmail,
    birthday: randomBirthday, 
      });
});

it('User can submit data only when valid mandatory values are added ', () => {
     // Manually select options for the country and city dropdowns
  cy.get('#country').select('Spain');
  cy.get('#city').select('Malaga');

  // Call the fillFormAndSubmit function
  fillFormAndSubmit({https://github.com/BudahaK/Automation-Project-1.git
    name: faker.name.findName(),
    email: faker.internet.email(),
    birthday: faker.date.past(30).toISOString().split('T')[0], // Generates a random past date within the last 30 years
  });

  // Assertion: Check if the form submission is successful or unsuccessful based on your application logic
  // For example, you can assert that a success message is displayed or that the user is redirected to a specific page
  // Or you can assert that an error message is displayed if form submission fails
});