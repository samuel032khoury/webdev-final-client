import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { findSongByIdThunk } from "./spotify-thunks";


import {useLocation} from "react-router";


const SongDetail = () => {

    const {pathname} = useLocation()
    const parts = pathname.split('/')
    const songID = parts[parts.length - 1]

    const {token, song, loading} = useSelector((state) => state.spotify)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findSongByIdThunk({token, songID}))
        
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
export default SongDetail