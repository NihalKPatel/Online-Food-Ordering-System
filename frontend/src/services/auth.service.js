import axios from "axios";

const API_URL = "http://nihal.ddnsfree.com:8080/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }


    update(email, password, address) {
        return axios.put(API_URL + "update/" + this.getCurrentUser().id, {
            email,
            password,
            address
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    delete() {
        return axios.delete(API_URL + "delete/" + this.getCurrentUser().id);
    }

    register(email, password, firstname, lastname, address, dob) {
        return axios.post(API_URL + "signup", {
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
