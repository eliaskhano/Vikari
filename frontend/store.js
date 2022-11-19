import { configureStore } from "@reduxjs/toolkit"
// this is the new method of configuring store for redux
import { mainApi } from "./services/mainApi"

export default configureStore({
    reducer: {
       [mainApi.reducerPath] : mainApi.reducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware)
})