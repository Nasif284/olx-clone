// src/features/product/productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { fireStore } from "../../Firebase";
import { updateDoc, doc } from "firebase/firestore";

export const markProductsAsSold = createAsyncThunk("products/markProductsAsSold", async (productIds, thunkAPI) => {
  try {
    const updates = productIds.map(async (id) => {
      const ref = doc(fireStore, "products", id);
      await updateDoc(ref, { status: "sold" });
      return id;
    });
    await Promise.all(updates);
    return productIds;
  } catch (error) {
    console.error("Error marking products as sold:", error);
    return thunkAPI.rejectWithValue("Failed to update products");
  }
});

export const addProduct = createAsyncThunk("products/addProduct", async ({ title, category, price, description, image, user }, thunkAPI) => {
  try {
    const readImageAsDataUrl = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const imageUrl = reader.result;
          resolve(imageUrl);
        };
        reader.onerror = reject;
      });
    };
    let imageUrl = "";
    if (image) {
      imageUrl = await readImageAsDataUrl(image);
    }

    if (!title || !category || !price || !description) {
      return thunkAPI.rejectWithValue("All fields are required");
    }
    let newProduct = {
      title: title.trim(),
      category: category.trim(),
      price: price.trim(),
      description: description.trim(),
      imageUrl,
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      createAt: new Date().toDateString(),
      status: "available",
    };

    await addDoc(collection(fireStore, "products"), newProduct);
    return newProduct;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to add product");
  }
});

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const productsCollection = collection(fireStore, "products");
    const productSnapshot = await getDocs(productsCollection);
    const productsList = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productsList;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markProductsAsSold.fulfilled, (state, action) => {
        const updatedIds = action.payload;
        state.items = state.items.map((product) => (updatedIds.includes(product.id) ? { ...product, status: "sold" } : product));
       
      });
  },
});

export const { setItems } = productSlice.actions;
export default productSlice.reducer;
