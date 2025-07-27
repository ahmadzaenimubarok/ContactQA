describe('Contact Form', () => {
  it('should submit the form successfully with valid data', () => {
    cy.visit('/contact')
    cy.get('input[name="name"]').type('Ahmad')
    cy.get('input[name="email"]').type('ahmad@example.com')
    cy.get('textarea[name="message"]').type('Ini pesan test yang valid.')
    cy.get('form').submit()
    cy.contains('Your message has been sent successfully.').should('exist')
  })

  it('should show validation error on empty fields', () => {
    cy.visit('/contact')
    cy.get('form').submit()
    cy.contains('The name field is required.').should('exist')
    cy.contains('The email field is required.').should('exist')
    cy.contains('The message field is required.').should('exist')
  })

  it('should show validation error on invalid email', () => {
    cy.visit('/contact')
    cy.get('input[name="name"]').type('Ahmad')
    cy.get('input[name="email"]').type('invalidemail')
    cy.get('textarea[name="message"]').type('Pesan yang valid.')
    cy.get('form').submit()
    cy.contains('The email field must be a valid email address.').should('exist')
  })

  it('should show validation error on short message', () => {
    cy.visit('/contact')
    cy.get('input[name="name"]').type('Ahmad')
    cy.get('input[name="email"]').type('ahmad@example.com')
    cy.get('textarea[name="message"]').type('short')
    cy.get('form').submit()
    cy.contains('The message field must be at least 10 characters.').should('exist')
  })
})
