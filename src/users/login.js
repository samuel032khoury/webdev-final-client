import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "./users-thunk";
import {Navigate, useNavigate} from "react-router";

const Login = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginBtn = () => {
        dispatch(loginThunk({username, password}))
    }
    if (currentUser) {
        return navigate('/profile')
    }
    return(
        <>
            <h1>Login</h1>
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Username"
                value={username}/>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control" placeholder="Password" type="password" value={password}/>
            <button
                className="btn btn-primary w-100"
                onClick={handleLoginBtn}>Login</button>
        </>
    )
}
export default Login