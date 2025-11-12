export interface AddressModel {
  city: string
  country: string
  fullName: string
  mobileNum: string
  state: string
  streetAddress: string
  zipCode: string
  id?: number
}

export interface PaymentModel {
  fullName: string
  cardNum: string
  expMonth: string
  expYear: string
  id?: number
}

export interface FinalizeCheckoutModel {
  couponData: string
  addressId: number
  deliveryMethodId: number
  paymentId: number
}
