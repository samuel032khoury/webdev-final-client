import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";
import {current} from "@reduxjs/toolkit";
import {Navigate} from "react-router";

const Register = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validatePassword, setValidatePassword] = useState("")
    const [admin, setAdmin] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const handleRegisterBtn = () => {
        if (!username || !password || !validatePassword) {
            setError('All fields should be filled out')
            return
        }
        if (username.length < 2 || username.length > 20) {
            setError('Username should be between 2 and 20 characters')
            return
        }
        if (password.length < 2 || password.length > 20) {
            setError('Password should be between 2 and 20 characters')
            return
        }
        if (password !== validatePassword) {
            setError('Passwords must match')
            return
        }
        setError(null)
        admin ? dispatch(registerThunk({username, password, role: 'ADMIN'})) : dispatch(registerThunk({username, password, role: 'USER'}))
    }

    if(currentUser) {
        return (<Navigate to={'/profile'}/>)
    }

    return(
        <>
            <h1>Register</h1>
            {
                error &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Username"
                value={username}/>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}/>
            <input
                onChange={(e) => setValidatePassword(e.target.value)}
                className="form-control"
                placeholder="Validate your password"
                type="password"
                value={validatePassword}/>
            <input
                onChange={(e) => setAdmin(e.target.checked)}
                className="form-check-input"
                type="checkbox"
                checked={admin}
                id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Admin role
            </label>
            <button
                className="btn btn-primary w-100"
                onClick={handleRegisterBtn}>
                Register
            </button>
        </>
    )
}
export default Register