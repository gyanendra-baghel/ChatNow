import { useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import {UserContext} from "../context/UserContext";

function Home() {
    const {setUsername}=useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        const form = document.getElementById("join-form") as HTMLFormElement
        const userInput = document.getElementById("username") as HTMLFormElement
    
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = userInput.value;
            if(username){
                setUsername(username);
                navigate(`/chat`);
            }
        })
    })

    return (
        <>
            <Header isLogin={false}/>
            <main className="bg-neutral-800 h-screen flex flex-col justify-center items-center">
                <div className="bg-neutral-900 p-7 rounded-md">
                    <h2 className="text-center text-3xl font-bold mb-4">ChatNow</h2>
                    <form id="join-form" action="/chat">
                        <div className="flex flex-col">
                            <label className="mb-2" htmlFor="username">Username</label>
                            <input className="p-1 text-black" type="text" name="username" id="username" placeholder="Enter username..." required />
                        </div>
                        <button type="submit" className="w-full mt-5 bg-black p-2">Join Chat</button>
                    </form>
                </div>
            </main>
            <footer className="p-5 text-center bg-neutral-900">&copy; Copyright since 2023</footer>
        </>
    )
}

export default Home