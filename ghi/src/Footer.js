import React from "react";
import "./Footer.css"
import { NavLink } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>About Us</h4>
                        <p>Narrative Dojo is a platform to create children's book with AI image generator. Our goal is to making books easily and conveniently</p>
                    </div>
                    <div className="col">
                        <h4>Contact Us</h4>
                        <ul className="list-unstyled"></ul>
                        <p>Email: business@narrativeninjas.com</p>
                        <p>Phone: 1-800-SWUP</p>
                    </div>
                    <div className="col">
                        <h4 style={{ textAlign: 'center', paddingLeft: '0em' }}>Meet The Team</h4>
                        <ul className="list-unstyled"></ul>
                        <p><NavLink to="/team" style={{ ptextDecoration: 'none', color: 'white', textAlign: 'center' }}>
                            Team Narrative Ninjas </NavLink>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Narrative Ninjas Inc. All right reserved
                    </p>
                </div>
            </div>
        </div >
    )
}
export default Footer;
