import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const deleteProduct = (productId) => {
    fetch(`http://localhost:5000/product/${productId}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return {
    products,
    deleteProduct
  };
};

export default useProducts;
