export const adminPo = {
  $getFirstNameInput: () => cy.cyGet(`new-user-first-name`),
  $getLastNameInput: () => cy.cyGet(`new-user-last-name`),
  $getEmailInput: () => cy.cyGet(`new-user-email`),
  $getPasswordInput: () => cy.cyGet(`new-user-password`),
  $getOrganizationNameInput: () => cy.cyGet(`new-user-organization-name`),
  $getOrganizationAddressInput: () => cy.cyGet(`new-user-organization-address`),
  $createButton: () => cy.cyGet(`create-button`),
  createUser: ({
    firstName,
    lastName,
    email,
    password,
    organizationName,
    organizationAddress,
  } : {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organizationName: string;
    organizationAddress: string;
  }) => {
    adminPo.$getFirstNameInput().clear().type(firstName);
    adminPo.$getLastNameInput().clear().type(lastName);
    adminPo.$getEmailInput().clear().type(email);
    adminPo.$getPasswordInput().clear().type(password);
    adminPo.$getOrganizationNameInput().clear().type(organizationName);
    adminPo.$getOrganizationAddressInput().clear().type(organizationAddress);
    adminPo.$createButton().click();
  }
}

export default adminPo;