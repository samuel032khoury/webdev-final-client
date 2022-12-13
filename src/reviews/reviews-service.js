import axios from "axios";

const REVIEW_API = 'http://localhost:4000/api/reviews'
const SONG_REVIEWS_API = 'http://localhost:4000/api/song'
const AUTHOR_REVIEWS_API = 'http://localhost:4000/api/users'

const api = axios.create({withCredentials: true});

export const createReview = async (params) => {
    try {
        const response = await axios({
          method: "post",
          url: REVIEW_API,
          withCredentials: true,
          data: {
            review: params.review,
            songID: params.songID,
            username: params.username
          },
        });
        return response.data;
      } catch (error) {
        return error;
      }
}

export const deleteReview = async (params) => {
    try {
        const response = await axios({
          method: "post",
          url: `${REVIEW_API}/delete/${params.reviewID}`,
          withCredentials: true,
        });
        return params.reviewID
      } catch (error) {
        return error;
      }
}

export const updateReview = async (params) => {
    try {
        console.log(params)
        const response = await axios({
          method: "post",
          url: `${REVIEW_API}/update/${params.reviewID}`,
          withCredentials: true,
          data:{
            review: params.newReview.review
          }
        });
        const status = response.data
        return params.newReview
      } catch (error) {
        return error;
      }
}


export const findReviewsBySong = async (songID) => {
    const response = await api.get(`${SONG_REVIEWS_API}/${songID}/reviews`)
    return response.data
}

export const findReviewsByAuthor = async (author) => {
    const response = await api.get(`${AUTHOR_REVIEWS_API}/${author}/reviews`)
    return response.data
}
