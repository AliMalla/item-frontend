import React, { useEffect, useState } from 'react'
import type { ItemDto } from '../types/item'
import { getItems, deleteItem } from '../api/api'
import UpdateQuantityForm from './UpdateQuantityForm'
import { FaTrash } from "react-icons/fa"; // trash icon
import { FaExclamationTriangle } from "react-icons/fa"

const ItemList: React.FC = () => {
  const [items, setItems] = useState<ItemDto[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch products on component mount
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
  setLoading(true)
  setError(null)
  try {
    const data = await getItems()
    setItems(data)
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Kunde inte hämta artiklarna'
    setError(error)
  } finally {
    setLoading(false)
  }
}


  const handleDelete = async (name: string) => {
    if (!window.confirm(`Är du säker att du vill ta bort ${name}?`)) return
    try {
      await deleteItem(name)
      fetchItems() // reload list after deletion
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Kunde inte ta bort artikeln'
      setError(error)
    }
  }

  if (loading) return <p>Loading items...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  


  return (
    <div
        style={{
        display: "flex", justifyContent: "center", marginBottom: "50px"
        }}
    >
        <div style={{ width: "90%", maxWidth: 1300}}>
        {loading && <p>Loading items...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && items.length === 0 && <p>No items available.</p>}

        {!loading && items.length > 0 && (
            <table
            style={{
                width: "100%",
                borderCollapse: "collapse",               
                backgroundColor: "#F7F8FA",
                borderRadius: 6,
                overflow: "hidden",

            }}
            >
            <thead>
                <tr style={{ textAlign: "left", backgroundColor: "#B6B6B6" }}>
                <th style={{ padding: "12px" }}>Namn</th>
                <th style={{ padding: "12px" }}>Antal</th>
                <th style={{ padding: "12px" }}>Enhet</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                <tr
                    key={item.name}
                    style={{
                    borderBottom: "1px solid #cccc",
                    borderColor: "#B6B6B6",
                    backgroundColor: "#D7D7D7",
                    }}
                >
                    <td
                    style={{
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px", // space between icon and text
                    }}
                    >
                    <span
                      style={{
                        maxWidth: "200px",       // limit the name’s width
                        whiteSpace: "normal",    // allow wrapping
                        wordBreak: "break-word", // break long words if needed
                      }}
                    >
                      {item.name}
                    </span>
                    {item.quantity < 10 && (
                        <>
                        <FaExclamationTriangle color="orange" />
                        <span style={{ fontStyle: "italic", color: "red" }}>fatal i lager</span>
                        </>
                    )}
                    </td>

    
                    <td style={{ padding: "12px" }}>
                    <UpdateQuantityForm
                        name={item.name}
                        currentQuantity={item.quantity}
                        onUpdated={fetchItems}
                    />
                    </td>
                    <td style={{ padding: "12px" }}>{item.unity}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                    <FaTrash
                        onClick={() => handleDelete(item.name)}
                        style={{
                        cursor: "pointer",
                        color: "#888888",
                        }}
                    />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    </div>
  )

}

export default ItemList
