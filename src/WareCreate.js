import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCategories } from './useCategories';
import { nanoid } from 'nanoid';

export const WareCreate = () => {
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [measure, setMeasure] = useState('kg');
  const [price, setunitPrice] = useState('');
  const { categories } = useCategories();
  const [category, setcategory] = useState(10)
  const navigate = useNavigate();

  const code = nanoid(8).toUpperCase();

  const handleInputQuantity = (event) => {
    const valueAsString = event.target.value;
    if(!isNaN(valueAsString)){
      const inputValue = parseFloat(valueAsString);
      setQuantity(inputValue);
    }
  };
  const handleInputunitPrice = (event) => {
    const inputValue = parseFloat(event.target.value);
    setunitPrice(inputValue);
  };

  const handleInputCategory = (event) => {
    const inputCategoryId = parseInt(event.target.value);
    setcategory(inputCategoryId);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const product = { name, code, description, category, quantity, measure, price };

    fetch('http://localhost:5000/product', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    navigate('/products');
  };

  const handleInputName = (event) => {
      setName(event.target.value)
  }
  return (
    <div className='create'>
      <h2>Add new product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product name:</label>
        <input
          maxLength={8}
          type="text"
          required 
          value={name}
          onChange={handleInputName}
        />
        <label>Description</label>
        <textarea
          type="text"
          required
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Quantity</label>
        <input 
          required
          type='number'
          min={0}
          value={quantity}
          onChange={handleInputQuantity}
        />
        <label>Measure</label>
        <select
          value={measure}
          onChange={(ev) => setMeasure(ev.target.value)}
        >
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="litre">litre</option>
        </select>
        <label>Category</label>
        <select
          value={category}
          onChange={handleInputCategory}
        >
          {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
        <label>Unit Price</label>
        <input type='number'
          required
          min="0"
          value={price}
          onChange={handleInputunitPrice}
        />
        <button type="submit" className="btn btn-success">Submit</button>
      </form>

    </div>
  )
}
