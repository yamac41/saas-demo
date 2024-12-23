import adminPo from '../../support/admin.po';
import auth from '../../support/auth.po';
import configuration from '~/configuration';

const randomNumber = () => Math.round(Math.random() * 100);

describe(`Admin create new User`, () => {
  let email: string;

  describe(`Create new user`, () => {
    describe(`when the request is not successful`, () => {
      beforeEach(`Sign in`, () => {
        cy.signIn(`/admin/create-new-user`);
      });
      
      it('should return an password error message', () => {
        adminPo.createUser({
          firstName: `123`,
          lastName: `123`,
          email: `test@test.com`,
          password: `123`,
          organizationName: `123`,
          organizationAddress: `123`
        });
        cy.wait(1000);
        cy.cyGet(`password-error`).should('exist');
      });
  
      it('should return error message because of same organization name', () => {
        adminPo.createUser({
          firstName: `123`,
          lastName: `123`,
          email: `123@123.com`,
          password: `123123`,
          organizationName: `Test`,
          organizationAddress: `123`
        });
        cy.wait(1000);
        cy.cyGet(`error-message`).should('exist');
      });
  
      it('should return error message because of same email address', () => {
        adminPo.createUser({
          firstName: `123`,
          lastName: `123`,
          email: `test2@makerkit.dev`,
          password: `123123`,
          organizationName: `123${randomNumber()}`,
          organizationAddress: `123`
        });
        cy.wait(1000);
        cy.cyGet(`error-message`).should('exist');
      });
  
      it('should return success message', () => {
        email = `test@test${randomNumber()}.com`;
  
        adminPo.createUser({
          firstName: `123`,
          lastName: `123`,
          email: email,
          password: `123123`,
          organizationName: `123${randomNumber()}`,
          organizationAddress: `123`
        });
        cy.wait(1000);
        cy.cyGet(`success-message`).should('exist');
      });
    });
  });
  
  describe(`Login with created user`, () => {
    it('should take the user to the app home page', () => {
      cy.visit(`/auth/sign-in`).wait(1000);

      auth.signInWithEmailAndPassword(
        email,
        '123123'
      );
  
      cy.wait(3000);
  
      cy.url().should('contain', configuration.paths.appHome);
    });
  });
});
