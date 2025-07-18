import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Redux/slices/productSlice";
import { fileUpload, loading, close } from "../assets";
const Sell = ({ toggleModalSell, status }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting,errors },
  } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    if (!user) {
      alert("Please login to continue");
      return;
    }

    const payload = {
      title: data.title,
      category: data.category,
      price: data.price,
      description: data.description,
      image,
      user,
    };

    try {
      await dispatch(addProduct(payload)).unwrap();
      setImage(null);
      reset();
      toggleModalSell();
    } catch (error) {
      alert(error);
    }
  };

  const handleImageUpload = (event) => {
    if (event.target.files) setImage(event.target.files[0]);
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
        onClick={toggleModalSell}
        show={status}
        className="bg-black"
        position={"center"}
        size="md"
        popup={true}
      >
        <ModalBody className="bg-white h-96 p-0 rounded-md" onClick={(event) => event.stopPropagation()}>
          <img
            onClick={() => {
              toggleModalSell();
              setImage(null);
              reset();
            }}
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
            src={close}
            alt=""
          />

          <div className="p-6 pl-8 pr-8 pb-8">
            <p className="font-bold text-lg mb-3">Sell Item</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("title", {
                  required: "Title is required",
                })}
                placeholder="Title"
                className="w-full p-2 border mb-2"
              />
              {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
              <input
                {...register("category", {
                  required: "catagory is required",
                })}
                placeholder="Category"
                className="w-full p-2 border mb-2"
              />
              {errors.category && <p style={{ color: "red" }}>{errors.category.message}</p>}
              <input
                {...register("price", {
                  required: "price is required",
                })}
                placeholder="Price"
                className="w-full p-2 border mb-2"
              />
              {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
              <input
                {...register("description", {
                  required: "price is required",
                })}
                placeholder="Description"
                className="w-full p-2 border mb-2"
              />
              {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
              <div className="pt-2 w-full relative">
                {image ? (
                  <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img className="object-contain" src={URL.createObjectURL(image)} alt="" />
                  </div>
                ) : (
                  <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                    <input onChange={handleImageUpload} type="file" className="absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30" required />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="" />
                      <p className="text-center text-sm pt-2">Click to upload images</p>
                      <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                    </div>
                  </div>
                )}
              </div>

              {isSubmitting ? (
                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                  <img className="w-32 object-cover" src={loading} alt="" />
                </div>
              ) : (
                <div className="w-full pt-2">
                  <button className="w-full p-3 rounded-lg text-white" style={{ backgroundColor: "#002f34" }}>
                    Sell Item
                  </button>
                </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sell;
