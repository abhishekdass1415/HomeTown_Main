'use client'

import { useState } from 'react'

// Initial inventory data
const initialInventoryItems = [
  { id: 1, name: 'Leather Sofa', sku: 'LS-001', stock: 15, lowStock: 5, status: 'In Stock' },
  { id: 2, name: 'Dining Table', sku: 'DT-002', stock: 8, lowStock: 3, status: 'Low Stock' },
  { id: 3, name: 'King Size Bed', sku: 'KB-003', stock: 5, lowStock: 2, status: 'Low Stock' },
  { id: 4, name: 'Bookshelf', sku: 'BS-004', stock: 22, lowStock: 5, status: 'In Stock' },
  { id: 5, name: 'Coffee Table', sku: 'CT-005', stock: 0, lowStock: 2, status: 'Out of Stock' },
]

// Sample categories for the dropdown
const categories = [
  { id: 1, name: 'Sofas & Couches' },
  { id: 2, name: 'Dining Tables' },
  { id: 3, name: 'Beds' },
  { id: 4, name: 'Chairs' },
  { id: 5, name: 'Office Furniture' },
  { id: 6, name: 'Outdoor Furniture' },
]

export default function Inventory() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [lowStockFilter, setLowStockFilter] = useState(false)
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems)
  const [newItem, setNewItem] = useState({
    name: '',
    sku: '',
    category: '',
    stock: '',
    lowStock: '',
    price: '',
    cost: ''
  })

  const handleAddItem = (e) => {
    e.preventDefault()
    
    // Determine status based on stock level
    let status = 'In Stock'
    if (newItem.stock <= 0) {
      status = 'Out of Stock'
    } else if (newItem.stock <= newItem.lowStock) {
      status = 'Low Stock'
    }
    
    // Create a new inventory item object
    const item = {
      id: inventoryItems.length + 1,
      name: newItem.name,
      sku: newItem.sku.toUpperCase(),
      category: newItem.category,
      stock: parseInt(newItem.stock),
      lowStock: parseInt(newItem.lowStock),
      status: status,
      price: newItem.price ? `$${newItem.price}` : 'N/A',
      cost: newItem.cost ? `$${newItem.cost}` : 'N/A'
    }
    
    // Add to inventory items list
    setInventoryItems([...inventoryItems, item])
    
    // Reset form and hide it
    setNewItem({
      name: '',
      sku: '',
      category: '',
      stock: '',
      lowStock: '',
      price: '',
      cost: ''
    })
    setShowAddForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewItem({
      ...newItem,
      [name]: value
    })
  }

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id))
    }
  }

  const handleUpdateStock = (id, newStock) => {
    const updatedItems = inventoryItems.map(item => {
      if (item.id === id) {
        let status = 'In Stock'
        if (newStock <= 0) {
          status = 'Out of Stock'
        } else if (newStock <= item.lowStock) {
          status = 'Low Stock'
        }
        return { ...item, stock: newStock, status }
      }
      return item
    })
    setInventoryItems(updatedItems)
  }

  const filteredItems = lowStockFilter 
    ? inventoryItems.filter(item => item.stock <= item.lowStock)
    : inventoryItems

  return (
    <div className="ml-64 pt-16">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Inventory Management</h2>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={lowStockFilter}
                onChange={(e) => setLowStockFilter(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">Show low stock only</span>
            </label>
            <button 
              className="btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : 'Add New Item'}
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Inventory Item</h3>
            <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                  SKU Code
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={newItem.sku}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., LS-001"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={newItem.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label htmlFor="lowStock" className="block text-sm font-medium text-gray-700 mb-1">
                  Low Stock Alert Level
                </label>
                <input
                  type="number"
                  id="lowStock"
                  name="lowStock"
                  value={newItem.lowStock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="1"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Price ($)
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={newItem.cost}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Inventory List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Inventory Overview</h3>
            <p className="mt-1 text-sm text-gray-500">
              Total Items: {inventoryItems.length} | 
              In Stock: {inventoryItems.filter(item => item.status === 'In Stock').length} | 
              Low Stock: {inventoryItems.filter(item => item.status === 'Low Stock').length} | 
              Out of Stock: {inventoryItems.filter(item => item.status === 'Out of Stock').length}
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {inventoryItems.length === 0 ? (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No inventory items</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding your first inventory item.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setShowAddForm(true)}
                  >
                    Add Item
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Low Stock Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className={item.status === 'Out of Stock' ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lowStock}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                            item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                            onClick={() => {
                              const newStock = prompt(`Enter new stock quantity for ${item.name}:`, item.stock)
                              if (newStock !== null && !isNaN(newStock)) {
                                handleUpdateStock(item.id, parseInt(newStock))
                              }
                            }}
                          >
                            Update
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}