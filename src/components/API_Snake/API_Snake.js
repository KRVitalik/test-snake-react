import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getPlyer = async () => {
    try {
        const { data } = await axios.get('user');
        return data
    } catch (error) {
        throw error;
    }
}

export const createPlyer = async (plyer) => {
    const { data } = await axios.post(`user`, plyer)
    return await data
}

export const updatePlyer = async (update) => {
    const { data } = await axios.put(`user/${update.id}`, update)
    return await data
}

