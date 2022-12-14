import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewThunk,
  deleteReviewThunk,
  updateReviewThunk,
  findReviewsBySongThunk,
} from "./reviews-thunks";

const RequestLogin = () => {
  return <h1>Please Login to see all the comments</h1>;
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
                <b>{review.username}:</b>
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
  const [currentReview, setCurrentReview] = useState("");
  const dispatch = useDispatch();
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
      setCurrentReview("");
    }
  };

  useEffect(() => {
    dispatch(findReviewsBySongThunk(song.id));
  }, []);

  const minitues = (song.duration_ms - (song.duration_ms % 60000)) / 60000
  const seconds = Math.ceil(song.duration_ms % 60000 / 1000)
  return (
    <>
      {song && (
        <>
          <h1>SONG</h1>
          <h1>{song.name}</h1>
          <img alt="song" src={song.image} height={400} />
          <h4>Popularity: {song.popularity}</h4>
          <h4>Song Duration: {minitues} minutes and {seconds} seconds</h4>
          <h4>Artist name: {song.artist} </h4>
          <h4>Album name: {song.album}</h4>
        </>
      )}

      {!currentUser ? (
        <RequestLogin />
      ) : (
        <>
          <h1 className="mt-10">Reviews</h1>
          <form>
            <div className="form-group">
              <label htmlFor="review">Add your reviews!</label>
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
                className="btn btn-primary"
              >
                Add Review
              </button>
            </div>
          </form>
          <ul className="list-group mt-5">
            {reviews &&
              reviews.map((review) => (
                <Review
                  key={review._id}
                  review={review.review}
                  username={review.username}
                  id={review._id}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
};
export default SongDetail;
