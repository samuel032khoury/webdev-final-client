import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {findSongBySearchTermThunk} from "./spotify-thunks";
import {useNavigate} from 'react-router-dom';

const SpotifySearchDefault = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {token, loading} = useSelector((state) => state.spotify);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <h1 className={'mt-3'}>Search for songs</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <form>
            <button
              className="btn btn-primary float-end"
              onClick={() => {
                dispatch(findSongBySearchTermThunk({token, searchTerm}))
                navigate('/search/songs');
              }}>Search
            </button>
            <input
              className="form-control w-75"
              placeholder='Search for a song...'
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              value={searchTerm}/>
          </form>
        </li>
      </ul>
    </>
  );
};

export default SpotifySearchDefault;