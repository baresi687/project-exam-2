describe('Sign In and Out', () => {
  it('should show the Sign In button when not Signed in, and profile if Signed In', () => {
    cy.intercept('https://nf-api.onrender.com/api/v1/holidaze/auth/login').as('sign-in');
    cy.visit('/');
    cy.get('[data-cy="sign-in-up"]').should('be.visible');
    cy.get('[data-cy="profile-menu"]').should('not.exist');
    cy.get('[data-cy="sign-in-up"]').click();
    cy.get('[data-cy="email"]').type('cypresstestuser@stud.noroff.no');
    cy.get('[data-cy="password"]').type('55555555');
    cy.get('[data-cy="submit"]').click();
    cy.wait('@sign-in');
    cy.get('[data-cy="profile-menu"]').should('be.visible');
    cy.get('[data-cy="sign-in-up"]').should('not.exist');
    cy.get('[data-cy="profile-menu"]').click();
    cy.get('[data-cy="sign-out"]').click();
    cy.get('[data-cy="sign-in-up"]').should('be.visible');
    cy.get('[data-cy="profile-menu"]').should('not.exist');
  });
});
