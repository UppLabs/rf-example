import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import Elements from './components/pages/Elements';
import { AUTHENTICATED } from './actions/types';
import requireAuth from './components/hoc/RequireAuth';
import noRequireAuth from './components/hoc/RequireNotAuth';
import TopMenu from './components/TopMenu';
import { Grid } from 'react-bootstrap';
import EditInfographic from './components/pages/Infographic/EditInfographic';
import InfographicsList from './components/pages/Infographic/InfographicsList';
import InfographicIndex from './components/pages/Infographic/InfographicIndex';

import ComponentWithFetching from './common/ComponentWithFetching';
import ComponentWithOnLeave from './common/ComponentWithOnLeave';
import logger from 'redux-logger';
import {getUserToken} from './common/services/userService.jsx';
const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);
const user = getUserToken();

if (user) {
  store.dispatch({ type: AUTHENTICATED, tkn: user });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <TopMenu />
                <Grid>
                  <Switch>
                    <Route exact path="/" onLeave={this.checkSavedData} 
                      component={ComponentWithFetching("infographic")(InfographicIndex)} />
                    <Route exact path="/Home" component={ComponentWithFetching("infographic")(InfographicIndex)} />
                    <Route exact path="/List" component={ComponentWithFetching("infographics")(InfographicsList)} />
                    <Route exact path="/Create" component={EditInfographic} />
                    
                    {/* <Route path="/signin" component={noRequireAuth(SignIn)} />
                    <Route path="/signup" component={noRequireAuth(SignUp)} />
                    <Route path="/elements" component={requireAuth(Elements)} />
                    <Route path="/signout" component={SignOut} /> */}
                  </Switch>
                </Grid>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;


