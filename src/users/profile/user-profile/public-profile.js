import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "../../users-thunk";
import {Link} from "react-router-dom";
import {findAllReviewsThunk, findLatestReviewsThunk} from "../../../reviews/reviews-thunks";

const PublicProfile = () => {
    const {uid} = useParams()
  const {publicProfile} = useSelector((state) => state.users)
  const {reviews} = useSelector((state) => state.reviews)
  const {songs} = useSelector((state) => state.songs)
  const {followers, following} = useSelector((state) => state.follows)
  const dispatch = useDispatch()
  const findSongInStateById = (id) => {
    return songs.find((song) => song.id === id)
  }
  useEffect(() => {
    dispatch(findUserByIdThunk(uid))
    dispatch(findAllReviewsThunk())
  }, [uid])
  return (
        <>
            <h1>{publicProfile && publicProfile.username}</h1>
            <ul>
                {
                reviews && reviews.filter((r) => r.username === publicProfile?.username).map((review) =>
                    <li>
                    <Link to={`/song/${review.songID}`} state={{song: findSongInStateById(review.songID)}}>
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