import { useEffect } from "react";
import { Card } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/slices/productSlice"; 

const Home = () => {
  const dispatch = useDispatch();
  const {loading}= useSelector((state)=> state.product)
  const items = useSelector((state) => state.product.items);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <div>{loading ? <h1 className="ml-11 mt-11">Loading.... <i class="ri-shopping-cart-2-fill"></i></h1> : <Card items={items || []} />}</div>;
};

export default Home;
