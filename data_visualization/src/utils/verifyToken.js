import axios from "axios"

export default async function verifyToken(token) {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/user/authenticate',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const request = await axios.request(config)

        const response = request.data
        console.log("Token response ", response)
        return true
        // alert(response.message)
    } catch (error) {
        return false
    }
}

