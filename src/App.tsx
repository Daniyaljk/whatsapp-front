import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/home-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/register-page.tsx";
import {useSelector} from "react-redux";
// import {logout} from "./app/features/userSlice.ts";
import {RootState} from "./types/redux-types.ts";



function App() {

    // const dispatch = useDispatch();
    const {user} = useSelector((state:RootState)=> state.user)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {access_token} = user

    console.log(access_token)

    // const logoutTest = ()=>{
    //     dispatch(logout())
    // }


  return (
      <>
          {/*<button onClick={logoutTest}>*/}
          {/*    logoutTest*/}
          {/*</button>*/}

          {/*<button onClick={testSelector}>*/}
          {/*    test selector*/}
          {/*</button>*/}


         <Router>
             <Routes>
                 <Route path={"/"} element={access_token ? <HomePage/> : <Navigate to={"/login"} />} />
                 <Route path={"/login"} element={!access_token ? <LoginPage/> : <Navigate to={"/"} /> } />
                 <Route path={"/register"} element={!access_token ? <RegisterPage/> : <Navigate to={"/"} />} />
             </Routes>
         </Router>
      </>
  )
}

export default App
