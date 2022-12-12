import { useSelector } from "react-redux"


const AdminProfile = ({user}) => {
    const currentUser = useSelector((state) => state.users);
    return (
        <>
            <h1>{user.role} and {user.username}</h1>
        </>
    )
}

export default AdminProfile;