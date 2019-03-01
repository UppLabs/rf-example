import React, { Component } from 'react';
import { PropagateLoader } from 'react-spinners';

class Loader extends Component {
    render (){
        return (
    <div>
        <div className="loader-container"/>
        <div className='sweet-loading'>
        <PropagateLoader
            color={'#19a9e5'} 
            loading={true} 
        />
        </div>
    </div>
        );
    }
}

export default Loader;