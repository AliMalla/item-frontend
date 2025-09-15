import React, { useState } from 'react'
import type { ItemDto } from '../types/item'
import { createItem } from '../api/api'

interface Props {
  onItemCreated: () => void // callback to refresh the product list
}

const CreateItemForm: React.FC<Props> = ({ onItemCreated: onItemCreated }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState<number>(0)
  const [unity, setUnity] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !unity) {
      setError('Namn och Enhet är obligatoriska')
      return
    }

    const newItem: ItemDto = { name, quantity, unity }

    try {
      setLoading(true)
      await createItem(newItem)
      setName('')
      setQuantity(0)
      setUnity('')
      onItemCreated() // refresh list in parent
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Kunde inte lägga till artikeln'
      setError(message + " Kunde inte lägga till artikeln eftersom den redan finns")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Lägg till en artikel</h2>

      {/* Felmeddelande */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Namn */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name">Namn: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ange artikelns namn"
        />
      </div>

      {/* Antal */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="quantity">Antal: </label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          min={0}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="0"
        />
      </div>

      {/* Enhet */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="unity">Enhet: </label>
        <input
          id="unity"
          type="text"
          value={unity}
          onChange={(e) => setUnity(e.target.value)}
          required
          placeholder="t.ex. st, förpackning"
        />
      </div>

      {/* Submit-knapp */}
      <button type="submit" disabled={loading}>
        {loading ? 'Lägger till...' : 'Lägg till artikel'}
      </button>
    </form>
  )
}

export default CreateItemForm
