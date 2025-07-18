import { useDispatch, useSelector } from "react-redux";
import { signUpWithEmail } from "../Redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const resultAction = await dispatch(signUpWithEmail(data));
    if (signUpWithEmail.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="mx-auto mt-11 p-6 border border-gray-300 rounded-md shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

        <button type="submit" disabled={loading} className={`w-full text-white py-2 rounded transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?
            <Link to="/" className="text-blue-600 underline hover:text-blue-800" onClick={() => toggleModal()}>
              Click here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
