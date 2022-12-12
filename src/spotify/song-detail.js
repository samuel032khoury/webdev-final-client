import { useLocation } from 'react-router-dom'


const SongDetail = () => {
    const location = useLocation()
    const { song } = location.state

    console.log(song)
    
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