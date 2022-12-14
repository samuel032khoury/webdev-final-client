
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {likesReducer} from "./likes/likes-reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./navigation";
import Users from "./users";
import usersReducer from "./users/users-reducer";
import Login from "./users/login";
import Register from "./users/register";
import CurrentUser from "./users/current-user";
import Profile from "./users/profile/user-profile/profile";
import ProtectedRoute from "./users/protected-route";
import reviewsReducer from "./reviews/reviews-reducer";
import PublicProfile from "./users/profile/user-profile/public-profile";
import followsReducer from "./follows/follows-reducer";
import spotifyReducer from "./spotify/spotify-reducer";
import favoritesReducer from "./favorites/favorites-reducer";
import SpotifySearchDefault from "./spotify/spotify-search-default";
import SongDetail from "./reviews/song-detail";
import SpotifyHome from "./spotify/spotify-home";
import SpotifySearchSongs from "./spotify/spotify-search-songs";
import songsReducer from "./songs/songs-reducer";

const store = configureStore({
    reducer: {
        songs: songsReducer,
        spotify: spotifyReducer,
        favorites: favoritesReducer,
        users: usersReducer,
        reviews: reviewsReducer,
        follows: followsReducer
    }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function App() {
    return (
        <div className="container mt-4 mb-4">
            <Provider store={store}>
                <BrowserRouter>
                    <CurrentUser>
                        <Navigation/>
                        <Routes>
                            <Route index element={<SpotifyHome/>}/>
                            <Route path="/search" element={<SpotifySearchDefault/>}/>
                            <Route path="/search/songs" element={<SpotifySearchSongs/>}/>
                            <Route path="/users" element={
                                <ProtectedRoute>
                                    <Users/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/song/:songId" element={<SongDetail/>}/>
                            <Route path="/profile/:uid" element={<PublicProfile/>}/>
                        </Routes>
                    </CurrentUser>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
