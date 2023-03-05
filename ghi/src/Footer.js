import React from "react";
import "./Footer.css"

const Footer = () => {
    return (
        <div className="main-footer">
            <div classnName="container">
                <div className="row">
                    {/* Column 1 */}
                    <div className="col">
                        <h4>Contact Us</h4>
                        <ul className="list-unstyled"></ul>
                        <li>504-999-9999</li>
                        <li>Seattle，WA</li>
                        <li>123 Amazon Avenue</li>
                    </div>
                    {/* Column 2 */}
                    <div className="col">
                        <h4>Content</h4>
                        <ul className="list-unstyled"></ul>
                        <li>Dank Memes</li>
                        <li>Good stuff</li>
                        <li>123 Google Avenue</li>
                    </div>
                    {/* Column 3 */}
                    <div className="col">
                        <h4>STUFF</h4>
                        <ul className="list-unstyled"></ul>
                        <li>Kevin Durant</li>
                        <li>MVP</li>
                        <li>123 Netflix Avenue</li>
                    </div>
                </div>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Narrative Ninjas Inc.| All right reserved | Terms of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;