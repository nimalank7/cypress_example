const imposter = {
    "port": 8000,
    "protocol": "http",
    "stubs": [{
      "predicates": [{
        "equals": {
          "path": "/data",
          "method": "GET"
        }
      }],
      "responses": [{
        "is": {
          "statusCode": 200,
          "headers": { "Content-Type": "application/json" },
          "body": { name: 'John', age: 25, subject: 'History' }
        }
      }]
    }]
  }

describe('Calling /data endpoint', () => {
       it('should contain text in body', () => {
        cy.task('clearStubs', imposter)
        cy.task('setupStubs', imposter)  
        cy.visit('/')
        cy.get('body').should('contain', 'Hello to John')
   })
})
    
