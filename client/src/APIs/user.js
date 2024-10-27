import axios from "axios"
import { SERVER_URL } from "../assets/data/secret"

export const getUserDataByIDandRole = (id, role) => {
    return axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getUserDetails/${id}/${role}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}