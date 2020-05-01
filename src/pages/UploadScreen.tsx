import { IonContent, IonRow, 
    IonCol, IonButton, 
    IonHeader, IonPage, IonTitle, 
    IonToolbar , IonFab, 
    IonInput, IonGrid, IonFabButton,
    IonIcon, IonItem,  
   IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg
  } from '@ionic/react';
import { arrowBack, navigate, camera } from 'ionicons/icons';
import { useHistory, RouteComponentProps } from 'react-router';
import { Plugins, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core'
import React, { useState } from 'react';
import './Main.css';






interface UploadScreenProps extends RouteComponentProps<{
    bvn: string;
  }>{}
  
  const UploadScreen: React.FC<UploadScreenProps> = ({match}) => {
    
    const { Camera } = Plugins;
    const { Geolocation } = Plugins;
    const history = useHistory();
    const [bvn, setBvn] = useState(match.params.bvn);
    const [lng, setLng] = useState();
    const [lat, setLat] = useState();
    const [farmerImageSrc, setFarmerImageSrc] = useState()
    const [farmImageSrc, setFarmImageSrc] = useState()



    
    async function getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition()
            .then(res => {
                console.log('LNG ', res.coords.longitude)
                setLng(res.coords.longitude)
                console.log('LAT ', res.coords.latitude)
                setLat(res.coords.latitude)
                console.log('ALT ', res.coords.altitude)
            }).catch(error => {
                console.log('Error Getting Current Location: ', error);
            })
        
      }

      async function takeFarmPicture() {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Uri, 
            source: CameraSource.Camera,
            quality: 100 
        });
        // image.webPath will contain a path that can be set as an image src. 
        // You can access the original file using image.path, which can be 
        // passed to the Filesystem API to read the raw data of the image, 
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        var imageUrl = image.webPath;
        setFarmImageSrc(imageUrl)        
      }

      async function takeFarmerPicture() {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Uri, 
            source: CameraSource.Camera,
            quality: 100 
        });
        // image.webPath will contain a path that can be set as an image src. 
        // You can access the original file using image.path, which can be 
        // passed to the Filesystem API to read the raw data of the image, 
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        var imageUrl = image.webPath;
        setFarmerImageSrc(imageUrl)        
      }
    
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle className="text-center">Farmer/Farm File Uploads</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton >
          <IonIcon icon={arrowBack} title="go back" onClick={() => {history.push(`/farm/${bvn}`)}}  />
        </IonFabButton>
      </IonFab>    
      <IonContent>  
        
          <IonContent>
            <IonCard className="text-center">
                <IonGrid  className="justify-content-center">                           
                    <IonList>            
                        <IonRow color="primary" className="ion-padding-top ion-justify-content-between">
                            <IonCol offset="1" className="ion-padding-top offset-3" size="4"> 
                                <IonItem>                      
                                    <IonInput placeholder="Longitude" name="longit" contentEditable={false}>{lng}</IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol offset="1" className="ion-padding-top offset-3" size="4"> 
                                <IonItem>
                                    <IonInput placeholder="Latitude" name="latit" contentEditable={false}>{lat}</IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol className="ion-padding-top offset-3" size="2"> 
                            <IonFabButton >
                                <IonIcon icon={navigate} title="get location" onClick={() =>{getCurrentPosition()} }  />
                            </IonFabButton> 
                            </IonCol>
                        </IonRow>                        
                    </IonList>

                    <IonList>            
                        <IonRow color="primary" className="ion-padding-top ion-justify-content-between">
                            <IonCol offset="1" className="ion-padding-top offset-3" size="4"> 
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Farmer's Image</IonCardTitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        <IonImg src={farmerImageSrc} />
                                    </IonCardContent>
                                        <IonFabButton onClick={() => takeFarmerPicture()}>
                                            <IonIcon icon={camera} title="Snap Farmer" />
                                        </IonFabButton>
                                </IonCard>
                            </IonCol>
                            <IonCol offset="1" className="ion-padding-top offset-3" size="4"> 
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Farm's Image</IonCardTitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        <IonImg src={farmImageSrc} />
                                    </IonCardContent>
                                    <IonFabButton onClick={() => takeFarmPicture()}>
                                        <IonIcon icon={camera} title="Snap Farm" />
                                    </IonFabButton>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow color="primary" className="ion-padding-bottom ion-justify-content-between">
                            <IonCol offset="8" size="2" className="text-center" >                                          
                                <IonButton className="round-btn" type="submit" size="large" expand="block" 
                                    onClick={()=>{history.push(`/farmersinfo`)}}>Submit</IonButton>                    
                            </IonCol>                  
                        </IonRow>
                    </IonList>     
                </IonGrid>
            </IonCard>
          </IonContent>    
      
      </IonContent>
      
    </IonContent>
  </IonPage>
     );
  };
  
  export default UploadScreen;
  