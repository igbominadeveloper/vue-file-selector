/// <reference types="cypress" />

const url = Cypress.env(process.env.NODE_ENV);

describe('File Selector', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(url);
  });

  it('displays the button to select files', () => {
    cy.get('.click-handler').should('have.length', 1);
    cy.get('.click-handler').should('have.text', 'Please wait...');
  });

  it('displays the section to list all selected files', () => {
    cy.get('.selected-files').should('have.length', 1);
  });

  it('Open the directory tree when the button is clicked', () => {
    cy.get('.click-handler').click();

    cy.get('.directory-tree').should('have.length', 1);
    cy.get('.directory-tree').should('be.visible');
  });

  it('show a header section with close button', () => {
    cy.get('.click-handler').click();
    cy.get('.close-button-container').should('have.length', 1);
    cy.get('.close-button-container').should('be.visible');
  });

  it('show close the overlay when the close button is clicked', () => {
    cy.get('.click-handler').click();

    // wait for a few seconds
    cy.wait(1000);

    cy.get('.close-button-container').click();
    cy.get('.directory-tree').should('not.be.visible');
  });

  it('show folders and files when the overlay is open', () => {
    cy.get('.click-handler').click();

    // wait for a few seconds
    cy.wait(1000);

    cy.get('.directory-node').should('have.length', 3);
    cy.get('.file-node').should('have.length', 1);
  });

  it('show the back button when a folder is clicked on', () => {
    cy.get('.click-handler').click();
    cy.get('.back-button').should('not.be.visible');

    // wait for a few seconds
    cy.wait(1000);

    cy.get('.directory-node').first().click();
    cy.get('.back-button').should('be.visible');
  });

  it('go to the previous folder when the back button is clicked on', () => {
    cy.get('.click-handler').click();
    let currentFolderName = '';
    cy.get('.directory-name')
      .first()
      .invoke('val')
      .then((val) => (currentFolderName = val));
    // wait for a few seconds
    cy.wait(1000);
    cy.get('.directory-node').first().click();
    cy.get('.back-button-container').click();

    let previousFolderName = '';
    cy.get('.directory-name')
      .first()
      .invoke('val')
      .then((val) => (previousFolderName = val));

    expect(previousFolderName).to.equal(currentFolderName);
  });

  it('toggles file selection with multiple clicks', () => {
    cy.get('.click-handler').click();

    cy.get('.file-node').click();
    cy.get('.file-node-selector').should('be.visible');
    cy.wait(1000);
    cy.get('.file-node').click();
    cy.get('.file-node-selector').should('have.length', 0);
  });

  it('disables the add files button when there are no selected files', () => {
    cy.get('.click-handler').click();

    cy.get('.directory-tree-footer-button').should('be.disabled');
    cy.get('.file-node').click();
    cy.get('.directory-tree-footer-button').should('not.be.disabled');
  });

  it('add a selected file to the list', () => {
    cy.get('.click-handler').click();

    cy.get('.file-node').click();
    cy.get('.directory-tree-footer-button').click();

    cy.get('.selected-files-item').should('have.length', 1);
  });

  it('add multiple files to the list', () => {
    cy.get('.click-handler').click();

    cy.get('.file-node').click();
    cy.get('.directory-node').last().click();
    cy.get('.file-node').first().click();

    cy.get('.directory-tree-footer-button').click();
    cy.get('.selected-files-item').should('have.length', 2);
  });

  it('remove a file from the list', () => {
    cy.get('.click-handler').click();

    cy.get('.file-node').click();
    cy.get('.directory-node').last().click();
    cy.get('.file-node').first().click();

    cy.get('.directory-tree-footer-button').click();
    cy.get('.selected-files-item').should('have.length', 2);

    cy.get('.click-handler').click();
    cy.get('.file-node').click();
    cy.get('.directory-tree-footer-button').click();
    cy.get('.selected-files-item').should('have.length', 1);
  });

  it('remove all files from the list', () => {
    cy.get('.click-handler').click();

    cy.get('.file-node').click();
    cy.get('.directory-node').last().click();
    cy.get('.file-node').first().click();

    cy.get('.directory-tree-footer-button').click();
    cy.get('.selected-files-item').should('have.length', 2);

    cy.get('.click-handler').click();
    cy.get('.file-node').click();
    cy.get('.directory-node').last().click();
    cy.get('.file-node').first().click();

    cy.get('.close-button').click();
    cy.get('.selected-files-item').should('have.length', 0);
  });
});
