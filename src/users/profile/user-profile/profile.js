import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../users-thunk";
import {useNavigate} from "react-router";
import { useEffect } from "react";
import { findSongsFavoritedByUserThunk } from "../../../favorites/favorites-thunks";

const BasicInfo = ({user}) => {
    const {userFavorites} = useSelector((state) => state.favorites);
    console.log(userFavorites);
    return (
        <>
            <div className="mt-2">
                <h4>Username: {user.username}</h4>
                <h4>First Name: {user.firstName}</h4>
                <h4>Last Name: {user.lastName}</h4>
                <h4>Email: {user.email}</h4>
                <h4>Favorite Songs: {user.email}</h4>
                {
                    
                }
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
    useEffect(() => {
        dispatch(findSongsFavoritedByUserThunk(currentUser._id));
    }, [])
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