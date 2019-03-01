import React, { Component } from 'react';
import './UserLogo.css';

export class UserLogo extends Component {
    render() {
        var imgUrl = this.props.userImage || "https://s3.amazonaws.com/rentalfriend2/images/user-circle-128.png";
        var logoStyle = {
            background: `url(${imgUrl}) no-repeat`
        };
        return (
            <div>
                <div className="Infographic-UserLogo" style={logoStyle}> </div>
            </div>
        );
    }
}
