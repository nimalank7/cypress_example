import axios from 'axios';
import { defineConfig } from 'cypress';

const mountebankUrl  = 'http://localhost:2525/imposters'

export default defineConfig({

  fileServerFolder: './test/cypress',
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: './test/cypress/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    
    setupNodeEvents(on, config) {
      on('task', {
        setupStubs (imposter) {
         return axios.post(mountebankUrl, imposter)
          .then(response => {
            return true
          })
          .catch(error => {
              console.error(`Error adding imposter: ${error.message}`)
              return false
          })
        },
        clearStubs() {
          return axios.delete(`${mountebankUrl}/8000`)
            .then(response => {
              return true
            })
            .catch(error => {
            console.error(error)
            return false
            })
          }
      })
    }
  }
})
