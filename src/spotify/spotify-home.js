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
      <h1>Artist Reviews</h1>
      {/* TODO: get most recent artist reviews */}
      {/* TODO: logged in content (most recent reviews for user) */}
    </>
  );
};

export default SpotifyHome;
