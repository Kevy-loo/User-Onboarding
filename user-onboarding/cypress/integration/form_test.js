/**
 * Task 2a: Write and Run Tests (MVP)
In order to complete this challenge you will need to write and run the following tests. They do not need to pass, so long as the reasons they are failing is legitimate.

Set up tests that will...

 Get the Name input and type a name in it.
 Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
 Get the Email input and type an email address in it
 Get the password input and type a password in it
 Set up a test that will check to see if a user can check the terms of service box
 Check to see if a user can submit the form data
 Check for form validation if an input is left empty
 */

 describe('Info Form', () => {
     beforeEach(() => {
        cy.visit('http://localhost:3000')

     })

     const firstNameInput = () => cy.get('input[name=first_name]');
     const lastNameInput = () => cy.get('input[name=last_name]');
     const emailInput = () => cy.get('input[name=email]');
     const passwordInput = () => cy.get('input[name=password]');
     const submitBtn = () => cy.get('button');
     const tosInput = () => cy.get('[type="checkbox"]')

     it('the proper elements are showing', () => {
         firstNameInput().should('exist');
         lastNameInput().should('exist');
         emailInput().should('exist');
         passwordInput().should('exist');
         submitBtn().should('exist');
         tosInput().should('exist');
         
     })
     it('can type in the inputs', () => {
         firstNameInput()
         .should('have.value', '')
         .type('bob')
         .should('have.value', 'bob');

         lastNameInput()
         .should('have.value', '')
         .type('lord')
         .should('have.value', 'lord');

         emailInput()
         .should('have.value', '')
         .type('fake@email.com')
         .should('have.value', 'fake@email.com');

         passwordInput()
         .should('have.value', '')
         .type('fakepassword')
         .should('have.value', 'fakepassword');

         tosInput()
         .should('not.be.checked')
         .click()
         .should('be.checked');

         
     })
     it('the submit button enables when inputs are filled out', () => {
        firstNameInput().type('bobby');
        lastNameInput().type('lord');
        emailInput().type('fake@email.com')
        passwordInput().type('fakepassword')
        submitBtn().should('not.be.disabled');
      })

 })