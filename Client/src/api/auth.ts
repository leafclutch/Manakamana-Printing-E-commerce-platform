
import api from "./axios";

//register user

// Define RegisterCredentials type for registration
export type RegisterCredentials = {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    message: string;
};

export const registerUser = async(payload:RegisterCredentials)=>{
    try {
        const response = await api.post('/v1/client/registerrequest', payload)
        return response.data;
    } catch (error) {
        throw error
    }
}


//login user
export const loginUser = async(client_id:string,password:string)=>{
    try {
        const response = await api.post('/v1/client/login', {client_id, password})
        return response.data;
    } catch (error) {
        throw error
    }
}
