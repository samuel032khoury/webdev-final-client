import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "../../users-thunk";
import {Link} from "react-router-dom";

const PublicProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
    }, [uid])
    return(
        <>
            <h1>{publicProfile && publicProfile.username}</h1>
            <h2>Recent Reviews</h2>
            <ul>
                {
                    reviews && reviews.filter((review) => (review.author === uid))
                        .map((review) =>
                    <li>
                        <Link to={`/song/${reviews.songID}`}>
                        {review.review} {reviews.songID}
                        </Link>
                    </li>
                    )
                }
            </ul>
            <h2>Favorite Songs</h2>
        </>
    )
}

export default PublicProfile;