import { IonContent, IonRow, IonCol, IonButton, IonHeader, IonPage, IonTitle, 
    IonToolbar , IonCard, IonFab, IonFabButton, IonGrid, IonLabel,
    IonCardHeader, IonItem, IonIcon, IonCardTitle, IonCardContent,
    IonSelectOption, IonSelect, IonList, IonLoading, useIonViewDidEnter, IonItemSliding, IonAvatar, IonItemOptions, IonItemOption
} from '@ionic/react';
import { create, home, informationCircle, trash } from 'ionicons/icons';
import React, { useState } from 'react';
import { getFederalStates, getFarmersData, logoutUser } from '../firebaseConfig'
import './Main.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { getKeys } from '../localStorage';
import toast from '../toast';
import Avatar from '../assets/img/avatar.png';


const DataAnalysis: React.FC = () => {


const [totalFarmer, setTotalFarmer] = useState()
const currentstate = useSelector((state: any) => state.locationData.statex)
const currentlga = useSelector((state: any) => state.locationData.lgax)
const [busy, setBusy] = useState(false)
const history = useHistory();


useIonViewDidEnter(()=>{
    getKeys().then( (stK:any)=>{
        setTotalFarmer(stK.length)
    })
})


  return (
      <IonPage>
        <IonHeader>
          <IonToolbar  color="tertiary">
            <IonTitle className="text-center">Record Analysis</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
       {/*-- fab placed to the top end --*/}
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton color="tertiary">
            <IonIcon icon={home} title="Home" onClick={() => history.replace('/searchfarmer')} />
          </IonFabButton>
        </IonFab>
        
        <IonContent className="ion-padding text-center">
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <IonCard>
                            <IonCardHeader>Commulative Data</IonCardHeader>   
                            <IonItemSliding key={1}>
                                <IonItem>
                                <IonAvatar>
                                    <img src={Avatar}/>
                                </IonAvatar>
                                <IonLabel className="ion-padding">
                                    <h2>{`State: ${currentstate}`}</h2>
                                    <h2>{`LGA: ${currentlga}`}</h2>
                                    <p>{`Total Farmers: ${totalFarmer}`}</p>
                                    <p>{`Verification Status: Not Verified`}</p>
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
                        </IonCard>
                    </IonCol> {/** End Col */}
                    <IonCol size="6">
                        <IonCard>
                            <IonCardHeader>Commulative Data</IonCardHeader>   
                            <IonItemSliding key={1}>
                                <IonItem>
                                <IonAvatar>
                                    <img src={Avatar}/>
                                </IonAvatar>
                                <IonLabel className="ion-padding">
                                    <h2>{`State: ${currentstate}`}</h2>
                                    <h2>{`LGA: ${currentlga}`}</h2>
                                    <p>{`Total Farmers: ${totalFarmer}`}</p>
                                    <p>{`Verification Status: Not Verified`}</p>
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
                        </IonCard>
                    </IonCol> {/** End Col */}
                </IonRow> {/** End Row */}

                <IonRow>
                <IonCol size="6">
                        <IonCard>
                            <IonCardHeader>Commulative Data</IonCardHeader>   
                            <IonItemSliding key={1}>
                                <IonItem>
                                <IonAvatar>
                                    <img src={Avatar}/>
                                </IonAvatar>
                                <IonLabel className="ion-padding">
                                    <h2>{`State: ${currentstate}`}</h2>
                                    <h2>{`LGA: ${currentlga}`}</h2>
                                    <p>{`Total Farmers: ${totalFarmer}`}</p>
                                    <p>{`Verification Status: Not Verified`}</p>
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
                        </IonCard>
                    </IonCol> {/** End Col */}
                    <IonCol size="6">
                        <IonCard>
                            <IonCardHeader>Commulative Data</IonCardHeader>   
                            <IonItemSliding key={1}>
                                <IonItem>
                                <IonAvatar>
                                    <img src={Avatar}/>
                                </IonAvatar>
                                <IonLabel className="ion-padding">
                                    <h2>{`State: ${currentstate}`}</h2>
                                    <h2>{`LGA: ${currentlga}`}</h2>
                                    <p>{`Total Farmers: ${totalFarmer}`}</p>
                                    <p>{`Verification Status: Not Verified`}</p>
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
                        </IonCard>
                    </IonCol> {/** End Col */}
                </IonRow> {/** End Row */}
            </IonGrid>
            {/** End Card */}
        </IonContent>      
    </IonContent>
  </IonPage>
);
  
};

export default DataAnalysis;
