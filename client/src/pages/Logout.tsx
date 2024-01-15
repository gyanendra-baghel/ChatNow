import { useEffect } from "react"

function Logout() {
    useEffect(()=>{
      location.href="/"
    },[])
  return (
    <div>Logout</div>
  )
}

export default Logout