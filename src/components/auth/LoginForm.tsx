import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/redux-types.ts";
import {SyncLoader} from "react-spinners";
import {loginUser} from "../../app/features/userSlice.ts";


export default function LoginForm(){
    const {status,error} = useSelector((state:RootState)=> state.user);
    const dispatch = useDispatch();



    const navigate = useNavigate()

    useEffect(() => {
        if (status === "succeeded") navigate("/")
    }, [status]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")


    const submitLogin = ()=>{
        dispatch(loginUser({email,password}))
    }


    return(
        <>
            <p>login form</p>

            <div>
                <label htmlFor={"email"}>email</label>
                <input
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id={"email"}
                />

                <br/>

                <label htmlFor={"password"}>password</label>
                <input
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id={"password"}
                />

                <br/>
                {error && <p>{error}</p>}
                <br/>

                <SyncLoader size={10} loading={status === "loading"}/>

                <button onClick={submitLogin}>
                    login
                </button>

                <br/>

                <Link to={"/register"}>
                    register page
                </Link>
            </div>
        </>
    )
}
