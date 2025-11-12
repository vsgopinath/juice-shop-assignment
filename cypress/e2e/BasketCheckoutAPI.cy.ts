/// <reference types="cypress" />

import { fa } from '@faker-js/faker'
import type { InputProductModel } from '../models/InputProductModel.js'

describe('Test for complete an order', () => {
  beforeEach(() => {
    const email = faker_NL.internet.email({ provider: 'example.com' })
    const password = 'Test@1234'
    cy.apiRegister(email, password)
    cy.apiLogin(email, password)
  })

  // Add product to Basket
  it('Add product to Basket', () => {
    cy.fixture('AddProductList.json').then((data) => {
      const addProducts = data as InputProductModel[]
      addProducts.forEach(basketProduct => {
        cy.apiAddToBasket(basketProduct.productId, basketProduct.quantity)
      })
      cy.verifyBasketProducts(addProducts)
    })
  })

  // Update product quantity in Basket
  it('Update product quantity in Basket', () => {
    cy.fixture('AddProductList.json').then((data) => {
      const addProducts = data as InputProductModel[]
      addProducts.forEach(basketProduct => {
        cy.apiAddToBasket(basketProduct.productId, basketProduct.quantity)
      })
      cy.verifyBasketProducts(addProducts)

      // Update quantity of first product
      const updatedProduct: InputProductModel = {
        productId: addProducts[0]!.productId,
        quantity: addProducts[0]!.quantity + 2
      }
      cy.updateBasketQuantity(updatedProduct)

      // Verify updated quantity
      const expectedProducts: InputProductModel[] = [
        updatedProduct,
        ...addProducts.slice(1)
      ]
      cy.verifyBasketProducts(expectedProducts)
    })
  })

  // Delete product from Basket by Id
  it('Delete product from Basket by Id', () => {
    cy.fixture('DeleteProductList.json').then((data) => {
      const addProducts = data as InputProductModel[]
      addProducts.forEach(basketProduct => {
        cy.apiAddToBasket(basketProduct.productId, basketProduct.quantity)
      })
      cy.getBasketProducts().then((basketProducts) => {
        cy.log('Basket Products before deletion:', JSON.stringify(basketProducts))
      })
      cy.deleteBasketProduct({ productId: addProducts[0]!.productId })
      cy.findProductInBasket({ productId: addProducts[0]!.productId }).then((foundProduct) => {
        expect(foundProduct).to.be.undefined
      })
    })
  })

  // Delete product from Basket by Name
  it('Delete product from Basket by Name', () => {
    cy.fixture('DeleteProductList.json').then((data) => {
      const addProducts = data as InputProductModel[]
      addProducts.forEach(basketProduct => {
        cy.apiAddToBasket(basketProduct.productId, basketProduct.quantity)
      })
      cy.getBasketProducts().then((basketProducts) => {
        cy.log('Basket Products before deletion:', JSON.stringify(basketProducts))
      })
      cy.deleteBasketProduct({ name: 'Raspberry' })
      cy.findProductInBasket({ name: 'Raspberry' }).then((foundProduct) => {
        expect(foundProduct).to.be.undefined
      })
    })
  })

  // Finalize Order
  it('Finalize Order', () => {
    cy.fixture('AddProductList.json').then((data) => {
      const addProducts = data as InputProductModel[]
      addProducts.forEach(basketProduct => {
        cy.apiAddToBasket(basketProduct.productId, basketProduct.quantity)
      })
    })
    let addressId: number
    const deliveryId: number = 1
    let paymentId: number
    cy.apiPostAddress({
      fullName: faker_NL.person.fullName(),
      streetAddress: faker_NL.location.streetAddress(),
      city: faker_NL.location.city(),
      zipCode: faker_NL.location.zipCode(),
      country: faker_NL.location.country(),
      mobileNum: faker_NL.phone.number({ style: 'human' }),
      state: faker_NL.location.state()
    }).then((address) => {
      expect(address.id).to.exist
      cy.wrap(address.id).as('addressId')
      addressId = address.id!
    })
    cy.apiAddNewCard({
      fullName: faker_NL.person.fullName(),
      cardNum: faker_NL.finance.creditCardNumber(),
      expMonth: faker_NL.date.month({ abbreviated: true }),
      expYear: faker_NL.date.future({ years: 5, refDate: new Date() }).getFullYear().toString(),
      cardCvv: '123'
    }).then((payment) => {
      expect(payment.id).to.exist
      cy.wrap(payment.id).as('paymentId')
      paymentId = payment.id!
    })

    cy.apiFinalizeCheckout({
      couponData: '',
      addressId: addressId!,
      deliveryMethodId: deliveryId,
      paymentId: paymentId!
    }).then((orderNumber) => {
      cy.log('Order Number: ' + orderNumber)
      expect(orderNumber).to.be.a('string').and.to.have.length.lte(22)
    })
  })
})
