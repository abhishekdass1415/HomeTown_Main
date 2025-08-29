'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const categories = [
  { id: 1, name: 'Sofas & Couches', subcategories: [{ id: 101, name: 'Sectional Sofas' }, { id: 102, name: 'Loveseats' }] },
  { id: 2, name: 'Dining Tables', subcategories: [{ id: 201, name: 'Wooden Dining Tables' }] },
]

export default function AddProduct() {
  const router = useRouter()
  const [newProduct, setNewProduct] = useState({
    name: '', sku: '', category: '', subcategory: '', price: '', stock: '', lowStock: 5, description: '',
    brand: '', color: '', material: '', warranty: '', imageUrl: ''
  })

  const getSubcategories = () => {
    if (!newProduct.category) return []
    return categories.find(c => c.name === newProduct.category)?.subcategories || []
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    console.log('Adding product:', newProduct)
    router.push('/products')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewProduct({ ...newProduct, [name]: value })
  }

  return (
    <div className="md:ml-64 pt-16">
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add New Product</h2>
          <Link href="/products" className="btn-secondary">Back</Link>
        </div>

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
          <input name="name" value={newProduct.name} onChange={handleChange} required placeholder="Product Name *" className="border px-3 py-2 rounded" />
          <input name="sku" value={newProduct.sku} onChange={handleChange} required placeholder="SKU *" className="border px-3 py-2 rounded" />
          <select name="category" value={newProduct.category} onChange={handleChange} required className="border px-3 py-2 rounded">
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select name="subcategory" value={newProduct.subcategory} onChange={handleChange} required disabled={!newProduct.category} className="border px-3 py-2 rounded">
            <option value="">Select Subcategory</option>
            {getSubcategories().map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price *" required className="border px-3 py-2 rounded" />
          <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} placeholder="Stock *" required className="border px-3 py-2 rounded" />
          <input type="number" name="lowStock" value={newProduct.lowStock} onChange={handleChange} placeholder="Low Stock Alert" className="border px-3 py-2 rounded" />
          <input name="brand" value={newProduct.brand} onChange={handleChange} placeholder="Brand" className="border px-3 py-2 rounded" />
          <input name="color" value={newProduct.color} onChange={handleChange} placeholder="Color" className="border px-3 py-2 rounded" />
          <input name="material" value={newProduct.material} onChange={handleChange} placeholder="Material" className="border px-3 py-2 rounded" />
          <input name="warranty" value={newProduct.warranty} onChange={handleChange} placeholder="Warranty" className="border px-3 py-2 rounded" />
          <input name="imageUrl" value={newProduct.imageUrl} onChange={handleChange} placeholder="Image URL" className="border px-3 py-2 rounded" />
          <textarea name="description" value={newProduct.description} onChange={handleChange} placeholder="Description" rows={3} className="md:col-span-2 border px-3 py-2 rounded"></textarea>
          <div className="md:col-span-2 flex justify-end gap-3">
            <Link href="/products" className="btn-secondary">Cancel</Link>
            <button type="submit" className="btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
