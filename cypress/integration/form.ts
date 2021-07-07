describe('should visit page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/sights');
  });
  it('should fill form correctly and add new site', () => {
    cy.get('.addButton').click();
    cy.get('button.btn.btn-danger').should('be.disabled');
    cy.url().should('include', '/lazy/add');
    cy.get('input#name').type('Kraków').blur();
    cy.get('[name="longitude"]').clear();
    cy.get('[name="longitude"]').type('19.937908385437343').blur();
    cy.get('[name="latitude"]').clear();
    cy.get('[name="latitude"]').type('50.06150072587465').blur();
    cy.get('[name= "description"]').type('przykładowy opis').blur();
    cy.get('[name="color"').select('1').blur();
    cy.get('button.btn.btn-danger').should('not.be.disabled');
    cy.get('form').submit();
    cy.url().should('include', '');
  });
  it('should show error in invalid fields', () => {
    cy.get('.addButton').click();
    cy.get('button.btn.btn-danger').should('be.disabled');
    cy.url().should('include', '/lazy/add');
    cy.get('input#name').focus().blur();
    cy.contains('Site name is required');
    cy.get('[name="longitude"]').clear();
    cy.get('[name="longitude"]').focus().blur();
    cy.contains('Longitude are required');
    cy.get('[name="latitude"]').clear();
    cy.get('[name="latitude"]').focus().blur();
    cy.contains('Latitude are required');
    cy.get('[name= "description"]').focus().blur();
    cy.contains('Description is required');
    cy.get('[name= "description"]').focus().type('There are many variations of passages of Lorem ' +
      'Ipsum available, but the majority have suffered alteration in some form, by injected humour, ' +
      'or randomised words which don\'t look even slightly believable. If you are going to use a passage' +
      ' of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.' +
      ' All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making' +
      ' this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model ' +
      'sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from r' +
      'epetition, injected humour, or non-characteristic words etc. ');
    cy.contains('Max length 256');
    cy.get('button.btn.btn-danger').should('be.disabled');
  });
})
