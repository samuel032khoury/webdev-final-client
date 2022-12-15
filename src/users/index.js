import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findAllUsersThunk} from "./users-thunk";
import {Link} from "react-router-dom";

const Users = () => {
    const {users, loading} = useSelector((state) => state.users)
    console.log(users);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllUsersThunk())
    }, [])
    return(
        <>
            <h1>Users</h1>
            <ul className="list-group">
                {
                    users.map((user) =>
                    <Link key={user._id} className="list-group-item list-group-item-action"
                       to={`/profile/${user._id}`}> {user.username}
                    </Link>
                    )
                }
            </ul>
        </>
    )
}

export default Users;