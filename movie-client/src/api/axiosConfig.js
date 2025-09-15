import axios from "axios";
import env from "react-dotenv";


const moviesApi = axios.create({
  baseURL: `${import.meta.env.VITE_SPRING_BOOT}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
}); 
export default moviesApi;