import { legacy_createStore } from "redux";
import productReducer from "../reducer/productReducer";


const store = legacy_createStore(productReducer)

export default store