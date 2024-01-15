import React from "react"
import { Link } from "react-router-dom"

interface HeaderProps {
    isLogin:boolean
}

const Header: React.FC<HeaderProps>=({isLogin=false})=> {
  return (
    <header className="bg-zinc-900 text-center text-white fixed top-0 w-screen">
        <p className="font-sans font-bold text-xl">ChatNow</p>
        {isLogin && (
        <>
            <Link to='/chat'><button className="bg-green-800 w-full mt-2 rounded">Chat</button></Link>
            <Link to='/logout'><button className="bg-green-800 w-full mt-2 rounded">Logout</button></Link>
        </>
        )}
    </header>
  )
}

export default Header