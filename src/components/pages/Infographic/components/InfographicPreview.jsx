import React, { Component } from 'react';
import './InfographicPreview.css';
import InfographicFbHeader from './InfographicFbHeader.jsx';
import InfographicImage from './InfographicImage.jsx';

class InfographicPreview extends Component {
    render() {
        return (
            <div className="InfographicPreview-container">
                <InfographicFbHeader {...this.props}/>
                <div className="InfographicPreview" id="InfographicPreviewId">
                    <InfographicImage {...this.props}/>
                </div>
            </div>
        );
    }
}

export default InfographicPreview;