describe('Sign In form with invalid values', () => {
  it('should display error messages if email is not *@stud.noroff and password is less than 8 characters', () => {
    cy.visit('/');
    cy.get('[data-cy="sign-in-up"]').click();
    cy.get('[data-cy="email"]').type('cypresstestuser@invalidemail.no');
    cy.get('[data-cy="password"]').type('5555555');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="email-error"]').should('exist');
    cy.get('[data-cy="password-error"]').should('exist');
    cy.get('[data-cy="email"]').clear().type('cypresstestuser@stud.noroff.no');
    cy.get('[data-cy="password"]').type('5');
    cy.get('[data-cy="email-error"]').should('not.exist');
    cy.get('[data-cy="password-error"]').should('not.exist');
  });
});
