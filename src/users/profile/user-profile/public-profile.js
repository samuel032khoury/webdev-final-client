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
  const userReviews = reviews.filter((r) => r.username === publicProfile?.username);
  return (
    <>
      <h1>{publicProfile && `You are looking at ${publicProfile.username}'s profile`}</h1>
      {userReviews.length === 0 ?
        <h3 className={'text-center bg-secondary text-white-50'}>This user doesn't have any activity yet.</h3> :
        <ul className={'list-group'}>
          <li className={'list-group-item'}>
            All the comments they left:
          </li>
          {
            userReviews.map((review) => {
              const song = findSongInStateById(review.songID)
               return <li className={'list-group-item'}>
                  <Link to={`/details/${review.songID}`} state={{song: findSongInStateById(review.songID)}}>
                    {song.name}
                  </Link> By {song.artist}
                 <div><b>{review.review}</b></div>
                </li>
              }
            )
          }
        </ul>}
    </>
  )
}

export default PublicProfile