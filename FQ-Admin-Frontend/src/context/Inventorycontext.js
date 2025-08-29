"use client";
import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([
    { id: 1, productId: "P001", name: "Coffee Table", stock: 5 },
    { id: 2, productId: "P002", name: "Wardrobe", stock: 0 },
    { id: 3, productId: "P003", name: "Bookshelf", stock: 2 },
    { id: 4, productId: "P004", name: "TV Unit", stock: 10 },
    { id: 5, productId: "P005", name: "Office Chair", stock: 0 },
  ]);

  // Function to update stock when logs are added
  const updateStock = (productId, change) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, stock: item.stock + change }
          : item
      )
    );
  };

  return (
    <InventoryContext.Provider value={{ inventory, updateStock }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
