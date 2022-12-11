import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../users-thunk";
import {useNavigate} from "react-router";

const BasicInfo = ({user}) => {
    return (
        <>
            <div className="mt-2">
                <h4>Username: {user.username}</h4>
                <h4>First Name: {user.firstName}</h4>
                <h4>Last Name: {user.lastName}</h4>
                <h4>Email: {user.email}</h4>

            </div>
        </>
    )
}

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    return(
        <>
            <h1>Profile</h1>
            {
                currentUser &&
                <h2>Welcome, {currentUser.role} {currentUser.username}!</h2>
            }
            <BasicInfo user={currentUser} />
            <button
                className="btn btn-danger"
                onClick={handleLogoutBtn}>
                Logout
            </button>
        </>
    )
}
export default Profile