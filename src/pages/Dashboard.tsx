import {
    IonButtons, IonCard, 
    IonContent, IonHeader,   
    IonMenuButton, IonPage,
    IonTitle, IonToolbar,
    IonGrid, IonRow,
    IonCol, IonIcon,
    IonCardTitle,
    IonButton,    
    } from '@ionic/react';
import { list, settings, power, people } from 'ionicons/icons';
import React, { useState } from 'react';
import './Main.css';
import { logoutUser } from '../firebaseConfig';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import toast from '../toast';


  
  const Dashboard: React.FC = () => {


    const reduxkeys = useSelector((state: any) => state.reduxStoreKeys.allKeys)
    const [busy, setBusy] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()


    async function logout() {
      setBusy(true)
      await logoutUser()
      setBusy(false)
      history.replace('/login')
    }



    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle className="text-center">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonCard className="text-center padding card-dash">
                  <IonIcon className="ion-icons" icon={people} onClick={()=>history.push('/searchfarmer')}></IonIcon>
                  <IonCardTitle>
                    <IonButton color="tertiary" className="card-round-btn text-center" title="Mapping" onClick={()=>history.push('/searchfarmer')}>Mapping</IonButton>
                  </IonCardTitle>
                </IonCard>
              </IonCol>

              <IonCol size="6">
                <IonCard className="text-center padding card-dash">                  
                  <IonIcon className="ion-icons" icon={list} onClick={()=> {toast('No Scheduled Disbursement...', 3000)}}></IonIcon>
                  <IonCardTitle>
                    <IonButton color="tertiary" className="card-round-btn text-center" title="Disbursement" onClick={()=> {toast('No Scheduled Disbursement...', 3000)}}>Disbursement</IonButton>
                  </IonCardTitle>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="6">
                <IonCard className="text-center padding card-dash">
                  <IonIcon className="ion-icons" icon={settings} onClick={()=> history.push('/setup')}></IonIcon>
                  <IonCardTitle>
                    <IonButton color="tertiary" className="card-round-btn text-center" title="Settings" onClick={()=> history.push('/setup')}>Settings</IonButton>
                  </IonCardTitle>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard className="text-center padding card-dash">
                  <IonIcon className="ion-icons" icon={power} onClick={()=>logout()} />
                  <IonCardTitle>
                    <IonButton color="tertiary" className="card-round-btn text-center"  title="Logout" onClick={()=>logout()} >Logout</IonButton>
                    </IonCardTitle>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Dashboard;
  