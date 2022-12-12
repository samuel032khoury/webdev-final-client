import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { findSongsForHomePageThunk, getSpotifyAccessTokenThunk } from "./spotify-thunks";
import { Link } from 'react-router-dom';


const SpotifyHome = () => {
    
    const {token, recommendations, loading} = useSelector((state) => state.spotify);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotifyAccessTokenThunk());
        dispatch(findSongsForHomePageThunk({ token }))
    }, []);

    return (
        <>
        <h1>Songs</h1>
        <ul className="list-group">
        {
                    recommendations && recommendations.map((song) =>
                        <li key={song.id} className="list-group-item">
                            <i onClick={() => {
                                console.log('TODO: user favorites this song')
                            }} className="float-end bi bi-star"></i>
                            <img alt='album art' src={song.album.images[1].url} height={100}/>
                            <p>{song.name}</p>
                            <p>{song.artists.map(artistObject => artistObject.name).join(',')}</p>
                            <Link to={`/song/${song.id}`} state={{ song: song }}>
                                Detail
                            </Link>
                
                                
                                
                            
                        </li>
                    )
                }
                 </ul>
        </>
    )
}

export default SpotifyHome