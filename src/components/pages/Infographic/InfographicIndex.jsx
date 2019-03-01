import React, { Component } from 'react';
import { InfographicsList } from "./InfographicsList.jsx";
import { EditInfographic } from "./EditInfographic.jsx";
import { callGet } from './../../../common/services/fetchService.jsx';
import Loader from './../../../common/loader.jsx';
import { getUserToken } from './../../../common/services/userService.jsx';

class InfographicIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        data: props.data,
        isLoading: false,
    };
    // var token = getUserToken();
    // if (token) {
    //   this.loadData(token);
    // }
  }

  // loadData (token) {
  //   callGet("infographic").then(result => {
  //     this.setState( prevState => {
  //       return {
  //         ...prevState,
  //         data: result,
  //         isLoading: false,
  //       };
  //     })
  //   });
  // }

  render() {
    return (<div>
        {this.state.isLoading ? ( <Loader/>): (<div className="InfographicIndex">
          {(this.state.data && this.state.data.length > 0) ? (<InfographicsList {...this.state}/>) :
              (<EditInfographic/>)}
        </div>
        )}
      </div>
    );
  }
}

export default InfographicIndex;
