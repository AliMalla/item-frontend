// Represents full item (like ItemDto in backend)
export interface ItemDto {
  name: string
  quantity: number
  unity: string
}

// Represents update payload (only quantity, like ItemUpdateDto in backend)
export interface ItemUpdateDto {
  quantity: number
}
