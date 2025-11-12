export interface ResultProductModel {
  id: number
  name: string
  price: number
  BasketItem: {
    id: number
    BasketId: number
    ProductId: number
    quantity: number
  }
}
