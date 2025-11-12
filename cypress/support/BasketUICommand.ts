Cypress.Commands.add('addProductToBasket', (productName: string) => {
  cy.contains('mat-card', productName)
    .should('be.visible')
    .within(() => {
      cy.get('button[aria-label^="Add to Basket"]').click({ force: true })
    })
  cy.log(`Added product: ${productName}`)
})

Cypress.Commands.add('openBasket', () => {
  cy.get('button[aria-label="Open Sidenav"]').click({ force: true })
  cy.get('button[aria-label="Show the shopping cart"]').click({ force: true })
  cy.url().should('include', '/basket')
})

Cypress.Commands.add('removeProductFromBasket', (productName: string) => {
  cy.contains('mat-row', productName)
    .find('svg[data-icon="trash-alt"]')
    .click({ force: true })
  cy.wait(2000)
  cy.log(`Removed product: ${productName}`)
})

Cypress.Commands.add('changeProductQuantity', (productName: string, quantity: number) => {
  cy.contains('mat-row', productName)
    .find('svg[data-icon="plus-square"]').click({ force: true })
  cy.log(`Changed quantity for ${productName} to ${quantity}`)
})

Cypress.Commands.add('calculateBasketTotalUI', () => {
  let computedTotal = 0

  // Iterate through each basket row
  cy.get('mat-row').each(($row) => {
    cy.wrap($row)
      .find('[data-test-id="quantity"]')
      .invoke('text')
      .then((qtyText) => {
        const quantity = Number(qtyText)

        cy.wrap($row)
          .find('[data-test-id="productPrice"')
          .invoke('text')
          .then((priceText) => {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''))
            computedTotal += price * quantity
          })
      })
  })

  // After all rows processed
  cy.then(() => {
    cy.log(`💵 Computed basket total: ${computedTotal.toFixed(2)}`)

    // Compare with displayed total
    cy.get('[data-test-id="totalPrice"]')
      .invoke('text')
      .then((totalText) => {
        const displayedTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''))
        cy.log(`💰 Displayed basket total: ${displayedTotal.toFixed(2)}`)
        expect(displayedTotal).to.be.closeTo(computedTotal, 0.01)
      })
  })
})

Cypress.Commands.add('proceedToCheckout', () => {
  cy.contains('button', 'Checkout').click({ force: true })
  cy.url().should('include', '/address/select')
})
