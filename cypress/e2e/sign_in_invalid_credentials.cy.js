describe('Sign In with invalid credentials', () => {
  it('should display an error message', () => {
    cy.intercept('https://nf-api.onrender.com/api/v1/holidaze/auth/login').as('sign-in');
    cy.visit('/');
    cy.get('[data-cy="sign-in-up"]').click();
    cy.get('[data-cy="api-error"]').should('not.exist');
    cy.get('[data-cy="email"]').type('invalidtestuser@stud.noroff.no');
    cy.get('[data-cy="password"]').type('44444444');
    cy.get('[data-cy="submit"]').click();
    cy.wait('@sign-in');
    cy.get('[data-cy="api-error"]').should('be.visible');
  });
});
