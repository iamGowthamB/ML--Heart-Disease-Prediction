import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const analyzeHeartRisk = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/predict`, data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
