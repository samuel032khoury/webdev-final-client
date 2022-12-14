import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSpotifyAccessTokenThunk,
} from "./spotify-thunks";
import { Link } from "react-router-dom";

const SpotifyHome = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { token, recommendations, loading } = useSelector(
    (state) => state.spotify
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotifyAccessTokenThunk());
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <h1>Song Reviews</h1>
      {/* TODO: get most recent song reviews */}
      {/* TODO: logged in content (most recent reviews for user) */}
      {/* TODO: logged in content (user's favorite songs) */}
    </>
  );
};

export default SpotifyHome;
