describe('Contact API', () => {
    const endpoint = '/api/contact'
  
    it('should submit valid contact data', () => {
      cy.request({
        method: 'POST',
        url: endpoint,
        body: {
          name: 'Ahmad',
          email: 'ahmad@example.com',
          message: 'This is a test message.'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('success', true)
        expect(response.body).to.have.property('message', 'Your message has been received.')
      })
    })
  
    it('should fail with invalid email', () => {
      cy.request({
        method: 'POST',
        url: endpoint,
        body: {
          name: 'Ahmad',
          email: 'invalid-email',
          message: 'Test'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body).to.have.property('success', false)
        expect(response.body.errors).to.have.property('email')
      })
    })
  
    it('should fail when fields are empty', () => {
      cy.request({
        method: 'POST',
        url: endpoint,
        body: {},
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body).to.have.property('success', false)
        expect(response.body.errors).to.have.property('name')
        expect(response.body.errors).to.have.property('email')
        expect(response.body.errors).to.have.property('message')
      })
    })
  })
  