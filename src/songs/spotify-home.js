import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotifyAccessTokenThunk } from "../spotify/spotify-thunks";
import { Link } from "react-router-dom";
import { findReviewsThunk } from "../reviews/reviews-thunks";
import { findAllSongsThunk } from "./songs-thunks";

const Review = ({ review }) => {
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(findAllSongsThunk());
  }, []);

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
                <p>Artist: {song.artist}</p>
                <p>Alblum: {song.album}</p>
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

const SpotifyHome = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { token, recommendations, loading } = useSelector(
    (state) => state.spotify
  );

  const { reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotifyAccessTokenThunk());
    dispatch(findReviewsThunk());
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
    </>
  );
};

export default SpotifyHome;
