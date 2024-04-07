import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/redux-types.ts";
import {SyncLoader} from "react-spinners"
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../app/features/userSlice.ts";
import Upload from "../uploader/Upload.tsx";

export default function RegistrationForm(){
    const {status,error} = useSelector((state:RootState)=> state.user);
    const dispatch = useDispatch();



    const navigate = useNavigate()

    useEffect(() => {
        if (status === "succeeded") navigate("/")
    }, [status]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [userPic, setUserPic] = useState("")


    const submitRegisterForm = ()=>{
        dispatch(registerUser({name,email,password,picture:userPic}))
    }



    return(
        <>
            <h1>register form</h1>

            <div>
                <label htmlFor={"name"}>name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br/>

                <label htmlFor={"email"}>email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id={"email"}
                />

                <br/>

                <label htmlFor={"password"}>password:</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id={"password"}
                />
                <br/>

                <Upload setUserPic={setUserPic}/>
                <br/>

                <button onClick={submitRegisterForm}>register</button>
                <br/>

                <Link to={"/login"}>login page</Link>
            </div>

            {error && <p className={"text-red-800 text-xl"}>{error}</p>}

            <SyncLoader size={10} loading={status === "loading"}/>
        </>
    )
}
