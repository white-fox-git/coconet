import { React, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/login";
import Main from "./pages/main"
import NotFound from "./pages/notFound";
import FindUser from "./pages/findUser";
 

const App = () => {
  return (
    <Routes>
      <Route path ="/" element = {<Login />} />
      <Route path ="/main" element = {<Main/>} />
      <Route path ="/findUser" element = {<FindUser />} />
      <Route path ="*" element = {<NotFound/>} />
    </Routes>
  )
}

export default App
