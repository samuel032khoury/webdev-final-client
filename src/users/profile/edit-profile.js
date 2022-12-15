import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { updateThunk } from "../users-thunk";

const Field = ({ onChange, placeholder, value }) => {
    return (
        <>
            <input
                onChange={onChange}
                className="form-control mb-1"
                placeholder={placeholder}
                value={value}
            />
        </>
    )

}

const EditProfile = () => {
    const { currentUser } = useSelector((state) => state.users);
    const [username, setUsername] = useState(currentUser.username);
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSaveBtn = () => {
        if (!username) {
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
        setError(null);
        const updatedUser = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: currentUser.role
        }
        dispatch(updateThunk(updatedUser))
        navigate("/profile", {state: {currentUser: updatedUser}})
    }
    const handleCancelBtn = () => {
        navigate("/profile", {state: {currentUser: currentUser}});
    }

    return (
        <>
            <h1>Edit Profile</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Field onChange={(e) => setUsername(e.target.value)}
                   placeholder="Username (required)" value={username} />
            <Field onChange={(e) => setFirstName(e.target.value)}
                   placeholder="First name" value={firstName} />
            <Field onChange={(e) => setLastName(e.target.value)}
                   placeholder="Last name" value={lastName} />
            <Field onChange={(e) => setEmail(e.target.value)}
                   placeholder="Email" value={email} />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-1"
                placeholder="Password (required)"
                type="password"
                value={password}
            />
            <div className="row">
                <div className="col">
                    <button className="btn btn-success w-50 float-end" onClick={handleSaveBtn}>
                        Save
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-secondary w-50 float-start" onClick={handleCancelBtn}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
};


export default EditProfile;