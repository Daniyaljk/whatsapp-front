import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomePage from "./pages/home-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/register-page.tsx";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./app/features/userSlice.ts";
import {RootState} from "./types/redux-types.ts";



function App() {

    const dispatch = useDispatch();
    const {user} = useSelector((state:RootState)=> state)

    const logoutTest = ()=>{
        dispatch(logout())
    }

    const testSelector = ()=>{
        console.log(user)
    }

  return (
      <>
          <button onClick={logoutTest}>
              logoutTest
          </button>

          <button onClick={testSelector}>
              test selector
          </button>
         <Router>
             <Routes>
                 <Route path={"/"} element={<HomePage/>} />
                 <Route path={"/login"} element={<LoginPage/>} />
                 <Route path={"/register"} element={<RegisterPage/>} />
             </Routes>
         </Router>
      </>
  )
}

export default App
