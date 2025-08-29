'use client'

import { useState } from 'react'
import Link from 'next/link'

// Categories with subcategories
const categories = [
  { id: 1, name: 'Sofas & Couches', subcategories: [{ id: 101, name: 'Sectional Sofas' }, { id: 102, name: 'Loveseats' }] },
  { id: 2, name: 'Dining Tables', subcategories: [{ id: 201, name: 'Wooden Dining Tables' }, { id: 202, name: 'Glass Dining Tables' }] },
  { id: 3, name: 'Beds', subcategories: [{ id: 301, name: 'King Size Beds' }, { id: 302, name: 'Queen Size Beds' }] },
]

// Sample data
const initialProducts = [
  { id: 1, name: 'Leather Sectional Sofa', category: 'Sofas & Couches', subcategory: 'Sectional Sofas', price: 1299, stock: 15, sku: 'SOFA-001', status: 'In Stock', brand: 'Ikea', color: 'Brown', material: 'Leather', warranty: '2 years', imageUrl: 'https://via.placeholder.com/80' },
  { id: 2, name: 'Oak Dining Table', category: 'Dining Tables', subcategory: 'Wooden Dining Tables', price: 899, stock: 8, sku: 'TABLE-001', status: 'Low Stock', brand: 'Ashley', color: 'Oak', material: 'Wood', warranty: '1 year', imageUrl: 'https://via.placeholder.com/80' },
]

export default function Products() {
  const [products, setProducts] = useState(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter(product => product.id !== id))
    }
  }

  const filteredSubcategories = selectedCategory
    ? categories.find(cat => cat.name === selectedCategory)?.subcategories || []
    : []

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false
    return true
  })

  return (
    <div className="md:ml-64 pt-16">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Product Management</h2>
          <Link href="/products/add" className="btn-primary">Add New Product</Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Filter Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategory('') }} className="w-full border rounded px-3 py-2">
                <option value="">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Subcategory</label>
              <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} disabled={!selectedCategory} className="w-full border rounded px-3 py-2">
                <option value="">All Subcategories</option>
                {filteredSubcategories.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={() => { setSelectedCategory(''); setSelectedSubcategory('') }} className="btn-secondary">Clear Filters</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium">All Products ({filteredProducts.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs">Image</th>
                  <th className="px-6 py-3 text-left text-xs">Name</th>
                  <th className="px-6 py-3 text-left text-xs">SKU</th>
                  <th className="px-6 py-3 text-left text-xs">Category</th>
                  <th className="px-6 py-3 text-left text-xs">Subcategory</th>
                  <th className="px-6 py-3 text-left text-xs">Price</th>
                  <th className="px-6 py-3 text-left text-xs">Stock</th>
                  <th className="px-6 py-3 text-left text-xs">Brand</th>
                  <th className="px-6 py-3 text-left text-xs">Status</th>
                  <th className="px-6 py-3 text-left text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4">{p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded" />}</td>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">{p.sku}</td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4">{p.subcategory}</td>
                    <td className="px-6 py-4">${p.price}</td>
                    <td className="px-6 py-4">{p.stock}</td>
                    <td className="px-6 py-4">{p.brand}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${p.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/products/edit/${p.id}`} className="text-indigo-600 mr-2">Edit</Link>
                      <button onClick={() => handleDeleteProduct(p.id)} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && <p className="text-center py-6 text-gray-500">No products found.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
