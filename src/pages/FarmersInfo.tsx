import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonAvatar, IonLabel, IonItemSliding, 
  IonItemOptions, IonItemOption, IonButton, IonIcon, 
  IonInput,IonGrid, IonRow, IonCol, useIonViewWillEnter, 
  useIonViewDidEnter, IonFab, IonFabButton } from '@ionic/react';
import React, { useState } from 'react';
import './Main.css';
import Avatar from '../assets/img/avatar.png';
import {informationCircle, create, trash, search, home} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory } from 'react-router';
import { getKeys } from '../localStorage';
import toast from '../toast';
import { useSelector } from 'react-redux';




const FarmersInfo: React.FC = () => {

  const history = useHistory();
  const { Storage } = Plugins;
  const[farmerKey, setKey] = useState()
  const storeFarmer = useSelector((state: any) => state.reduxStoreFarmer.farmer)
  const [storeKeys, setKeys] = useState()


  useIonViewWillEnter(() => {
    getStoreKeys()
  })
  useIonViewDidEnter(() => {
    getStoreKeys()
   /* queryFarmer()
    console.log('storeKeys>>', storeKeys)*/
  })
  

  async function getFarmersArr(storeKeys: any) {
    if (storeKeys > 0) {
      for(let elem of storeKeys) {
          console.log('elem>>', elem)
    }
  } 
}

 
  async function getStoreKeys(){
    getKeys().then( resArr => {
     setKeys(resArr)
    })
    await getFarmersArr(storeKeys);
  }


  async function queryFarmer(farmerKey:any) {
    await Storage.get({key: farmerKey})
    .then((res: any) =>{
      if (res.value){
        setFarmer(JSON.parse(res.value))
      }
    })
    console.log('storeKeys>>', storeKeys)
    await getFarmersArr(storeKeys)
  }


  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color='tertiary'>
          <IonTitle>View Mapped Farmers Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/*-- fab placed to the top end --*/}
        <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonFabButton color="tertiary">
                <IonIcon icon={home} title="Home" onClick={() => history.push('/searchfarmer')} />
              </IonFabButton>
            </IonFab>
      <IonGrid className='ion-padding'>
        <IonRow>
          <IonCol size='8'>
            <IonInput type='search' placeholder='BVN' className='search-input ion-padding'
              onIonChange={(e:any) => { setKey(e.target.value)}} />
          </IonCol>         
          <IonCol size='3'>
            <IonButton color='tertiary' className='search-btn-by' onClick={()=>  queryFarmer()}>
              <IonIcon icon={search}></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
        <IonList>
          {
          
          (storeFarmer && storeFarmer.verification_status ) ? (
          
            <IonItemSliding key={storeFarmer.bvn}>
              <IonItem>
              <IonAvatar>
                <img src={Avatar}/>
              </IonAvatar>
              <IonLabel className="ion-padding">
                <h2>{`${storeFarmer.f_name} ${storeFarmer.sname}`}</h2>
                <p>{`${storeFarmer.f_state} ${storeFarmer.f_lg}`} {storeFarmer.f_occupation}</p>
                <p>{`Verification Status: Verified`}</p>
              </IonLabel>
              <IonButton routerLink="/profile" color="tertiary">
                <IonIcon icon={create}></IonIcon>
              </IonButton>
              <IonButton color="success">
              <IonIcon icon={informationCircle}></IonIcon>
              </IonButton>
              </IonItem>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={() => toast('Pressed Delete', 3000)}>
                <IonIcon icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ) : 
          (<p>Search Again</p>)
         
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FarmersInfo;
