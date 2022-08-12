import React from 'react'
import { Provider } from "react-redux";
import store from './utils/redux'
import ReactDOM from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'
// import userStore from "./utils/reducer_index"

// let persistor = persistStore(userStore);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      {/* <PersistGate loading = {null} persistor = {persistor}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
)
