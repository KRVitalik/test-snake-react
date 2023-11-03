import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/'

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