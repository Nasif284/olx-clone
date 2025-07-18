import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home' 
import Details from './Pages/Details'
import  { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from './Firebase'; 
import { setUser } from './Redux/slices/authSlice'; 
import Signup from './Pages/SignUp';
import { Login, Navbar, Sell } from './Components';
import Cart from './Pages/Cart';
import MyProducts from './Pages/MyProducts';
const App = () => {
  const dispatch = useDispatch();
    const [openModal, setModal] = useState(false);
    const [openModalSell, setModalSell] = useState(false);
  
    const toggleModal = () => setModal(!openModal);
    const toggleModalSell = () => setModalSell(!openModalSell);
  // useEffect(() => {
  //   throw new Error("Test error");
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser || null));
    });
    return () => unsubscribe();
  }, [dispatch]);
  
  return (
    <>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell toggleModalSell={toggleModalSell} status={openModalSell} />
      <Routes>
        <Route path="/" element={<Home toggleModal={toggleModal} toggleModalSell={toggleModalSell} />} />
        <Route path="/details" element={<Details toggleModal={toggleModal} toggleModalSell={toggleModalSell} />} />
        <Route path="/signUp" element={<Signup toggleModal={toggleModal} />} />
        <Route path="/my-products" element={<MyProducts />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App
