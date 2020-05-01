import { IonContent, IonRow,
    IonCol, IonHeader, 
    IonTitle, IonToolbar, 
    IonButton, IonCard,
    IonInput, IonGrid, IonCardHeader,         
    IonItem, IonCardTitle,
     IonCardContent,
     IonText, IonLoading
    } from '@ionic/react';

import React, { useState } from 'react';
import './Login.css';
//import { Plugins } from '@capacitor/core';
import { Link } from 'react-router-dom';
import registerUser from '../firebaseConfig'
import toast from '../toast';
//import "@codetrix-studio/capacitor-google-auth";

const INITIAL_STATE = {

};

const Register: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)    

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

async  function register(){
    setBusy(true)
    if (password !== cpassword){
        toast("Error: Password mismatch", 3000)
    }
    if (username.trim() === '' || password.trim() === '') {
        toast('Username and Password required', 3000)
    }
   
//const {username, password} = this.state
const res = await registerUser(username, password)
       
      if (res) {
          toast('Registration successfull', 3000)
      }
        setBusy(false)
}


return (
  

<IonContent className="ion-padding">
<IonHeader>
  <IonToolbar color="primary">
    <IonTitle >
      Register To App
    </IonTitle>
  </IonToolbar>
</IonHeader>
<IonCard>

{busy && <IonLoading message="Registration in progress.." duration={0} isOpen={busy}/>}
    <IonCardHeader>
      <IonCardTitle className="text-center">
          Register 
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      
        <IonGrid  className="justify-content-center">            
          <IonRow color="primary" className="ion-padding-top ion-justify-content-between">
            <IonCol offset="2" className="ion-padding-top offset-3" size="8">
              
              <div className="padding-top">
                <IonItem>
                  <IonInput name="username" type="text" placeholder="Username" 
                    className="ngModel" required 
                    onIonChange={(e: any) => setUsername(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonInput name="password" type="password" placeholder="Password" 
                      className="ngModel" required
                      onIonChange = {(e: any) => setPassword(e.target.value)}
                      />                     
                </IonItem>
                <IonItem>
                  <IonInput name="cpassword" type="password" placeholder=" Confirm Password" 
                      className="ngModel" required
                      onIonChange = {(e: any) => setCPassword(e.target.value)}
                      />                     
                </IonItem>
              </div>
              <div className="padding">
                <IonButton size="large" type="submit" className="form.invalid" 
                onClick={register} expand="block">Register</IonButton>
                <IonText>Already a user <Link to="/login">Login</Link> </IonText>
              </div>
            </IonCol>
          </IonRow>        
        </IonGrid>
      
    </IonCardContent>    

</IonCard>

</IonContent>

  

)

}

export default Register;
