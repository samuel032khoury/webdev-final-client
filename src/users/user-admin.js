import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteReviewThunk, findAllReviewsThunk} from "../reviews/reviews-thunks";
import {Link} from "react-router-dom";

export const Admin = () => {
  const {reviews} = useSelector((state) => state.reviews)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(findAllReviewsThunk())
  }, [])
  return (
    <>
      <h1 className={'mt-3 mb-3'}>
        Manage all the comments
      </h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-xl-11 col-lg-11 col-md-10 col-sm-8 col-xs-8">
            <div className="list-group" style={{backgroundColor: "#edf0ed"}}>
              {reviews.map((review) => {
                console.log(review);
                return (
                  <div className={'list-group-item'}>
                    <div className="float-end">
                      <i
                        onClick={() => {
                          dispatch(deleteReviewThunk({reviewID: review._id}));
                        }}
                        className="bi bi-x-lg"
                      ></i>
                    </div>
                    <Link to={`/profile/${review.userID}`}>
                      {review.username}
                    </Link>
                    <p>{review.review}</p>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>
      <br/>
    </>
  )
}