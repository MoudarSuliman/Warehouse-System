import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from './useCategories';
import { useProducts } from './useProducts';

export const WareList = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { products, deleteProduct } = useProducts();

  const onEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const onCreate = () => {
    navigate('/products/create');
  };

  const onDelete = (productId) => {
    deleteProduct(productId);
  };


  const totalValue = products.reduce((sum, product) => {
    const value = product.quantity * product.price;
    return sum + value;
  }, 0);

  const totalUnits = products.reduce((sum, product) => sum + parseInt(product.quantity), 0);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Warehouse List</h2>
        </div>
        <div className="align-left">
          &nbsp;
          <button onClick={onCreate} type="button" className="btn btn-warning">
            New
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Id</td>
              <td>Code</td>
              <td>Dame</td>
              <td>Description</td>
              <td>Category</td>
              <td>Quantity</td>
              <td>Measure</td>
              <td>Price</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const categoryId = product.category ? product.category : null;
              const filteredCategories = categories.filter((c) => c.id === categoryId);
              const category = filteredCategories.length > 0 ? filteredCategories[0].name : null;
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.measure}</td>
                  <td>{product.price}</td>
                  <td>
                    <button onClick={() => onEdit(product.id)} type="button" className="btn btn-dark">
                      Edit
                    </button>
                    &nbsp;
                    <button onClick={() => onDelete(product.id)} type="button" className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="summary">
          <p>Total Value: {totalValue}</p>
          <p>Total Units: {totalUnits}</p>
        </div>
      </div>
    </div>
  );
};
