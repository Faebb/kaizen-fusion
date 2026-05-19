import axios from "axios"
import { API_KAIZEN } from "./config"


export const httpClient = axios.create({
    baseURL: API_KAIZEN.baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Error de la API:", error)
        return Promise.reject(error)
    }
)