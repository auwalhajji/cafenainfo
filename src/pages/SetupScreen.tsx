import { IonContent, IonRow, IonCardSubtitle,
    IonCol, IonButton, IonModal, IonCardTitle,
    IonHeader, IonPage, IonTitle, IonCardContent,
    IonToolbar , IonFab, IonLabel, useIonViewDidEnter,
    IonInput, IonGrid, IonFabButton,
    IonIcon, IonCard, IonImg, IonCardHeader,  IonList, IonItem, IonAvatar
  } from '@ionic/react';
import { speedometer, cloudDownload, cloudUpload, trash } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import './Main.css';
import { getKeys, getAllLocalStorageFarmers } from '../localStorage';
import toast from '../toast';
import farming from '../images/farming.jpg';
import harvest from '../images/harvest.jpg';
import chart from '../images/chart.jpg';
import { setDocumentKeys, setReduxStoreFarmers } from '../redux/actions';
  
const SearchFarmer: React.FC = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [bvn, setBvn] = useState('');
    const [storeKeys, setKeys] = useState();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const reduxKeys = useSelector((state: any) => state.reduxStoreKeys.allKeys)
    

    useIonViewDidEnter( () => {
      getFarmer()
    })


// Get the Farmer from Local Storage and Navigate
async function queryFarmer() {
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

    

    
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar  color="tertiary">
            <IonTitle className="text-center">Setting Up Application</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton color="tertiary" >
          <IonIcon icon={speedometer} title="go to dashboard" onClick={ () =>{ history.push('/dashboard')} }  />
        </IonFabButton>
      </IonFab>  
      <IonContent className="ion-padding text-center">
      
        {/*   */}
        <IonCard  className="ion-padding text-center">
          <IonCardHeader>
            <IonCardTitle color="danger"> <div className="section text-center">Download Farmers Data</div></IonCardTitle>             
          </IonCardHeader>
          <IonCardContent>
            <IonIcon className="ion-icons" icon={cloudDownload} onClick={()=>history.push('/download')}></IonIcon>
            <IonButton fill="outline" slot="end"  color="tertiary" type="submit" className='card-round-btn' onClick={() => history.push(`/download`)}>
            Download
            </IonButton>
          </IonCardContent>            
        </IonCard> 
        {/*   */}
        <IonCard  className="ion-padding text-center">
          <IonCardHeader>
            <IonCardTitle color="danger"> <div className="section text-center">Upload Mapped Farmers Data</div></IonCardTitle>         
          </IonCardHeader>
          <IonCardContent>
            <IonIcon className="ion-icons" icon={cloudUpload} onClick={()=>history.push('/upload')}></IonIcon>
            <IonModal isOpen={showUploadModal}>
                <p className='padding section'>This is a delete modal content</p>
                <IonButton color="tertiary" onClick={() => setShowUploadModal(false)}>Cancel</IonButton>
            </IonModal>
            <IonButton fill="outline" slot="end"  color="tertiary" type="submit" className='card-round-btn'  onClick={() => setShowUploadModal(true)}>
            Upload
            </IonButton>
          </IonCardContent>            
        </IonCard>  
        {/*   */}
        <IonCard  className="ion-padding text-center">
          <IonCardHeader>
            <IonCardTitle color="danger"> <div className="section text-center">Clear All Farmers Data</div></IonCardTitle>          
          </IonCardHeader>
          <IonCardContent>
            <IonIcon className="ion-icons" icon={trash} onClick={()=>history.push('/clear')}></IonIcon>
            <IonModal isOpen={showClearModal}>
                <p className='padding section'>This is a clear modal content</p>
                <IonButton color="tertiary" onClick={() => setShowClearModal(false)}>Cancel</IonButton>
            </IonModal>
            <IonButton fill="outline" slot="end"  color="tertiary" type="submit" className='card-round-btn' onClick={() => setShowClearModal(true)}>
            Clear
            </IonButton>
          </IonCardContent>            
        </IonCard>              
      </IonContent>
    </IonContent>
  </IonPage>
     );
  };
  
  export default SearchFarmer;
  