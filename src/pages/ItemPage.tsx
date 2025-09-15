import React from 'react'
import ItemList from '../components/ItemList'
import CreateItemForm from '../components/CreateItemForm'

const ItemPage: React.FC = () => {
  const [refresh, setRefresh] = React.useState(false)

  const handleRefresh = () => {
    setRefresh((prev) => !prev)
  }


  return (
    <div>
      <h1>Vgregion vård</h1>
      <div
        style={{
          backgroundColor: "#00A6DA",
          color: "white",
          padding: "1.4rem",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
      </div>  
      <CreateItemForm onItemCreated={handleRefresh} />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Vårdmateriel</h1>
      <ItemList key={refresh.toString()} />
    </div>
  )
}

export default ItemPage
