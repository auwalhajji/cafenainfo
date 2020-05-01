import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
    IonList, IonItem, IonAvatar, IonLabel, IonItemSliding, 
    IonItemOptions, IonItemOption, IonButton, IonIcon, 
    IonInput,IonGrid, IonRow, IonCol, useIonViewWillEnter, 
    useIonViewDidEnter, IonFab, IonFabButton, IonCard } from '@ionic/react';
import React, { useState } from 'react';
import './Main.css';
import Avatar from '../assets/img/avatar.png';
import {informationCircle, create, trash, search, home} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory, RouteComponentProps } from 'react-router';
import toast from '../toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setReduxStoreFarmer } from '../redux/actions';
  
  
  interface LoadedFarmersProps extends RouteComponentProps<{
    storageKeys: string;
  }>{}
  
  const LoadedFarmers: React.FC<LoadedFarmersProps> = ({match}) => {
  
    const history = useHistory();
    const dispatch = useDispatch()
    const { Storage } = Plugins;
    const[farmerKey, setKey] = useState()
    const [storeFarmer, setFarmer] = useState()
    //const [inStoreFarmers, setFarmers] = useState()
    //const [storeKeys, setKeys] = useState()
    //var storeKeys : any;
   // const [inStorageKeys, setKeySize] = useState(match.params.storageKeys.split(","))
    // keys from redux store
    const reduxKeys = useSelector((state: any) => state.reduxStoreKeys.allKeys)
    // farmer from redux store
    const reduxFarmersArr = useSelector((state: any) => state.reduxStoreFarmers.farmers)
  
  
    useIonViewWillEnter(() => {
      //getStoreKeys()
    })
    useIonViewDidEnter(() => {
        ///getFarmersArr()
    })
    
  
    
  
    return (
      <IonPage>
        <IonHeader >
          <IonToolbar color='tertiary'>
            <IonTitle className="text-center">View of Loaded Farmers</IonTitle>
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
          <IonCard>
            <IonRow>
              <IonCol size='8'>
                <IonInput type='search' placeholder='Enter BVN' className='search-input ion-padding'
                  onIonChange={(e:any) => { setKey(e.target.value)}} />
              </IonCol>         
              <IonCol size='3'>
                <IonButton color='tertiary' className='search-btn-by' onClick={() => toast('Yet to be implemented..') }>
                  <IonIcon icon={search}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCard>
        </IonGrid>
          <IonList>
          {            
            (reduxFarmersArr) ? (reduxFarmersArr.map((farmer:any) =>  (farmer.verification_status) ?
                (``)   : 
                (
                  <IonCard>   
                  <IonItemSliding key={farmer.bvn}>
                    <IonItem>
                      <IonAvatar>
                        <img src={Avatar}/>
                      </IonAvatar>
                      <IonLabel className="ion-padding">
                        <h2>{`${farmer.f_name} ${farmer.sname}`}</h2>
                        <p>{`${farmer.f_state} ${farmer.f_lg}`} {farmer.f_occupation}</p>
                        <p>{`Verification Status: Verified`}</p>
                      </IonLabel>
                      <IonButton onClick={ ()=> {history.replace(`/farmer/${farmer.bvn}`)}} color="tertiary">
                        <IonIcon icon={create}></IonIcon>
                      </IonButton>
                      <IonButton color="success" onClick={ () => { dispatch(setReduxStoreFarmer(farmer)); history.push(`/loaded`) }}>
                      <IonIcon icon={informationCircle}></IonIcon>
                      </IonButton>
                    </IonItem>
                    <IonItemOptions side="start">
                      <IonItemOption color="danger" onClick={() => toast('Pressed Delete', 3000)}>
                      <IonIcon icon={trash}></IonIcon>
                      </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
              </IonCard>
                )  )
              ) :
            (<p>No result</p>)
            }
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default LoadedFarmers;
  