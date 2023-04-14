import { FETCH_PRODUCTS, SET_PRODUCTS } from "../constants/actionTypes";
import { setLoading, setError } from "../actions/loadingStates";

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

const fetchProducts = () => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
      let data = await getData();
      let filteredProducts = filterProducts(data);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: filteredProducts,
      });
    } catch {
      dispatch(setLoading(false));
      dispatch(setError(true));
    }
  };
};

const getData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  return data;
};

const filterProducts = (products) => {
  return products.filter(
    (product) =>
      product.category === `men's clothing` ||
      product.category === `women's clothing`
  );
};

export { setProducts, fetchProducts };
