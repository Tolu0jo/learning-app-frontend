"use client";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "../redux/store";
import "react-toastify/dist/ReactToastify.css";

export default function ClientComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <ToastContainer autoClose={3000} />
        {children}
      </Provider>
    </>
  );
}
