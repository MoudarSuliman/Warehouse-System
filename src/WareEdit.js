import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from './useCategories';

export const WareEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [product, setProduct] = useState({
    code: '',
    name: '',
    description: '',
    category: null,
    quantity: '',
    measure: '',
    price: '',
  });

  useEffect(() => {
    fetch(`http://localhost:5000/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === 'category' ? parseInt(value, 10) : value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: parsedValue,
    }));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/product/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Product updated successfully');
      })
      .catch((error) => {
        console.log(error.message);
      });
      navigate('/products');  
  };

  return (
    <div className='create'>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product name:</label>
        <input
          maxLength={8}
          type="text"
          required 
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <label>Code:</label>
        <input
          maxLength={8}
          type="text"
          required
          name="code"
          value={product.code}
          onChange={handleChange}
          />
        <label>Description</label>
        <textarea
          type="text"
          required
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        <label>Quantity</label>
        <input 
          required
          type='number'
          min={0}
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <label>Measure</label>
        <select
          name="measure"
          value={product.measure}
          onChange={handleChange}
        >
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="litre">litre</option>
        </select>
        <label>Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
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
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WareEdit;
