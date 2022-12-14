import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../users-thunk";
import {useNavigate} from "react-router";
import { useEffect } from "react";
import { findSongsFavoritedByUserThunk } from "../../../favorites/favorites-thunks";
import { Link } from "react-router-dom";

const Song = ({ sid }) => {
    const { songs } = useSelector((state) => state.songs);
    const matchingSong = songs.filter(song => song.id === sid)[0];
    if (matchingSong) {
      return (
        <>
          <li key={matchingSong.id} className="list-group-item">
            <img alt='album art' src={matchingSong.image} height={100}/>
            <p>{matchingSong.name}</p>
            <p>{matchingSong.artist}</p>
            <Link to={`/song/${matchingSong.id}`} state={{song: matchingSong}}>
              Detail
            </Link>
        </li>
        </>
      )
    } else {
      return <></>
    }
  }

const BasicInfo = ({user}) => {
    const {userFavorites} = useSelector((state) => state.favorites);
    return (
        <>
            <div className="mt-2">
                <h4>Username: {user.username}</h4>
                <h4>First Name: {user.firstName}</h4>
                <h4>Last Name: {user.lastName}</h4>
                <h4>Email: {user.email}</h4>
                <h4>Favorite Songs:</h4>
                <ul className="list-group">
                    {
                        userFavorites.map(favorite => <Song sid={favorite.song} />)
                    }
                </ul>
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
    const handleEditBtn = () => {
        navigate('/profile/edit')
    }
    useEffect(() => {
        dispatch(findSongsFavoritedByUserThunk(currentUser._id));
    }, [])
    return(
        <>
            <h1>Profile</h1>
            <button
                className="btn btn-primary float-end"
                onClick={handleEditBtn}>
                Edit Profile
            </button>
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