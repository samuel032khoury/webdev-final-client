import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotifyAccessTokenThunk } from "../spotify/spotify-thunks";
import { Link } from "react-router-dom";
import { findReviewsThunk } from "../reviews/reviews-thunks";
import { findAllSongsThunk } from "./songs-thunks";
import { findAllFavoritesThunk } from "../favorites/favorites-thunks";

const Review = ({ review }) => {
  const { songs } = useSelector((state) => state.songs);

  function findSong(r) {
    const result = songs.filter((song) => song.id === r.songID);
    return result[0];
  }
  const song = findSong(review);
  return (
    <>
      {song && (
        <>
          <li key={song.id} className="list-group-item">
            <div className="d-flex flex-row ">
              <img alt="album art" src={song.image} height={100} />
              <div>
                <p>Song: {song.name}</p>
                <p>Artist: {song.artist}</p>
                <Link to={`/song/${song.id}`} state={{ song: song }}>
                  Detail
                </Link>
              </div>
            </div>
            <h4>
              {review.username}: {review.review}
            </h4>
          </li>
        </>
      )}
    </>
  );
};

const Song = ({ sid }) => {
  const { songs } = useSelector((state) => state.songs);
  const matchingSong = songs.filter(song => song.id === sid)[0];
  if (matchingSong) {
    return (
      <>
        <li key={matchingSong.id} className="list-group-item">
          <img alt='album art' src={matchingSong.image} height={100}/>
          <p>{matchingSong.name}</p>
          <p>{matchingSong.artist}</p>
          <Link to={`/song/${matchingSong.id}`} state={{song: matchingSong}}>
            Detail
          </Link>
      </li>
      </>
    );
  } else {
    return <></>;
  }
}

const SpotifyHome = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { token, recommendations, loading } = useSelector(
    (state) => state.spotify
  );
  const { reviews } = useSelector((state) => state.reviews);
  const { favorites } = useSelector((state) => state.favorites);
  const myReviews = currentUser && reviews.filter(review => review.author === currentUser._id);
  const myFavorites = currentUser && favorites.filter(favorite => favorite.user === currentUser._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotifyAccessTokenThunk());
    dispatch(findReviewsThunk());
    dispatch(findAllSongsThunk());
    dispatch(findAllFavoritesThunk());
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      {currentUser && <h2>Welcome {currentUser.username} </h2>}
      <h1>Song Reviews</h1>
      <ul className="list-group">
        {reviews &&
          reviews.map((review) => <Review key={review._id} review={review} />)}
      </ul>
     {currentUser && <>
      <h1>Your Reviews</h1>
      <ul className="list-group">
        {myReviews &&
          myReviews.map((review) => <Review key={review._id} review={review} />)}
      </ul>
      {currentUser && <h2>Your Favorite Songs</h2>}
      <ul className="list-group">
        {myFavorites &&
          myFavorites.map(favorite => <Song sid={favorite.song} />)
        }
      </ul>
     </>}
    </>
  );
};

export default SpotifyHome;
