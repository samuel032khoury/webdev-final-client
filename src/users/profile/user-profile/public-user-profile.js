import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "../../users-thunk";
import {useNavigate, useParams} from "react-router";
import {useEffect} from "react";


const PublicInfo = ({user}) => {
    return (
        <>
            <div className="mt-2">
                <h4>Username: {user.username}</h4>
                <h4>First Name: {user.firstName}</h4>
            </div>
        </>
    )
}

const PublicUserProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
    }, [uid])
    return(
        <>
            <h2>{publicProfile && publicProfile.username}</h2>
            <PublicInfo user={publicProfile} />
            <h2>Reviews</h2>
            <h2>Favorite songs</h2>
        </>
    )
}
export default PublicUserProfile;