import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonText, IonAvatar, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonIcon, IonInput, IonGrid, IonRow, IonCol, IonThumbnail, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';
import Avatar from '../assets/img/avatar.png';
import { array } from 'prop-types';
import './Main.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const FarmerProfile: React.FC = () => {

  const farmer = useSelector((state: any) => state.reduxStoreFarmer.farmer)
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color='tertiary'>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="text-center">Farmer Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonItem>
            <IonRow className='profile-avatar'>
              <IonCol size="5"></IonCol>
              <IonCol size="2" className="text-center">
              <IonThumbnail className='round'>
                <img src={Avatar}/>
              </IonThumbnail>
              </IonCol>
              <IonCol size="5"></IonCol>
            </IonRow>
          </IonItem>
        <div className="section text-center">Basic Farmer Data</div>
          <IonItem>
              <IonLabel>First Names: </IonLabel>
              <IonLabel>{farmer.f_name}</IonLabel>
          </IonItem>
          <IonItem>
              <IonLabel>Other Names: </IonLabel>
              <IonLabel>{farmer.o_name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Surname: </IonLabel>
            <IonLabel>{farmer.sname}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Gender: </IonLabel>
            <IonLabel>{farmer.sex}</IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>LGA Origin: </IonLabel>
            <IonLabel>{farmer.f_lg}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>State Origin: </IonLabel>
            <IonLabel>{farmer.f_state}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Nationality: </IonLabel>
            <IonLabel>{farmer.f_nationality}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Status: </IonLabel>
            <IonLabel>Not Verified</IonLabel>
          </IonItem>              
        </IonGrid>
        <IonButton color="tertiary" className='ion-padding round-btn'
          onClick={ () => history.goBack()}>
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default FarmerProfile;
