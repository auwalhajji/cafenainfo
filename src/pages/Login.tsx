import { IonContent, IonRow,
        IonCol, IonHeader, 
        IonTitle, IonToolbar, 
        IonButton, IonCard,
        IonInput, IonGrid, IonCardHeader,         
        IonCardTitle, IonCardContent,
        IonLoading, IonPage
        } from '@ionic/react';

import React, { useState } from 'react';
import './Main.css';
//import { Plugins } from '@capacitor/core';
import { useHistory } from 'react-router-dom';
import loginUser from '../firebaseConfig'
import toast from '../toast';
import { setUserState } from '../redux/actions'
import { useDispatch } from 'react-redux';
//import "@codetrix-studio/capacitor-google-auth";

const INITIAL_STATE = {

};

const Login: React.FC = () => {

  const [busy, setBusy] = useState<boolean>(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async  function loginCheck(){
    setBusy(true)    
    const res: any = await loginUser(username, password)
    if (res) {
        dispatch(setUserState(res.user.email))
        history.replace('/dashboard')
        toast('You have logged in!')
    } 
    setBusy(false)
}


    return (
      
    
    <IonPage>
    
    <IonHeader>
      <IonToolbar color="tertiary">
        <IonTitle >
          Login To App
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    
    <IonContent className="ion-padding">
    <div className="padding-top" id="container">
    <IonCard color="white">
      {busy && <IonLoading message="loading..." duration={0} isOpen={busy}/>}
        <IonCardHeader>
          <IonCardTitle className="text-center">
              Login 
          </IonCardTitle>          
        </IonCardHeader>

        <IonCardContent>

          <IonGrid>
            <IonRow color="tertiary" className="ion-justify-content-between">
              <IonCol offset="3" size="6">
              <IonInput name="username" type="text" placeholder="Username" 
                className="ion-input" required 
                onIonChange={(e: any) => setUsername(e.target.value)}/>
              </IonCol>
              <IonCol size="3"></IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-between">
              <IonCol offset="3" size="6">
                <IonInput name="password" type="password" placeholder="Password" 
                  className="ion-input" required
                  onIonChange = {(e: any) => setPassword(e.target.value)} />
              </IonCol>
              <IonCol size="3"></IonCol>
            </IonRow>
            <IonRow className="ion-padding ion-justify-content-between text-center">
              <IonCol offset="3" size="6" className="text-center">
                <IonButton  color="tertiary" type="submit" className="btn" 
                  onClick={loginCheck}  expand="block" >
                  Login
                </IonButton>
              </IonCol>
              <IonCol size="3"></IonCol>
            </IonRow>
          </IonGrid>
            
        </IonCardContent> 
    </IonCard>
    </div>
  </IonContent>
  </IonPage>

      

    )
 
}

export default Login;
