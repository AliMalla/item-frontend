import axios from 'axios'
import type { ItemDto, ItemUpdateDto } from '../types/item'

// Create a base axios instance
const api = axios.create({
  baseURL: '/', // Vite proxy will forward /items to backend
  headers: {
    'Content-Type': 'application/json',
  },
})

// ---- API functions ----

// Get all items
export const getItems = async (): Promise<ItemDto[]> => {
  const response = await api.get<ItemDto[]>('/items')
  return response.data
}

// Create a new item
export const createItem = async (item: ItemDto): Promise<ItemDto> => {
  const response = await api.post<ItemDto>('/items', item) 
  return response.data
}

// Update item quantity by name
export const updateItemQuantity = async (
  name: string,
  update: ItemUpdateDto
): Promise<ItemDto> => {
  const response = await api.put<ItemDto>(`/items/${name}`, update)
  return response.data
}

// Delete item by name
export const deleteItem = async (name: string): Promise<void> => {
  await api.delete(`/items/${name}`)
}
