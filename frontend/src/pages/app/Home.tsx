import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";



export default function Home() {

    const navigate = useNavigate();

    return <div className="min-h-screen flex flex-col items-center gap-4 justify-center">

        <h1 className="text-4xl  font-semibold">Note Taking App</h1>

        <div className="flex gap-2 h-10">


            <Button variant="contained" onClick={() => {
                navigate("/signup")
            }}>Sign up</Button>


            <Button variant="contained" onClick={() => {
                navigate("/signin")
            }}>Sign In</Button>
        </div>
    </div>
}