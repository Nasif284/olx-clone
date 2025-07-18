import './Navbar.css'
import { logo,search,arrow,searchWt } from '../../assets'
import { auth } from '../../Firebase'
import addBtn from '../../assets/addButton.png'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = ({ toggleModal, toggleModalSell }) => {
  const navigate= useNavigate()
  const {user}=useSelector((state)=> state.auth)
  return (
    <div>
      <nav className="fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
        <img style={{ cursor: "pointer" }} src={logo} alt="" className="w-12 " onClick={() => navigate("/")} />
        <div className="relative location-search  ml-5">
          <img src={search} alt="" className="absolute top-4 left-2 w-5" />
          <input placeholder="Search city, area, or locality..." className="w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300" type="text" />
          <img src={arrow} alt="" className="absolute top-4 right-3 w-5 cursor-pointer" />
        </div>

        <div className="ml-5 mr-2 relative w-full main-search">
          <input placeholder="Find Cars, Mobile Phones, and More..." className="w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300" type="text" />
          <div style={{ backgroundColor: "#002f34" }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
            <img className="w-5 filter invert" src={searchWt} alt="Search Icon" />
          </div>
        </div>

        <div style={{ cursor: "pointer" }} className="mx-1 sm:ml-5 sm:mr-5 relative lang">
          <i onClick={() => navigate("/cart")} style={{ fontSize: "30px" }} class="ri-shopping-cart-2-fill"></i>
        </div>

        {!user ? (
          <button className="font-bold underline ml-5 cursor-pointer" onClick={toggleModal} style={{ color: "#002f34" }}>
            Login
          </button>
        ) : (
          <div className="relative" onClick={()=>navigate('/my-products')}>
            <p style={{ color: "#002f34" }} className="font-bold ml-5 cursor-pointer">
              Hi,{user.displayName?.split(" ")[0]}
            </p>
          </div>
        )}

        <img src={addBtn} onClick={user ? toggleModalSell : toggleModal} className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer" alt="" />
        {user && (
          <button className="font-bold underline ml-5 cursor-pointer" onClick={() => signOut(auth)} style={{ color: "#002f34" }}>
            Logout
          </button>
        )}
      </nav>

      <div className="w-full relative z-0 flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists">
        <ul className="list-none flex items-center justify-between w-full">
          <div className="flex flex-shrink-0">
            <p className="font-semibold uppercase all-cats"> All categories</p>
            <img className="w-4 ml-2" src={arrow} alt="" />
          </div>

          <li>Cars</li>
          <li>Motorcycles</li>
          <li>Mobile Phones</li>
          <li>For sale : Houses & Apartments</li>
          <li>Scooter</li>
          <li>Commercial & Other Vehicles</li>
          <li>For rent : Houses & Apartments</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

