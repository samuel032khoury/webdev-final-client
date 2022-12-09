import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findAlbumByIdThunk} from "./omdb-thunks";
// import {createReviewThunk, findReviewsByMovieThunk} from "../reviews/reviews-thunks";

import {useLocation} from "react-router";


const OmdbDetails = () => {

    const {pathname} = useLocation()
    const parts = pathname.split('/')
    const songID = parts[parts.length - 1]

    const {token, song, loading} = useSelector((state) => state.omdb)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAlbumByIdThunk({token, songID}))
        
    },[])
    
    
    return(
        <>
          { song && 
          <> 
          <h1>{song.name}</h1>
          <img alt='song' src={song.album.images[1].url} height={400}/>
          <h4>Artist name: {song.artists[0].name} </h4>
          <h4>Album name: {song.album.name}</h4>
          </>}
        </>
    )
}
export default OmdbDetails