import React, { Component } from 'react';
import './InfographicFbHeader.css';
import LinesEllipsis from 'react-lines-ellipsis';
import { UserLogo } from './UserLogo.jsx';

class InfographicFbHeader extends Component {
    render(){
        return (
    <div className="InfographicFbHeader-container">
        <div className="InfographicFbHeader-logo">
            <UserLogo userImage={this.props.user.pictureUrl} userName={this.props.userName}/>
        </div>
        <div className="InfographicFbHeader-title">
            <h5 className="InfographicFbHeader-username">
                {this.props.userName}
            </h5>
            <div className="InfographicFbHeader-postdetails">
                <span className="timestampContent" id="js_2q">Just now</span>
                <span role="presentation" aria-hidden="true"> · </span>
                <span className="location">
                <LinesEllipsis
                            text={this.props.city || ""}
                            maxLine='1'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            /></span>
            </div>
        </div>
    </div>);
    }
}

export default InfographicFbHeader;