import React, {Component} from "react";

import UserService from "../services/user.service";
import logo from "../images/logo_name_white.png";
import {AiOutlineSearch} from "react-icons/ai";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }
x
    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="home home-section">
                <div>
                    <header className="container" style={{paddingTop:"330px"}}>
                        <img src={logo} style={{display:"block", marginLeft:"auto", marginRight: "auto", height:"106px", width:"309px"}}/>
                        <p style={{textAlign:"center", color:"white", paddingTop:"60px", fontSize:"25px" }}>Find Local Restaurants</p>
                        <div style={{paddingTop:"50px"}}>
                        <form>
                            <AiOutlineSearch style={{fontSize:"50px", marginTop:"15px", marginLeft:"10px", transform:"scale(-1, 1)"}}/>
                            <input className="searchbar" type="search" placeholder="Search..."/>
                            <button type="submit">Search</button>
                        </form>
                            </div>
                    </header>
                </div>
            </div>
        );
    }
}
