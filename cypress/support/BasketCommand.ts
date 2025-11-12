import type { InputProductModel } from '../models/InputProductModel.js'
import type { ResultProductModel } from '../models/ResultProductModel.js'
/**
 * Add a product to the basket via API
 * @param productId number
 * @param quantity number
 */
Cypress.Commands.add('apiAddToBasket', (productId: number, quantity: number) => {
  cy.request({
    method: 'POST',
    url: '/api/BasketItems/',
    headers: { Authorization: `Bearer ${token}` },
    body: { ProductId: productId, BasketId: basketId, quantity },
    failOnStatusCode: false
  }).then((response) => {
    console.log('Add to basket response: ' + JSON.stringify(response.body))
    expect(response.status).to.be.equal(successCode)
  })
})

/**
* Get all products currently in basket
* @param expectedBasketProducts BasketProduct[]
*/
Cypress.Commands.add('verifyBasketProducts', (expectedBasketProducts: InputProductModel[]) => {
  cy.request({
    method: 'GET',
    url: `/rest/basket/${basketId}`,
    headers: { Authorization: `Bearer ${token}` }
  }).then((resp) => {
    expect(resp.status).to.eq(200)
    console.log('Response: ' + JSON.stringify(resp.body))
    const responseProducts = resp.body.data.Products
    cy.log('Expected:', JSON.stringify(expectedBasketProducts))
    cy.log('Basket:', JSON.stringify(responseProducts))
    const basketProductsMap = new Map(
      responseProducts.map((p: any) => [p.id, p.BasketItem.quantity])
    )
    expectedBasketProducts.forEach(expectedProduct => {
      const quantity = basketProductsMap.get(expectedProduct.productId)
      expect(quantity, `Product ID ${expectedProduct.productId} should exist in basket`).to.not.be.undefined
      expect(quantity, `Product ID ${expectedProduct.productId} should have quantity ${expectedProduct.quantity}`).to.equal(expectedProduct.quantity)
    })
  })
})

/**
* Get all products currently in basket
* @returns {ResultProductModel[]}
*/
Cypress.Commands.add('getBasketProducts', () => {
  cy.request({
    method: 'GET',
    url: `/rest/basket/${basketId}`,
    headers: { Authorization: `Bearer ${token}` }
  }).then((resp) => {
    expect(resp.status).to.eq(successCode)

    const products = resp.body.data?.Products || []
    cy.wrap(products).as('basketProducts')
    return cy.wrap(products)
  })
})

/**
 * Delete a product from basket by productId or name
 * Uses BasketProductResultModel
 * @param {Object} options
 * @param {number} [options.productId]
 * @param {string} [options.name]
 */
Cypress.Commands.add('deleteBasketProduct', (options: { productId?: number, name?: string }) => {
  let targetBasketProduct: ResultProductModel | undefined
  cy.findProductInBasket(options).then((foundBasketProduct) => {
    if (!foundBasketProduct) {
      throw new Error(`No basket product found for ${options.productId || options.name}`)
    }

    targetBasketProduct = foundBasketProduct

    cy.request({
      method: 'DELETE',
      url: `/api/BasketItems/${targetBasketProduct.BasketItem.id}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      expect(response.status).to.eq(successCode)
      cy.log(`Deleted product: ${targetBasketProduct!.name} (id: ${targetBasketProduct!.id})`)
    })
  })
})

/**
 * Update quantity of a product in basket
 * Uses InputProductModel
 * @param updateProduct InputProductModel
 */
Cypress.Commands.add('updateBasketQuantity', (updateProduct: InputProductModel) => {
  const { productId, quantity } = updateProduct
  cy.findProductInBasket({ productId }).then((target) => {
    cy.request({
      method: 'PUT',
      url: `/api/BasketItems/${target!.BasketItem.id}`,
      headers: { Authorization: `Bearer ${token}` },
      body: { quantity }
    }).then((resp) => {
      expect(resp.status).to.eq(200)
      cy.log(`Updated quantity of ${target!.name} to ${quantity}`)
    })
  })
})

/**
 * Find a product in basket by productId or name
 * Uses BasketProductResultModel
 * @param {Object} options
 * @param {number} [options.productId]
 * @param {string} [options.name]
 * @returns {ResultProductModel | undefined}
 */
Cypress.Commands.add('findProductInBasket', (options: { productId?: number, name?: string }) => {
  cy.getBasketProducts().then((products: ResultProductModel[]) => {
    let targetBasketProduct: ResultProductModel | undefined

    if (options.productId) {
      targetBasketProduct = products.find((p) => p.BasketItem.ProductId === options.productId)
    } else if (options.name !== undefined && options.name.trim() !== '') {
      targetBasketProduct = products.find((p) =>
        p.name.toLowerCase().includes(options.name!.toLowerCase())
      )
    }
    cy.wrap(targetBasketProduct).as('targetBasketProduct')
    return cy.wrap(targetBasketProduct)
  })
})
