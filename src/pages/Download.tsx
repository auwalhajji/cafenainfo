import { IonContent, IonRow, IonButton, IonHeader, IonPage, IonTitle, 
        IonToolbar , IonCard, IonFab, IonFabButton, IonGrid, IonLabel,
        IonIcon, IonSelectOption, IonSelect, useIonViewDidEnter
} from '@ionic/react';
import { speedometer } from 'ionicons/icons';
import React, { useState } from 'react';
import { getFederalStates, getFarmersData, logoutUser } from '../firebaseConfig'
import './Main.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLocationData, setDocumentKeys } from '../redux/actions';
import { getKeys } from '../localStorage';
import toast from '../toast';

const Download: React.FC = () => {


  const [states, setStates] = useState('')
  const [lga, setLga] = useState('')
  //const [busy, setBusy] = useState(false)
  //const [statesData, setStatesData] = useState(getFederalStates())
  const [allStates, setAllStates] = useState(Object.keys(getFederalStates()))
  const dispatch = useDispatch()
 // const username = useSelector((state: any) => state.user.username)
  const reduxkeys = useSelector((state: any) => state.reduxStoreKeys.allKeys)  
  const history = useHistory();

  //states = getFederalStates();

  useIonViewDidEnter(() => {
    // Testing Existance of LocalStorage Keys
    getKeys().then( stK => {
      dispatch(setDocumentKeys(stK))
    })
  })
  

  
  function downloadData() {
    let resultres: any;
    // Validate required for state and lga
    if (states ==='' || lga ==='') {

      toast('All fields are required')

    } else {
      // Store the State and Lga to reduxStore
      dispatch(setLocationData({stat: states, lga: lga}))

      // Get all the LGAs data from firebase
      getFarmersData( states, lga ).then((value:any) =>{
        resultres = {...{value}}
        resultres = resultres.value;
        console.log(resultres)
        dispatch(setDocumentKeys(resultres))
        });

        // Delete After        
        console.log('KEYS>>>', reduxkeys)
        
        if (resultres) {
          console.log('DS returned array>>result>>>', resultres)
          getKeys();
        } else {
         // Re-rout to Capture Screen
          //history.push('/dashboard')
          toast("Data Downloaded Successfully");
        }
      }     
    }
  
  
      return (
          <IonPage>
            <IonHeader>
              <IonToolbar  color="tertiary">
                <IonTitle>Select Data</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
           {/*-- fab placed to the top end --*/}
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonFabButton color="tertiary">
                <IonIcon icon={speedometer} title="Home" onClick={() => history.goBack()} />
              </IonFabButton>
            </IonFab>
            
            <IonContent className="ion-padding text-center">
              <IonCard  className="ion-padding text-center">        
                <IonGrid>
                  <IonRow color="tertiary" className="ion-justify-content-between">
                    
                      <IonSelect color="tertiary" className="download-ion-selects" placeholder="Select State" onIonChange={(e: any) => setStates(e.target.value)}>
                        <IonLabel>Select State</IonLabel>
                          {/* Loop Through All States */}
                          { allStates.map(jaha =>
                            <IonSelectOption>{jaha}</IonSelectOption>
                            )}
                      </IonSelect>
                    
                  </IonRow>
                  <IonRow className="ion-justify-content-between">
                    
                      <IonSelect color="tertiary" placeholder="Select LGA" className="download-ion-selects" onIonChange={(e: any) => setLga(e.target.value)}>
                        <IonLabel>LGA</IonLabel>
                        <IonSelectOption value="Kwali">Kwali</IonSelectOption>
                        <IonSelectOption value="Katsina">Katsina</IonSelectOption>
                      </IonSelect>  
                    
                  </IonRow>
                  <IonRow className="ion-padding ion-justify-content-between text-center">
                      <IonButton fill="outline" color="tertiary" type="submit" className="card-round-btn" 
                          expand="block" onClick={downloadData}>
                        Download
                      </IonButton>
                    
                  </IonRow>
                </IonGrid>
              </IonCard>        
            </IonContent>
          
        </IonContent>
      </IonPage>
    );
      
};

export default Download;
