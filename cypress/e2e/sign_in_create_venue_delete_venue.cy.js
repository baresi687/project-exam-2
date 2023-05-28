describe('Sign In, create a Venue, and delete', () => {
  it('Opens Sign In/Up Modal, Signs In, creates a Venue and deletes it', () => {
    cy.intercept('https://nf-api.onrender.com/api/v1/holidaze/profiles/*/**').as('get');
    cy.visit('/');
    cy.get('[data-cy="sign-in-up"]').click();
    cy.get('[data-cy="email"]').type('cypresstestuser@stud.noroff.no');
    cy.get('[data-cy="password"]').type('55555555');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="profile-menu"]').should('be.visible');
    cy.get('[data-cy="profile-menu"]').click();
    cy.get('[data-cy="create-venue"]').click();
    cy.url().should('include', 'create');
    cy.get('[data-cy="name"]').type('Cypress Venue test');
    cy.get('[data-cy="description"]').type('This is a Cypress test and will be deleted');
    cy.get('[data-cy="address"]').type('jernbanetorget 1 oslo', { force: true });
    cy.get('div[role="option"]').each(($elem) => {
      if ($elem.text().includes('Jernbanetorget 1')) {
        cy.wrap($elem).click();
      }
    });
    cy.get('[data-cy="price"]').type('1500');
    cy.get('[data-cy="guests"]').type('20');
    cy.get('[data-cy="media"]').type(
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/Gingerbread_House_Essex_CT.jpg'
    );
    cy.get('[data-cy="submit-media"]').click();
    cy.get('[data-cy="added-image"]').should('be.visible');
    cy.get('[data-cy="wifi"]').click();
    cy.get('[data-cy="submit-venue"]').click();
    cy.url().should('include', 'venue-details');
    cy.get('[data-cy="profile-menu"]').click();
    cy.get('[data-cy="profile"]').click();
    cy.wait('@get');
    cy.url().should('include', 'profile');
    cy.get('[data-cy="Cypress Venue test"]').should('be.visible');
    cy.get('[data-cy="Cypress Venue test"]').click();
    cy.get('[data-cy="delete-venue"]').click();
    cy.wait('@get');
    cy.get('[data-cy="Cypress Venue test"]').should('not.exist');
  });
});
