// cypress/support/CheckoutCommand.ts
/// <reference types="cypress" />

import type { AddressModel, FinalizeCheckoutModel, PaymentModel } from '../models/CheckoutModels.js'

/**
* Get all products currently in basket
* @param address AddressModel
* @returns {AddressModel}
*/
Cypress.Commands.add('apiPostAddress', (address: AddressModel) => {
  cy.request({
    method: 'POST',
    url: '/api/Addresss/',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(address)
  }).then((resp) => {
    expect(resp.status).to.eq(createdCode)
    const address = resp.body.data as AddressModel
    cy.wrap(address).as('address')
    return cy.wrap(address)
  })
})

/**
 * Add a new payment card via API
 * @param payment PaymentModel
 * @returns {PaymentModel}
 */
Cypress.Commands.add('apiAddNewCard', (payment: PaymentModel) => {
  cy.request({
    method: 'POST',
    url: '/api/Cards/',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payment)
  }).then((resp) => {
    expect(resp.status).to.eq(createdCode)
    const payment = resp.body.data as PaymentModel
    cy.wrap(payment).as('payment')
    return cy.wrap(payment)
  })
})

/**
 * Add a new payment card via API
 * @param payment PaymentModel
 * @returns {PaymentModel}
 */
Cypress.Commands.add('apiFinalizeCheckout', (checkoutDetails: FinalizeCheckoutModel) => {
  cy.request({
    method: 'POST',
    url: `rest/basket/${basketId}/checkout`,
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(checkoutDetails)
  }).then((resp) => {
    expect(resp.status).to.eq(successCode)
    const orderNumber = resp.body.orderConfirmation as string
    cy.wrap(orderNumber).as('orderNumber')
    return cy.wrap(orderNumber)
  })
})
