import axios from "axios";
import { SERVER_URL } from "../assets/data/secret";
import toast from "react-hot-toast";

// export const handleBookmark = (tripID, isBookmarked, setIsBookmark) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//         if (!isBookmarked) {
//             addBookmark(tripID, user._id)
//                 .then(res => {
//                     if (res.status) {
//                         setIsBookmark(true);
//                     }
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         } else {
//             removeBookmark(tripID, user._id)
//                 .then(res => {
//                     if (res.status) {
//                         setIsBookmark(false);
//                     }
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         }
//     } else {
//         alert("Please Login to bookmark");
//     }
// };

// Updating addBookmark to return the promise correctly

export const addBookmark = async (tripID, userID) => {
    let data = {
        userID: userID,
        tripID: tripID
    };

    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/addBookmark`, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const removeBookmark = async (tripID, userID) => {
    let data = {
        userID: userID,
        tripID: tripID
    };

    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/removeBookmark`, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const handleBookmark = async (tripID, isBookmarked, setIsBookmark) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please Login to bookmark");
        return;
    }

    try {
        const res = isBookmarked
            ? await removeBookmark(tripID, user._id)
            : await addBookmark(tripID, user._id);

        if (res.status) {
            setIsBookmark(!isBookmarked);
            toast.success(res.message)
        }
        else {
            toast.error(res.message)
        }
    } catch (err) {
        console.log(err);
    }
};

export async function checkInBookmarks(userID, tripID) {
    try {
        let data = {
            userID: userID,
            tripID: tripID
        };

        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/checkInBookmarks`, data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Consider re-throwing or handling the error appropriately
    }
}