/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable-next-line @typescript-eslint/method-signature-style */
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './LoginCommand.js'
import './BasketCommand.js'
import './CheckoutCommand.js'
import './CheckoutUICommand.js'
import './BasketUICommand.js'
import { fakerNL } from '@faker-js/faker'
import type { InputProductModel } from '../models/InputProductModel.js'
import type { ResultProductModel } from '../models/ResultProductModel.js'
import type { AddressModel, FinalizeCheckoutModel, PaymentModel } from '../models/CheckoutModels.js'

declare global {
  var successCode: number
  var createdCode: number
  var faker_NL: typeof fakerNL
  var token: string
  var basketId: string
  namespace Cypress {
    interface Chainable {

      // UI Commands
      dismissCookies(): Chainable<void>
      uiLogin(email: string, password: string): Chainable<void>
      addProductToBasket(productName: string): Chainable<void>
      openBasket(): Chainable<void>
      removeProductFromBasket(productName: string): Chainable<void>
      changeProductQuantity(productName: string, quantity: number): Chainable<void>
      calculateBasketTotalUI(): Chainable<void>
      proceedToCheckout(): Chainable<void>
      addNLAddressUI(address: AddressModel): Chainable<void>
      selectDeliveryMethodUI(): Chainable<void>
      addNLPaymentUI(payment: PaymentModel): Chainable<void>
      reviewAndPlaceOrderUI(): Chainable<void>

      // API Commands
      apiLogin(email: string, password: string): Chainable<void>
      apiRegister(email: string, password: string): Chainable<void>
      apiAddToBasket(productId: number, quantity: number): Chainable<void>
      verifyBasketProducts(expectedProductIds: InputProductModel[]): Chainable<void>
      getBasketProducts(): Chainable<ResultProductModel[]>
      deleteBasketProduct(options: { productId?: number, name?: string }): Chainable<void>
      findProductInBasket(options: { productId?: number, name?: string }): Chainable<ResultProductModel | undefined>
      updateBasketQuantity(updateProduct: InputProductModel): Chainable<void>
      apiPostAddress(address: AddressModel): Chainable<AddressModel>
      apiAddNewCard(payment: PaymentModel): Chainable<PaymentModel>
      apiFinalizeCheckout(checkoutDetails: FinalizeCheckoutModel): Chainable<string>
    }
  }
}

globalThis.faker_NL = fakerNL
globalThis.token = ''
globalThis.basketId = ''
globalThis.successCode = 200
globalThis.createdCode = 201
