//Basic Imports
import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
// IMPORT COMPONENTS
// import routes from './routes'
// import AllGroups from './components/AllGroups'


//CSS IMPORTS
import './components/CSS/reset.css'
import './App.css';
import './components/CSS/Edit.css'
import './components/CSS/AllGroups.css'
import './components/CSS/AllUnits.css'
import './components/CSS/DisplayImage.css'
import './components/CSS/Group.css'
import './components/CSS/Login.css'
import './components/CSS/Profile.css'
import './components/CSS/Unit.css'
import './components/CSS/Media.css'
import './components/CSS/Email.css'

import routes from './routes/routes';
// import './components/Group.css'

class App extends Component {
  render() {
    return (
      <HashRouter>

        <div className="App">
          {routes}
        </div>

      </HashRouter>
    );
  }
}

export default App;
