describe('Juice Shop - Full UI Checkout Flow', () => {
  before(() => {
    const email = faker_NL.internet.email({ provider: 'example.com' })
    const password = 'Test@1234'
    cy.apiRegister(email, password)
    cy.dismissCookies()
    cy.visit('/')
    cy.uiLogin(email, password)
  })

  it('should complete a full checkout via UI', () => {
    cy.contains('Apple Juice').should('be.visible')

    // Add 3 products
    cy.addProductToBasket('Apple Juice')
    cy.addProductToBasket('Banana Juice')
    cy.addProductToBasket('Carrot Juice')

    // Open basket and manipulate items
    cy.openBasket()
    cy.changeProductQuantity('Banana Juice', 2)
    cy.removeProductFromBasket('Carrot Juice')
    cy.calculateBasketTotalUI()

    // Proceed through checkout flow
    cy.proceedToCheckout()
    cy.addNLAddressUI({
      fullName: faker_NL.person.fullName(),
      streetAddress: faker_NL.location.streetAddress(),
      city: faker_NL.location.city(),
      zipCode: faker_NL.location.zipCode(),
      country: faker_NL.location.country(),
      mobileNum: faker_NL.phone.number({ style: 'human' }),
      state: faker_NL.location.state()
    })
    cy.selectDeliveryMethodUI()
    cy.addNLPaymentUI({
      fullName: faker_NL.person.fullName(),
      cardNum: "4111111111111111",
      expMonth: "8",
      expYear: "2080"
    })
    cy.reviewAndPlaceOrderUI()
  })
})