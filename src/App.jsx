import { React, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/login";
import Main from "./pages/main"
import NotFound from "./pages/notFound";
import FindUser from "./pages/findUser";
import Chat from "./pages/chat";
import Info from "./pages/info";

const App = () => {
  return (
    <Routes>
      <Route path ="/" element = {<Login />} />
      <Route path ="/main" element = {<Main/>} />
      <Route path ="/findUser" element = {<FindUser />} />
      <Route path ="/chat" element = {<Chat />} />
      <Route path ="/chat/:id" element = {<Chat />} />
      <Route path ="/info" element = {<Info />} />
      <Route path ="*" element = {<NotFound/>} />
    </Routes>
  )
}

export default App
