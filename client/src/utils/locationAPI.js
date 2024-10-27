import axios from 'axios';

export const getCountryDetails = async (code) => {
    const config = {
        headers: {
            'X-CSCAPI-KEY': 'SzVCdVpRWlFNUGpoQ1d5VnhvRTc4bGJtTHZ6WlF2VWZydkRIUVpvbQ=='
        }
    };

    try {
        const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${code}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching country details:', error);
        throw error;
    }
};
