import { configureStore } from "@reduxjs/toolkit";
import initreducer from "./Userid";
const store = configureStore({
    reducer:{
        user:initreducer,
    }
})
export default store;