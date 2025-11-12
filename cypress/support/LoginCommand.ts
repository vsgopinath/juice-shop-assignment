/// <reference types="cypress" />

/**
 * Dismiss cookies and set language cookie
 */
Cypress.Commands.add('dismissCookies', () => {
  cy.setCookie('cookieconsent_status', 'dismiss')
  cy.setCookie('welcomebanner_status', 'dismiss')
  cy.setCookie('language', 'en')
})

/**
 * Register a new user via API
 * @param email string
 * @param password string
 */
Cypress.Commands.add('apiRegister', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/Users/',
    body: {
      email,
      password,
      passwordRepeat: password,
      securityQuestion: 'Name of your favorite pet?',
      securityAnswer: 'Fluffy'
    },
    failOnStatusCode: false
  }).then((response) => {
    cy.log('Register response: ' + JSON.stringify(response.body))
    expect(response.status).to.be.equal(createdCode)
  })
})

/**
 * Login via API and set token and basketId globals
 * @param email string
 * @param password string
 */
Cypress.Commands.add('apiLogin', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/rest/user/login',
    body: { email, password }
  }).then((response) => {
    expect(response.status).to.eq(successCode)

    token = response.body.authentication.token
    basketId = response.body.authentication.bid
  })
})

Cypress.Commands.add('uiLogin', (email: string, password: string) => {
  cy.contains('Login').click({ force: true })
  cy.url().should('include', '/login')

  cy.get('#email').should('be.visible').type(email, { delay: 10, force: true })
  cy.get('#password').type(password, { delay: 10, force: true })
  cy.get('#loginButton').click({ force: true })

  // Validation — wait for login success
  cy.get('button[aria-label="Show the shopping cart"]', { timeout: 10000 })
    .should('be.visible')
})
