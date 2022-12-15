import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../users-thunk";
import {useNavigate} from "react-router";
import { useEffect } from "react";
import { findSongsFavoritedByUserThunk } from "../../../favorites/favorites-thunks";
import { Link } from "react-router-dom";
import { findAllSongsThunk } from "../../../songs/songs-thunks";

const Song = ({ sid }) => {
    const { songs } = useSelector((state) => state.songs);
    const matchingSong = songs.filter(song => song.id === sid)[0];
    if (matchingSong) {
      return (
        <>
          <li key={matchingSong.id} className="list-group-item">
            <div className="d-flex flex-row ">
              <img alt="album art" src={matchingSong.image} height={100} className={"me-3 mb-2"}/>
              <div>
                <p><span style={{"font-size": 24}}><b>{matchingSong.name}</b></span> by {matchingSong.artist}</p>
                <Link to={`/details/${matchingSong.id}`} state={{song: matchingSong}}>
                  Show detail
                </Link>
              </div>
            </div>
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

                <ul className="list-group">
                  <li className={'list-group-item'}><h4>Favorite Songs</h4></li>
                    {
                        userFavorites.map(favorite => <Song key={favorite.song} sid={favorite.song} />)
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
        dispatch(findAllSongsThunk());
    }, [])
    return(
        <>
            {
                currentUser &&
              <h1 className={"mt-3"}>Welcome, {currentUser.role.toString().toLowerCase()} {currentUser.username}!</h1>
            }
            <BasicInfo user={currentUser} />
            <button
                className="btn btn-primary mt-3 me-3"
                onClick={handleEditBtn}>
                Edit
            </button>
            <button
                className="btn btn-danger mt-3"
                onClick={handleLogoutBtn}>
                Logout
            </button>
        </>
    )
}
export default Profile