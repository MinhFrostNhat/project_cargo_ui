import React from "react";
import { Card } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    
          <Card.Footer>
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Let's go</h4>
            <h1 className="list-unstyled">
              <li>342-420-6969</li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Simple carry your cargo</h4>
            <ui className="list-unstyled">
              <li>Fast</li>
              <li>uy tin</li>
              <li>dam bao</li>
            </ui>
          </div>
        </div>
      </div>
    </div>
    </Card.Footer>
    
  );
}

export default Footer;