import React, { Component } from 'react';
import Loader from '../common/loader.jsx';

const ComponentWithOnLeave = () => (Comp) =>
  class WithOnLeave extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        isLoading: false,
        error: null,
      };
    }

    componentDidMount() {
      // this.setState({ isLoading: true });
      this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
      // fetch(this._api + url, this._config)
      //   .then(response => {
      //     if (response.ok) {
      //       return response.json();
      //     } else {
      //       throw new Error('Something went wrong ...');
      //     }
      //   })
      //   .then(data => this.setState({ data, isLoading: false }))
      //   .catch(error => 
      //       {
      //           this.setState({ error, isLoading: false });
      //       }
      //   );
    }

    routerWillLeave(nextLocation) {
      // return false to prevent a transition w/o prompting the user,
      // or return a string to allow the user to decide:
      // return `null` or nothing to let other hooks to be executed
      //
      // NOTE: if you return true, other hooks will not be executed!
      if (!this.state.isSaved)
        return 'Your work is not saved! Are you sure you want to leave?'
    }

    render() {
      return (<div>
        <Comp { ...this.props } />
      </div>)
    }
  }

  export default ComponentWithOnLeave;
