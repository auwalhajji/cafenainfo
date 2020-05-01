import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonText, IonAvatar, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonIcon, IonInput, IonGrid, IonRow, IonCol, IonThumbnail, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';
import Avatar from '../assets/img/avatar.png';
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
              <IonThumbnail className='text-center'>
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
              <IonLabel>Age: </IonLabel>
              <IonLabel>{farmer.age}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Marrital Status: </IonLabel>
            <IonLabel>{farmer.marriage_status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Number of Children: </IonLabel>
            <IonLabel>{farmer.num_of_children}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Address: </IonLabel>
            <IonLabel>{farmer.address}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Alternate Occupation: </IonLabel>
            <IonLabel>{farmer.f_occupation}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>BVN: </IonLabel>
            <IonLabel>{farmer.bvn}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Monthly Income: </IonLabel>
            <IonLabel>{farmer.income}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>ID Type: </IonLabel>
            <IonLabel>{farmer.id_type}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>ID Number: </IonLabel>
            <IonLabel>{farmer.id_number}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>ID Exp. Date: </IonLabel>
            <IonLabel>{farmer.exp_date}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Year of Previous Intervention: </IonLabel>
            <IonLabel>{farmer.prev_interven}</IonLabel>
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
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
        <div className="section text-center">Farm-Data</div>
          <IonItem>
            <IonLabel>Farm Location: </IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Farm Size: </IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Farm Topology: </IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Soil Type: </IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Longitude: </IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Latitude: </IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
        <div className="section text-center">Nok/Guarantor Detail</div>
          <IonItem>
            <IonLabel>Name of NoK: </IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Nod Address</IonLabel>
            <IonLabel>{farmer.verification_status}</IonLabel>
          </IonItem>
        <div className="section text-center">Verification</div>
          <IonItem>
            <IonLabel>Verification Date: </IonLabel>
            <IonLabel>{farmer.age}</IonLabel>
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
