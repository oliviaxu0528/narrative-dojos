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
                        <p>Narrative Dojo is a platform to create children's books with an AI image generator.
                        </p>
                    </div>
                    <div className="col">
                        <h4>Contact Us</h4>
                        <ul className="list-unstyled"></ul>
                        <p>Email: business@narrativeninjas.com</p>
                        <p>Phone: 1-800-NNINJAS</p>
                    </div>
                    <div className="col">
                        <h4 style={{ textAlign: 'center', paddingLeft: '0em' }}>Meet The Team</h4>
                        <ul className="list-unstyled"></ul>
                        <p><NavLink to="/team" style={{ ptextDecoration: 'none', color: 'white', textAlign: 'center' }}>
                            Narrative Ninjas </NavLink>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <p className="col">
                        &copy;{new Date().getFullYear()} Narrative Ninjas Inc. All Right Reserved
                    </p>
                </div>
            </div>
        </div >
    )
}
export default Footer;
