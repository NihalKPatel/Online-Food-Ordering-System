import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, firstname, lastname, address, dob) {
        return axios.post(API_URL + "signup", {
            username,
            firstname,
            lastname,
            address,
            email,
            password,
            dob
        });
    }

    getCurrentUser() {
        console.log(JSON.parse(localStorage.getItem('user')));
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
