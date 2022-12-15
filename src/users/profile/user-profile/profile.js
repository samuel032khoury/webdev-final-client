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
              <div className="d-flex flex-row">
            <img alt='album art' src={matchingSong.image} height={100} className={"me-3 mb-2 mt-2"}/>
                  <div>
            <p><span style={{"font-size": 24}}><b>{matchingSong.name}</b></span> by {matchingSong.artist}</p>
                  <Link to={`/song/${matchingSong.id}`} state={{song: matchingSong}}>
                      Details
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
    return (
        <>
            <div className="mt-2">
                <h5>Username: <span className="ms-2">{user.username}</span></h5>
                <h5>First Name: <span className="ms-2">{user.firstName ? user.firstName : <span className="text-muted">none</span>}</span></h5>
                <h5>Last Name: <span className="ms-2">{user.lastName ? user.lastName : <span className="text-muted">none</span>}</span></h5>
                <h5>Email: <span className="ms-2">{user.email ? user.email : <span className="text-muted">none</span>}</span></h5>
            </div>

        </>
    )
}

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    const {userFavorites} = useSelector((state) => state.favorites);
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
            <div className="container mt-2">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-5">
                            <h1 className="mb-4">Profile</h1>
                        {
                            currentUser &&
                            <h3>Welcome, <b>{currentUser.username}!</b></h3>
                        }
                        <button
                            className="btn btn-primary mt-2 me-2"
                            onClick={handleEditBtn}>
                            Edit
                        </button>
                        <button
                            className="btn btn-danger mt-2"
                            onClick={handleLogoutBtn}>
                            Logout
                        </button>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <h4>Information</h4>
                        </div>
                        <BasicInfo user={currentUser} />
                    </div>
                    <div className="row mt-3">
                        <h4>Favorite Songs:</h4>
                        <ul className="list-group">
                            {
                                userFavorites.map(favorite => <Song key={favorite.song} sid={favorite.song} />)
                            }
                        </ul>
                    </div>



                </div>
            </div>
        </>
    )
}
export default Profile