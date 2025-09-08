import { useState } from "react";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
  Link,
} from "react-router";
import RootMainLayou from "./components/RootLayout/RootMainLayou";
import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import SignUp from "./Pages/Cart/SignUp/SignUp";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootMainLayou />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/singup" element={<SignUp />} />
        {/*<Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} /> */}
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
