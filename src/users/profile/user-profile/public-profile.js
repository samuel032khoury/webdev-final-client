import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "../../users-thunk";
import {Link} from "react-router-dom";
import {findReviewsBySongThunk, findReviewsThunk} from "../../../reviews/reviews-thunks";

const Review = ({ rid }) => {
    const { reviews } = useSelector((state) => state.reviews);
    const matchingReviews = reviews.filter(review => review._id === rid)[0];
    if (matchingReviews) {
        return (
            <>
                <li key={matchingReviews._id} className="list-group-item">
                    <p>{matchingReviews.review}</p>
                    <p>{matchingReviews.createAt}</p>
                    <Link to={`/song/${matchingReviews.songID}`} state={{review: matchingReviews}}>
                        {matchingReviews.review}
                    </Link>
                </li>
            </>
        )
    } else {
        return <></>
    }
}

const PublicProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid));
        dispatch(findReviewsThunk);
        dispatch(findReviewsBySongThunk(reviews.songID));
    }, [uid])
    return(
        <>
            <h1>{publicProfile && publicProfile.username}</h1>
            <h2>Recent Reviews</h2>
            {/*<ul className="list-group">*/}
            {/*    {*/}
            {/*        reviews.map(review => <Review key={review._id} rid={review._id} />)*/}
            {/*    }*/}
            {/*</ul>*/}
            <ul>
                {
                    reviews && reviews.map((review) =>
                        <li key={review._id} className="list-group-item">
                            <Link to={`/song/${review.songID}`}>
                                {review.review}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default PublicProfile