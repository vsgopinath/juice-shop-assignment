
/** 
 * Add NL Address via UI
 * @param address AddressModel 
 */
Cypress.Commands.add('addNLAddressUI', (address) => {
  cy.contains('button', 'Add New Address').click({ force: true })
  cy.get('input[placeholder*="country"]').type(address.country)
  cy.get('input[placeholder*="name"]').type(address.fullName)
  cy.wait(1000)
  cy.get('input[placeholder*="mobile"]').type(address.mobileNum)
  cy.get('input[placeholder*="ZIP code"]').type(address.zipCode)
  cy.get('textarea[placeholder*="address"]').type(address.streetAddress)
  cy.get('input[placeholder*="city"]').type(address.city)
  cy.contains('button', 'Submit').click({ force: true })
  cy.contains('mat-cell', address.streetAddress).should('be.visible')
  cy.contains('button', 'Continue').click({ force: true })
  cy.url().should('include', '/delivery-method')
  cy.log('Added NL Address')
})

/** 
 * Select Delivery Method via UI
 */ 
Cypress.Commands.add('selectDeliveryMethodUI', () => {
  cy.contains('mat-cell', 'One Day Delivery').should('be.visible').click({ force: true })
  cy.contains('button', 'Continue').click({ force: true })
  cy.url().should('include', '/payment')
  cy.log('Selected delivery method')
})

/** 
 * Add NL Payment Method via UI
 * @param payment PaymentModel 
 */
Cypress.Commands.add('addNLPaymentUI', (payment) => {
  cy.contains('debit card').click({ force: true })
  cy.get('[data-test-id*="card"]').click().type(payment.cardNum)
  cy.get('[data-test-id*="expMonth"]').select(payment.expMonth)
  cy.get('[data-test-id*="expYear"]').select(payment.expYear)
  cy.get('[data-test-id*="fullName"]').type(payment.fullName)
  cy.contains('button', 'Submit').click({ force: true })
  cy.contains('mat-cell', payment.fullName).should('be.visible')
  cy.contains('button', 'Continue').click({ force: true })
  cy.url().should('include', '/order-summary')
  cy.log('Added payment method')
})

/** 
 * Review and Place Order via UI
 */
Cypress.Commands.add('reviewAndPlaceOrderUI', () => {
  cy.contains('button', 'Place your order and pay').click({ force: true })
  cy.contains('h1', 'Thank you for your purchase!').should('be.visible')
  cy.log('Order placed successfully')
})
