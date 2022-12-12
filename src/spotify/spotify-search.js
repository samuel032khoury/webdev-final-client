import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findAlbumBySearchTermThunk, findSongBySearchTermThunk} from "./spotify-thunks";
import {Link} from 'react-router-dom';


const SpotifySearch = ({searchCategory}) => {
  const [searchTerm, setSearchTerm] = useState('All I Want For Christmas Is You');
  const [searchDomain, setSearchDomain] = useState('song');
  const {token, songs, loading} = useSelector((state) => state.spotify);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findSongBySearchTermThunk({token, searchTerm}))
  }, []);
  const listSongs = (result) => {
    console.log(result);
    return(
      <li key={result.id} className="list-group-item">
                            <i onClick={() => {
                                console.log('TODO: user favorites this song')
                            }} className="float-end bi bi-star"></i>
                            <img alt='album art' src={result.album?.images[1].url || result.images[1].url} height={100}/>
                            <p>{result.name}</p>
                          <p>{result.artists.map(artistObject => artistObject.name).join(',')}</p>
                          <Link to={`/${searchDomain}/${result.id}`} state={{song: result}}>
                            Detail
                          </Link>
                        </li>
    )
  }
  const listAlbums = (result) => {
    // console.log(result);
    return(
      <li key={result.id} className="list-group-item">
                            <i onClick={() => {
                                console.log('TODO: user favorites this album')
                            }} className="float-end bi bi-star"></i>
                          
                            <img alt='album art' src={result.album?.images[1].url || result.images[1].url} height={100}/>
                            <p>{result.name}</p>
                          <p>{result.artists.map(artistObject => artistObject.name).join(',')}</p>
                          <Link to={`/${searchDomain}/${result.id}`} state={{song: result}}>
                            Detail
                          </Link>
                        </li>
    )
  }
  return (
    <>


      <h1>Search for {searchDomain}</h1>

      <ul className="list-group">
        <li className="list-group-item">
          <form id={"searchForm"} onSubmit={e => e.preventDefault()}>
            Search By
            <select id={"searchRule"} defaultValue={searchDomain} onChange={(e) => {
              document.getElementById("searchBtn").click()
              setSearchDomain(e.target.value);
            }}>
              <option key={0} value={"song"} selected>Songs</option>
              <option key={1} value={"album"}>Albums</option>
            </select>
            <button id={'searchBtn'} type={'submit'}
                    className="btn btn-primary float-end"
                    onClick={() => {
                      searchDomain === "song" ?
                        dispatch(findSongBySearchTermThunk({token, searchTerm})) :
                        dispatch(findAlbumBySearchTermThunk({token, searchTerm}))
                    }}>Search
            </button>
            <input
              className="form-control w-75"
              placeholder={`Search for ${searchDomain}...`}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              value={searchTerm}/>
          </form>
        </li>

        {
                    songs && songs.map(searchDomain === 'song' ? listSongs : listAlbums)
                }
            </ul>
            {/* <pre>
                {JSON.stringify(songs[0], null, 2)}
            </pre> */}
        </>
    )
};

export default SpotifySearch;