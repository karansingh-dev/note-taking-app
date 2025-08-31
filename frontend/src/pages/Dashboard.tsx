import { useQuery } from "@tanstack/react-query"
import { useUser } from "../context/userContext"



export default function Dashboard() {



    const { user,logOut } = useUser();



    console.log(user);






    return <div>

        <button onClick={logOut}>logout</button>
        <br />
        
        {user?.email}</div>
}