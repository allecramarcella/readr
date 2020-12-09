import axios from 'axios'

class AuthService {
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true
        })
        this.service = service
    }


    signup = (username, password, profileName, gender, matchPreference, contactInfo, profileImage) => {
        return this.service.post('/auth/signup', { username, password, profileName, gender, matchPreference, contactInfo, profileImage} )
        .then(response => {
            console.log(response.data)
            return response.data
        })
    }

    login = (username, password) => {
        return this.service.post('/auth/login', { username, password })
        .then(response => response.data)
    }

    logout = () => {
        return this.service.get('/auth/logout')
        .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/auth/loggedin')
        .then(response => response.data)
    } 
    
}


export default AuthService