import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateThunk } from "../users-thunk";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const { currentUser } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validatePassword, setValidatePassword] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const handleSaveBtn = () => {
        if (!username || !password || !validatePassword) {
            setError("Required fields should be filled out");
            return;
        }
        if (username.length < 2 || username.length > 20) {
            setError("Username should be between 2 and 20 characters");
            return;
        }
        if (password.length < 2 || password.length > 20) {
            setError("Password should be between 2 and 20 characters");
            return;
        }
        if (password !== validatePassword) {
            setError("Passwords must match");
            return;
        }
        setError(null);
        const updatedUser = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: currentUser.role
        };
        dispatch(updateThunk(updatedUser))
        navigate("/profile")
    };

    const handleCancelBtn = () => {
        navigate("/profile")
    };

    return (
        <>
            <h1>Edit Profile</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control mb-1"
                placeholder="Username (required)"
                value={username}
            />
            <div className="row">
                <div className="col ">
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control mb-1"
                        placeholder="First name"
                        value={firstName}
                    />
                </div>
                <div className="col">
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control mb-1"
                        placeholder="Last name"
                        value={lastName}
                    />
                </div>
            </div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-1"
                placeholder="Email"
                value={email}
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-1"
                placeholder="Password (required)"
                type="password"
                value={password}
            />
            <input
                onChange={(e) => setValidatePassword(e.target.value)}
                className="form-control mb-2"
                placeholder="Validate your password (required)"
                type="password"
                value={validatePassword}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Admin role
            </label>
            <button className="btn btn-primary w-100" onClick={handleRegisterBtn}>
                Register
            </button>
        </>
    );
};
export default EditProfile;