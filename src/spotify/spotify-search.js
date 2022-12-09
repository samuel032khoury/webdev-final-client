import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { findSongBySearchTermThunk } from "./spotify-thunks";
import { Link } from "react-router-dom";

const SpotifySearch = ({ searchCategory }) => {
    const [searchTerm, setSearchTerm] = useState('All I Want For Christmas Is You');
    const {token, songs, loading} = useSelector((state) => state.spotify);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findSongBySearchTermThunk({ token, searchTerm }))
    }, []);

    return (
        <>
            <h1>Search for songs</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                            dispatch(findSongBySearchTermThunk({ token, searchTerm }))
                        }}>Search
                    </button>
                    <input
                        className="form-control w-75"
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                        value={searchTerm}/>
                </li>
                {
                    songs && songs.map((song) =>
                        <li key={song.id} className="list-group-item">
                            <i onClick={() => {
                                console.log('TODO: user favorites this song')
                            }} className="float-end bi bi-star"></i>
                            <img alt='album art' src={song.album.images[1].url} height={100}/>
                            <p>{song.name}</p>
                            <p>{song.artists.map(artistObject => artistObject.name).join(',')}</p>
                            <Link to={`/details/${song.id}`}>
                                Detail
                            </Link>
                        </li>
                    )
                }
            </ul>
            {/* <pre>
                {JSON.stringify(songs[0], null, 2)}
            </pre> */}
        </>
    )
};

export default SpotifySearch;