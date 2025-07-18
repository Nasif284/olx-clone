import { Modal, ModalBody } from "flowbite-react";
import { close,google } from "../assets";
import Input from "./Input";
import { useDispatch, useSelector} from "react-redux";
import { loginWithEmail,loginWithGoogle } from "../Redux/slices/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ toggleModal, status }) => {
  const dispatch = useDispatch();
  const { error,user } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setError] = useState("")
  
  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle())
    toggleModal()
  };

  const handleEmailLogin = () => {
    dispatch(loginWithEmail({ email, password }));  
    setError(error);
    toggleModal()
  };


  return (
    <div>
      <Modal
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
          },
        }}
        onClick={toggleModal}
        className="bg-black rounded-none"
        position={"center"}
        show={status}
        size="md"
        popup={true}
      >
        <div onClick={(event) => event.stopPropagation()} className="p-6 pl-2 pr-2 bg-white">
          <img onClick={() => { toggleModal(); setEmail(""); setPassword(""); setError("") }} className="w-6 absolute z-10 top-4 right-4 cursor-pointer" src={close} alt="close" />
        </div>
        <ModalBody className="bg-white h-96 p-0 rounded-none" onClick={(event) => event.stopPropagation()}>
          <div className="p-6 pt-0">
            <div className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-5 relative h-8 cursor-pointer active:bg-teal-100" onClick={handleGoogleLogin}>
              <img className="w-7 absolute left-2" src={google} alt="google" />
              <p className="text-sm text-gray-500">Continue with Google</p>
            </div>
            <div className="pt-5 flex flex-col items-center justify-center">
              <p className="font-semibold text-sm">OR</p>
              <p className="font-bold text-sm pt-3 underline underline-offset-4">Login with Email</p>
              <Input placeholder="Enter your email" value={email} setInput={setEmail}  type="text"/>
              <Input placeholder="Enter your password" value={password} setInput={setPassword} type="password" />
              {errors && <p className="mt-2 text-sm text-red-600 text-center">{"Login failed. Please check your credentials."}</p>}
              <button onClick={handleEmailLogin} className="w-full mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Submit
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Dont have an account?
                  <Link onClick={toggleModal} to="/signUp" className="text-blue-600 underline hover:text-blue-800">
                    Click here
                  </Link>
                </p>
              </div>
            </div>
            <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
              <p className="text-xs">All your personal details are safe with us.</p>
              <p className="text-xs pt-5 text-center">
                If you continue, you are accepting <span className="text-blue-600">OLX Terms and Conditions and Privacy Policy</span>
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
