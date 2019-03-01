import React, { Component } from 'react';
import './Infographic.css';
import { Tiles } from "../../../common/tiles/Tiles.jsx";
import './InfographicsList.css';
import { callPost } from './../../../common/services/fetchService.jsx';
import Loader from '../../../common/loader.jsx';
import {ErrorWindow} from './../../../common/modalWindows/ErrorWindow.jsx';
import {appUrl} from './../../../common/variables.jsx';

export class InfographicsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showError: false
    }

    this.share = this.share.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  render() {
    return (
      <div className="row InfographicsList">
        <div>
          Would you like to create an infographic? 
          <a href="/Create" className="Infographic-Create">
            <button className="button-blue"><div className="Button-label">Yes, let's create</div></button>
          </a>
        </div>
          {this.state.loading ? ( <Loader/>): ((this.props.data && this.props.data.length > 0) ? 
            (<Tiles share={this.share} {...this.props} edit={this.edit}/>) : (<div>You do not have any infographic yet.</div>))}

          {this.state.showError ? (<ErrorWindow/>) : (null)}
      </div>
    );
  }

  handleResponse = function(response) {
    this.setState(prevState => {
      return {
        ...prevState,
        loading: false,
        showError: response.result != "OK"
      };
    });
  }

  edit = function(tile) {
    window.open(appUrl + '/i/' + tile.id);
  }

  share = function(tile){
    this.setState(prevState => {
      return {
        ...prevState,
        loading: true,
      };
    }, ()=>{});
      var model = {id: tile.id};
      var _handleResponse = this.handleResponse;
                
      callPost("fb/share", model).then(function(response){
        _handleResponse(response);
      })
  }
}

export default InfographicsList;
