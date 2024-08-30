// import { configureStore } from '@reduxjs/toolkit'

// export default configureStore({
//   reducer: {
//     cartCount: counterReducer,
//   },
// })

// export type RootState = ReturnType<typeof store.getState>


import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    cartCount: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
