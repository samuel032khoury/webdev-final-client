import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findSongBySearchTermThunk} from "./spotify-thunks";
import {Link, useNavigate} from 'react-router-dom';
import { createSongsThunk } from "../songs/songs-thunks";

const SpotifySearchSongs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {token, songs, loading} = useSelector((state) => state.spotify);
  const {currentUser} = useSelector((state) => state.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listSongs = (song) => {
    
    const currentSong = {
      id: song.id,
      name: song.name,
      image: song.album.images[1].url,
      duration_ms: song.duration_ms,
      artist: song.artists[0].name,
      album: song.album.name,
      popularity: song.popularity,
    }
    const handleSongInfo = () => { 
      dispatch(createSongsThunk(currentSong))
    }

    return(
      <li key={song.id} className="list-group-item">
        <img alt='album art' src={song.album.images[1].url} height={100}/>
        <p className={'mt-2'}><span style={{"font-size": 21}}><b>{song.name}</b></span> by {song.artists.map(artistObject => artistObject.name).join(',')}</p>
        <Link to={`/song/${song.id}`} state={{song: currentSong}}>
          Show detail
        </Link>
      </li>
    )
  };

  return (
    <>
      <h1>Search for songs</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <form onSubmit={(e) => e.preventDefault()}>
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
        {
          songs && songs.map(listSongs)
        }
      </ul>
    </>
  );
};

export default SpotifySearchSongs;