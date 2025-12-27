"use client";
import React from "react";
import store from "../../store/store"
import { Provider } from "react-redux";

const StoreProvider = (props: any) => {
    return (
      <Provider store={store}>
        {props.children}
      </Provider>
    );

}
export default StoreProvider;

