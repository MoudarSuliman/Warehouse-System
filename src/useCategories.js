import { useEffect, useState } from "react";

export const useCategories = () => {
    const [categories, setCategories] = useState([])
    
  useEffect(() => {
    fetch("http://localhost:5000/categories").then((get) => {
      return get.json();
    }).then((resp) => {
      setCategories(resp);
    }).catch((error) => {
      console.log(error.message);
    })
  }, []);


  return {
    categories
  }
}