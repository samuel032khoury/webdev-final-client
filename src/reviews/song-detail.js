import {Link, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewThunk,
  deleteReviewThunk,
  updateReviewThunk,
  findReviewsBySongThunk,
} from "./reviews-thunks";
import {findAllFavoritesThunk, userFavoritesSongThunk, userUnfavoritesSongThunk} from "../favorites/favorites-thunks";
import {createSongsThunk} from "../songs/songs-thunks";

const RequestLogin = () => {
  return <h1><Link className={'text-decoration-none'} to={'/login'}>Login </Link> to see all the comments</h1>;
};

const Review = (review) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [edited, setEdited] = useState(false);
  const [currentReview, setCurrentReview] = useState(review.review);

  const handleReviewBtn = () => {
    const newReview = {
      _id: review.id,
      review: currentReview,
      createAt: new Date()
    };
    dispatch(
      updateReviewThunk({
        reviewID: review.id,
        newReview,
      })
      
    );
    setEdited(!edited);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-xl-11 col-lg-11 col-md-10 col-sm-8 col-xs-8">
            <div className="card">
              <div className="card-body" style={{ backgroundColor: "#edf0ed" }}>
                {currentUser.username === review.username ? (
                  <div className="float-end">
                    <i
                      onClick={() => {
                        setEdited(!edited);
                      }}
                      className="bi bi-pencil px-2"
                    ></i>
                    <i
                      onClick={() => {
                        dispatch(deleteReviewThunk({ reviewID: review.id }));
                      }}
                      className="bi bi-x-lg"
                    ></i>
                  </div>
                ) : (
                  <></>
                )}
                <Link to={`/profile/${review.userID}`}>
                  {review.username}
                </Link>
                {!edited && <p>{review.review}</p>}
                {edited && (
                  <form>
                    <div className="form-group">
                      <textarea
                        cols="80"
                        rows="3"
                        id="review"
                        className="form-control"
                        placeholder="Leave your review!"
                        value={currentReview}
                        onChange={(e) => setCurrentReview(e.target.value)}
                      ></textarea>

                      <button
                        type="button"
                        onClick={handleReviewBtn}
                        className="btn btn-info"
                      >
                        Update Review
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

const SongDetail = () => {
  const location = useLocation();
  const { song } = location.state;
  const { currentUser } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);
  const { favorites } = useSelector((state) => state.favorites);
  const [currentReview, setCurrentReview] = useState("");
  const dispatch = useDispatch();
  const [userFavoritedThisSong, setUserFavoritedThisSong] = useState(currentUser?._id && favorites.filter(s => s.song === song.id && s.user === currentUser._id).length > 0);

  const handleReviewBtn = () => {
    if (currentReview === "") {
      alert("Review can't be empty")
    } else {
      dispatch(
        createReviewThunk({
          review: currentReview,
          songID: song.id,
          username: currentUser.username,
          createAt: new Date()
        })
      );
      const currentSong = {
        id: song.id,
        name: song.name,
        image: song.image,
        duration_ms: song.duration_ms,
        artist: song.artist,
        album: song.album,
        popularity: song.popularity,
      }
      dispatch(createSongsThunk(currentSong))
      setCurrentReview("");
    }
  };

  const handleFavoriteSong = () => {
    dispatch(userFavoritesSongThunk({
      'uid': currentUser._id,
      'sid': song.id,
    }));
    setUserFavoritedThisSong(true);
  }

  const handleUnfavoriteSong = () => {
    dispatch(userUnfavoritesSongThunk({
      'uid': currentUser._id,
      'sid': song.id,
    }));
    setUserFavoritedThisSong(false);
  }

  useEffect(() => {
    dispatch(findReviewsBySongThunk(song.id));
    dispatch(findAllFavoritesThunk());
  }, []);

  const minitues = (song.duration_ms - (song.duration_ms % 60000)) / 60000
  const seconds = Math.ceil(song.duration_ms % 60000 / 1000)
  return (
    <>
      {song && (
        <>
          <div className={"row mt-3"}>
            <div className={'col-4'}>
              <img alt="song" src={song.image} height={400}/>
            </div>
            <div className={'col-8'}>
              <h3 className={'pb-0 text-success'}>
                Track - {song.name} By {song.artist} {" "}
                {currentUser && userFavoritedThisSong &&
                  <i onClick={() => {
                    handleUnfavoriteSong(song.id);
                  }} className="d-inline bi bi-star-fill text-warning"></i>
                }
                {currentUser && !userFavoritedThisSong &&
                  <i onClick={() => {
                    handleFavoriteSong(song.id);
                  }} className="d-inline bi bi-star text-warning"></i>
                }
              </h3>
              <h3 className={'text-secondary'}>From album {song.album}</h3>
              <h4>Track Popularity: {song.popularity}%</h4>
              <h4>Track Length: {minitues} min, {seconds} sec</h4>
            </div>
          </div>

        </>
      )}
      <hr/>
      {!currentUser ? (
        <RequestLogin />
      ) : (
        <>
          <h1 className="mt-10">Reviews</h1>
          <ul className="list-group mt-2">
            {reviews.length === 0 && <h3 className={'bg-secondary text-center text-white p-4'}>There isn't any review for this track yet!</h3>}
            {reviews &&
              reviews.map((review) => (
                <Review
                  key={review._id}
                  review={review.review}
                  username={review.username}
                  id={review._id}
                  userID={review.author}
                />
              ))}
          </ul>
          <form>
            <div className="form-group">
              <h4><label htmlFor="review">{reviews.length === 0 ? "Add the first review!" : "Add your review!"}</label></h4>
              <textarea
                cols="30"
                rows="3"
                id="review"
                className="form-control"
                placeholder="Leave some thoughts on this track!"
                value={currentReview}
                onChange={(e) => setCurrentReview(e.target.value)}
              ></textarea>

              <button
                type="button"
                onClick={handleReviewBtn}
                className="btn btn-primary btn-lg mt-2"
              >
                Add Review
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};
export default SongDetail;
