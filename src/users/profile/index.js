import { Routes, Route, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./user-profile";
import AdminProfile from "./admin-profile";
import ProtectedRoute from "../protected-route";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.users);
    const isAdmin = currentUser.role === 'ADMIN';
    const dispatch = useDispatch();
    return (
        <div>
            <Routes>
                <Route path="/*" element={isAdmin ? <AdminProfile user={currentUser} /> : <UserProfile user={currentUser} />} />
            </Routes>
        </div>
    );
};

export default Profile;