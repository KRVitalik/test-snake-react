import axios from "axios";

console.log(process.env.REACT_APP_API_URL)
axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const getPlyer = async () => {
    try {
        const { data } = await axios.get('user');
        console.log(data)
        return data
    } catch (error) {
        throw error;
    }
}

export const createPlyer = async (plyer) => {
    console.log(plyer)
    const { data } = await axios.post(`user`, plyer)
    return await data
}