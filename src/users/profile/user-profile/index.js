import { useSelector } from "react-redux"
import PrivateUserProfile from "./private-user-profile";
import PublicUserProfile from "./public-user-profile";

const UserProfile = ({user}) => {
    const currentUser = useSelector((state) => state.users);
    return (
        <>
            {user.username === currentUser.username && <PrivateUserProfile user={user}/>}
            {user.username !== currentUser.username && <PublicUserProfile user={user}/>}
        </>
    )
}

export default UserProfile;

