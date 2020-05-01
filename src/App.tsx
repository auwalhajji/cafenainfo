import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner, 
        } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'
import Download from './pages/Download'
import FarmerCapture from './pages/FarmerCapture'
import FarmCapture from './pages/FarmCapture'
import SearchFarmer from './pages/SearchFarmer'
import UploadScreen from './pages/UploadScreen';
import DataAnalysis from './pages/DataAnalysis';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { getCurrentUser } from './firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
import LoadedFarmers from './pages/LoadedFarmers';
import MappedFarmers from './pages/MappedFarmers';
import FarmerProfile from './pages/FarmerProfile';
import FarmerLoaded from './pages/FarmerLoaded';
import SetupScreen from './pages/SetupScreen';



const RoutingSystem: React.FC = () => {
  return(
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/dashboard" component={Dashboard} exact={true} />  
        <Route path="/setup" component={SetupScreen} exact={true} />
        <Route path="/download" component={Download} exact={true} />
        <Route path="/loadedfarmers/:storageKeys" component={LoadedFarmers} exact={true} />
        <Route path="/mappedfarmers/:storageKeys" component={MappedFarmers} exact={true} />
        <Route path="/dataanalysis" component={DataAnalysis} exact={true} />
        <Route path="/searchfarmer" component={SearchFarmer} exact={true} />
        <Route path="/farmer/:bvn" component={FarmerCapture} exact={true} />
        <Route path="/farm/:bvn" component={FarmCapture} exact={true} />
        <Route path="/upload/:bvn" component={UploadScreen} exact={true} />
        <Route path="/profile" component={FarmerProfile} exact={true} />
        <Route path="/loaded" component={FarmerLoaded} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
      getCurrentUser().then((user: any) => {
        //console.log(user)
        if (user) {
          // I'm logged in
          dispatch(setUserState(user.email))
          window.history.replaceState({}, '', '/dashboard')
        } else {
           window.history.replaceState({}, '', '/')
        }
        setBusy(false)
      })
  }, [])

  return (  <IonApp> {busy ? <IonSpinner /> : <RoutingSystem />} </IonApp>
  );
}

export default App;
