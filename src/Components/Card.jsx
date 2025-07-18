import { useDispatch } from "react-redux";
import {  Link } from "react-router-dom";
import { addToCart} from "../Redux/slices/cartSlice"; 

const Card = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
      <h1 className="text-2xl text-[#002f34]">Fresh recommendations</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col justify-between h-80 p-3 border border-gray-300 rounded-md bg-gray-50">
            <Link to="/details" state={{ item }} className="flex-grow">
              <div className="w-full flex justify-center overflow-hidden mb-2">
                <img className="h-36 object-contain" src={item.imageUrl} alt={item.title} />
              </div>
              <div className="px-1">
                <h1 className="font-bold text-xl text-[#002f34]">₹ {item.price}</h1>
                <p className="text-sm pt-1 text-gray-600">{item.category}</p>
                <p className="pt-1 text-gray-800 line-clamp-2">{item.title}</p>
              </div>
            </Link>
            <button onClick={() => handleAddToCart(item)} className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to cart 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
