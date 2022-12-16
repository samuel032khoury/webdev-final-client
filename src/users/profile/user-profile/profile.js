import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, updateUserThunk} from "../../users-thunk";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {findSongsFavoritedByUserThunk} from "../../../favorites/favorites-thunks";
import {Link} from "react-router-dom";
import {findAllSongsThunk} from "../../../songs/songs-thunks";

const Song = ({sid}) => {
  const {songs} = useSelector((state) => state.songs);
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



const Profile = () => {
  const navigate = useNavigate()
  const {currentUser} = useSelector((state) => state.users)
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(currentUser.firstName)
  const [lastName, setLastName] = useState(currentUser.lastName)
  const [email, setEmail] = useState(currentUser.email)
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const dispatch = useDispatch()
  const handleLogoutBtn = () => {
    dispatch(logoutThunk())
    navigate('/login')
  }

  const handleEditSubmitBtn = () => {
    if (newPass!== '' || confirmPass !== '') {
      if (oldPass !== currentUser.password) {
        alert("Old password is incorrect!")
        return
      }
      if (newPass !== confirmPass) {
        alert("New passwords don't match!")
        return
      }
    }
    dispatch(updateUserThunk({
      ...currentUser,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": newPass === '' ? currentUser.password : confirmPass
    }))
    setEditing(false)
  }

  useEffect(() => {
    dispatch(findSongsFavoritedByUserThunk(currentUser._id));
    dispatch(findAllSongsThunk());
  }, [])
  const {userFavorites} = useSelector((state) => state.favorites);
  console.log(currentUser);
  return (
    <>
      {
        currentUser &&
        <>
          <h1 className={"mt-3"}>Welcome, {currentUser.role.toLowerCase()} {currentUser.username}!</h1>
          <div className="mt-2">
            <h4>Username: {currentUser.username}</h4>
            {editing ? <h4><label htmlFor={"firstNameInput"}>First Name: </label>
              <input
                className={'ms-2'}
                id={'firstNameInput'}
                type={'text'}
                placeholder={'Enter your first name'}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              /></h4> : <h4>First Name: {currentUser.firstName}</h4>}
            {editing ? <h4><label htmlFor={"lastNameInput"}>Last Name: </label>
              <input
                className={'ms-2'}
                id={'lastNameInput'}
                type={'text'}
                placeholder={'Enter your last name'}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              /></h4> : <h4>Last Name: {currentUser.lastName}</h4>}
            {editing ? <h4><label htmlFor={"emailInput"}>Email: </label>
              <input
                className={'ms-2'}
                id={'emailInput'}
                type={'email'}
                placeholder={'Enter your email'}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              /></h4> : <h4>Email: {currentUser.email}</h4>}
            {editing ? <h4><label htmlFor={"oldpassInput"}>Old Password: </label>
              <input
                className={'ms-2'}
                id={'oldpassInput'}
                type={'password'}
                placeholder={'Enter the old password'}
                onChange={(e) => setOldPass(e.target.value)}
                value={oldPass}
              /></h4> :<></>}
            {editing ? <h4><label htmlFor={"newpassInput"}>New Password: </label>
              <input
                className={'ms-2'}
                id={'newpassInput'}
                type={'password'}
                placeholder={'Enter the new password'}
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
              /></h4> :<></>}
            {editing ? <h4><label htmlFor={"confirmPassInput"}>Confirm Password: </label>
              <input
                className={'ms-2'}
                id={'confirmPassInput'}
                type={'password'}
                placeholder={'Confirm the new password'}
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
              /></h4> :<></>}

            <ul className="list-group">
              <li className={'list-group-item'}><h4>Favorite Songs</h4></li>
              {
                userFavorites.map(favorite => <Song key={favorite.song} sid={favorite.song}/>)
              }
            </ul>
          </div>
        </>
      }

      {!editing && <button
        className="btn btn-primary mt-3 me-1"
        onClick={() => setEditing(true)}>
        Edit Profile
      </button>}
      {editing && <button
        className="btn btn-primary mt-3 me-1"
        onClick={handleEditSubmitBtn}>
        Done
      </button>
      }
      <button
        className="btn btn-danger mt-3 ms-1"
        onClick={handleLogoutBtn}>
        Logout
      </button>
    </>
  )
}
export default Profile