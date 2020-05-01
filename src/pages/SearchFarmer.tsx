import { IonContent, IonRow, IonCardSubtitle,
    IonCol, IonButton, IonModal, IonCardTitle,
    IonHeader, IonPage, IonTitle, IonCardContent,
    IonToolbar , IonFab, IonLabel, useIonViewDidEnter,
    IonInput, IonGrid, IonFabButton,
    IonIcon, IonCard, IonImg, IonCardHeader,  IonList, IonItem, IonAvatar
  } from '@ionic/react';
import { speedometer, search, pieChart } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import './Main.css';
import { getKeys, getAllLocalStorageFarmers } from '../localStorage';
import toast from '../toast';
import farming from '../images/farming.jpg';
import harvest from '../images/harvest.jpg';
import chart from '../images/chart.jpg';
import { setDocumentKeys, setReduxStoreFarmers, setReduxStoreFarmer } from '../redux/actions';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const SearchFarmer: React.FC = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [bvn, setBvn] = useState('');
    const [storeKeys, setKeys] = useState();
    const [showModal, setShowModal] = useState(false);
    
    const reduxFarmer = useSelector((state: any) => state.reduxStoreFarmer.farmer)
    const reduxKeys = useSelector((state: any) => state.reduxStoreKeys.allKeys);
    const [farmer, setFarmer] = useState()

    useIonViewDidEnter( () => {
      getFarmer()
    })


// Get the Farmer from Local Storage and Navigate
async function checkFarmer() {
  let keys: any
  getKeys().then((reskeys:any) => {
    keys = reskeys
    setKeys(reskeys)
    
    // Search for the farmer from local cache
    keys.forEach((elem:any) => {      
      // When the farmer exist
      if (elem === bvn) {
        toast(`Farmer (${bvn}) Fetched Successfully`, 3000)
        // Re-rout to Next Screen
        history.replace(`/farmer/${bvn}`)
      } else {
        // When farmer does not exist in local cache
        toast(`Farmer (${bvn}) Does not Exist`, 3000)
      }
    }) // end forEach
   
  }) // End Promise  
}

     
// Get the Farmer from Local Storage
async function getFarmer() {
  let keys: any
  getKeys().then((reskeys:any) => {
    keys = reskeys
    dispatch(setDocumentKeys(keys))
    getAllLocalStorageFarmers(keys).then( (farmers:any) => {
      dispatch(setReduxStoreFarmers(farmers))
    })
    setKeys(reskeys)
  }) // End Promise
}
async function getCurrentFarmer(key: string) {
  await Storage.get({key: key})
  .then((res: any) =>{
    dispatch(setReduxStoreFarmer(res.value))
      setFarmer(JSON.parse(res.value))       
  })
   console.log('newFarmer>>>', farmer)
   console.log('reduxFarmer>>>', reduxFarmer)
  }

    

    
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar  color="tertiary">
            <IonTitle className="text-center">Search Farmers Data</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton color="tertiary" >
          <IonIcon icon={speedometer} title="go to dashboard" onClick={ () =>{ history.push('/dashboard')} }  />
        </IonFabButton>
      </IonFab>  
      <IonContent className="ion-padding text-center">
      <IonCard  className="ion-padding text-center">
          <IonCardHeader>
            <IonCardTitle color="tertiary">Know Your Farmer</IonCardTitle>
            <IonCardSubtitle color="success">Verify Farmer By BVN</IonCardSubtitle>            
          </IonCardHeader>
      <IonCardContent>      
        <IonGrid>
          <IonRow color="tertiary">
            <IonCol offset="2" size="6">
              <IonInput size={40} type="search" className="search-input" 
                placeholder="Enter BVN" onIonChange={(e: any) => setBvn(e.target.value)}>
              </IonInput>
            </IonCol>
            <IonCol size="3">
            <IonButton  color="tertiary" type="submit" className='search-btn-by' onClick={() => {getCurrentFarmer(bvn); checkFarmer()}}>
              <IonIcon icon={search}></IonIcon>
            </IonButton>
            </IonCol>
          </IonRow> 
        </IonGrid>
        </IonCardContent>
        </IonCard> 
        {/*   */}
        <IonCard  className="ion-padding text-center">
          <IonCardHeader>
            <IonCardTitle color="tertiary">Dowloaded/Unmapped Farmers</IonCardTitle>
            <IonCardSubtitle color="success">Farmers to be Captured</IonCardSubtitle>            
          </IonCardHeader>
          <IonCardContent>
            <IonImg src={farming} />
            <IonButton fill="outline" slot="end"  color="tertiary" type="submit" className='card-round-btn' onClick={() => history.push(`/loadedfarmers/${storeKeys}`)}>
              View
            </IonButton>
          </IonCardContent>            
        </IonCard> 
        {/*   */}
        <IonCard  className="ion-padding text-center">
          <IonCardHeader>
            <IonCardTitle color="tertiary">Captured Farmers</IonCardTitle>
            <IonCardSubtitle color="success">Verified Farmers</IonCardSubtitle>            
          </IonCardHeader>
          <IonCardContent>
            <IonImg src={harvest} />
            <IonButton fill="outline" slot="end"  color="tertiary" type="submit" className='card-round-btn' onClick={() => history.push(`/mappedfarmers/${storeKeys}`)}>
              View
            </IonButton>
          </IonCardContent>            
        </IonCard> 
        {/*   */}
        <IonCard  className="ion-padding text-center">
          <IonCardHeader>
            <IonCardTitle color="tertiary">Overall Statistics</IonCardTitle>
            <IonCardSubtitle color="success">Data Summary</IonCardSubtitle>            
          </IonCardHeader>
          <IonCardContent>
            <IonImg src={chart} />
              <IonCard>
                <IonModal isOpen={showModal}>
                  <IonList>
                    <IonItem>
                      <IonAvatar>
                      <IonIcon icon={pieChart} className="ion-icons-small"></IonIcon>
                      </IonAvatar>
                      <IonLabel>
                        <h2>This is modal content</h2>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        <h1>{`Total Farmers:  ${20 + 65}`}</h1>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                      <h1>{`Total Mapped Farmers:  ${20 + 65}`}</h1>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                      <h1>{`Total Uploaded Farmers:  ${20 + 65}`}</h1>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                  <IonButton color="tertiary" onClick={() => setShowModal(false)}>Close</IonButton>
                </IonModal>
              </IonCard>
            <IonButton fill="outline" slot="end"  color="tertiary" type="submit" className='card-round-btn' onClick={() => setShowModal(true)}>
              View
            </IonButton>
          </IonCardContent>            
        </IonCard> 
      </IonContent>
    </IonContent>
  </IonPage>
     );
  };
  
  export default SearchFarmer;
  