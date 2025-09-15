import React, { useState } from 'react'
import { updateItemQuantity } from '../api/api'
import type { ItemUpdateDto } from '../types/item'

interface Props {
  name: string
  currentQuantity: number
  onUpdated: () => void // callback to refresh the list
}

const UpdateQuantityForm: React.FC<Props> = ({ name, currentQuantity, onUpdated }) => {
  const [quantity, setQuantity] = useState<number>(currentQuantity)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (quantity < 0) {
      setError('Antal måste vara 0 eller större')
      return
    }

    const dto: ItemUpdateDto = { quantity }

    try {
      setLoading(true)
      await updateItemQuantity(name, dto)
      onUpdated()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Kunde inte updatera artikeln'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
      <input
        type="number"
        value={quantity}
        min={0}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{
        color: quantity < 10 ? 'red' : 'black',
        borderColor: quantity < 10 ? 'red' : '#ccc',
        }}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Updateras...' : 'Updatera'}
      </button>
      {error && <span style={{ color: 'red', marginLeft: '10px' }}>{error}</span>}
    </form>
  )
}

export default UpdateQuantityForm
