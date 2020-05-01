import { IonContent, IonRow, IonCol, IonButton, IonHeader, IonPage, IonTitle, IonImg,
  IonToolbar , IonFab, IonInput, IonGrid, IonIcon,   IonFabButton, IonCardHeader,
  useIonViewDidEnter, useIonViewWillEnter, IonLabel, IonItem, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, 
} from '@ionic/react';
import { arrowBack, camera, navigate } from 'ionicons/icons';
import { useHistory, RouteComponentProps } from 'react-router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import React, { useState } from 'react';
import './Main.css';
import toast from '../toast';
import { setObject } from '../localStorage';


const { Storage } = Plugins;
interface FarmCaptureProps extends RouteComponentProps<{
  bvn: string;
}>{}

const FarmCapture: React.FC<FarmCaptureProps> = ({match}) => {
  const { Camera } = Plugins;
  const { Geolocation } = Plugins;
  const history = useHistory();
  const [farmer, setFarmer] = useState()
  const [bvn, setBvn] = useState(match.params.bvn)
  const [id_issue_date, setIdissuedate] = useState()
  const [nok_name, setNokname] = useState()
  const [nok_address, setNokaddress] = useState()
  const [nok_phone, setNokphone] = useState()
  const [guar_name, setGuarname] = useState()
  const [guar_address, setGuaraddress] = useState()
  const [guar_phone, setGuarphone] = useState()
  const [guar_email, setGuaremail] = useState()
  const [registra, setRegistra] = useState()
  const [farm_topology, setFarmtopology] = useState()
  const [farm_soil_type, setFarmsoiltype] = useState()
  const [crop, setCrop] = useState()
  const [farm_loc, setFarmloc] = useState()
  const [farm_size, setFarmsize] = useState()
  const [lat, setLatitude] = useState()
  const [lon, setLongitude] = useState()
  const [verification_status, setVerificationstatus] = useState()
  const [farm_ownership, setFarmownership] = useState()
  const [verif_date, setVerificationdate] = useState()
  const [center_point, setcenterPoint] = useState()
  const [center_point_preci, setPrecision] = useState()
  const [alt, setAltitude] = useState()
  const [photo_path, setPhotopath] = useState()
  const [photo_farm_path, setFarmphotopath] = useState()
  const [photo_face_farm_path, setFarmerphotopath] = useState()
  
 
 
   
    
    useIonViewWillEnter(() => {
      console.log('ionViewWillEnter event fired');
      getCurrentFarmer(bvn)
    });
    useIonViewDidEnter(() => {
      console.log('ionViewDidEnter event fired');
      getCurrentFarmer(bvn)
    });

    function validateInputs(){
      if ((nok_name === "") || (nok_address === "") || (nok_phone === "")
           || (guar_name === "") || (guar_address === "") || (guar_phone === "") 
           || (guar_email === "") || (registra === "") || (farm_topology === "") 
           || (farm_soil_type === "") || (crop === "") || (farm_loc === "")) {
          
          toast('All iput fields are required', 4000);
          console.log('All input filds are required')
      } else {
        console.log('All input filds were entered')
       var tempFarmer = {
        nok_name: nok_name,
        nok_address: nok_address,
        farm_loc: farm_loc,
        farm_soil_type: farm_soil_type,
        nok_phone: nok_phone,
        crop: crop,
        guar_name: guar_name,
        guar_address: guar_address,
        guar_phone: guar_phone,
        guar_email: guar_email,
        farm_topology: farm_topology,
        farm_size: farm_size,
        verification_status: true,
        farm_ownership: farm_ownership,
        verif_date: verif_date
       }
        /*farmer.nok_name = nok_name;
        farmer.nok_address = nok_address
        farmer.farm_loc = farm_loc
        farmer.farm_soil_type = farm_soil_type
        farmer.nok_phone = nok_phone
        farmer.crop = crop
        farmer.guar_name = guar_name
        farmer.guar_address = guar_address
        farmer.guar_phone = guar_phone
        farmer.guar_email = guar_email
        farmer.farm_topology = farm_topology
        farmer.farm_size = farm_size
        farmer.verification_status = true
        farmer.farm_ownership = farm_ownership
        farmer.verif_date = verif_date*/

        // Now update the storage farmer updateFarmer        
        setObject(bvn, tempFarmer)
        // Navigate to new capture
        console.log('LOOK',photo_farm_path)
        history.replace('/searchfarmer')
        toast('Farmers Record Saved Successfully')

      }
     // 
    }
    

   async function getCurrentFarmer(key: string) {
    await Storage.get({key: key})
    .then((res: any) => {
        setFarmer(JSON.parse(res.value))       
    })
     console.log('newFarmer>>>', farmer)
    }



    async function getCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition()
          .then((res:any) => {
              console.log('LNG ', res.coords.longitude)
              setLongitude(res.coords.longitude)
              console.log('LAT ', res.coords.latitude)
              setLatitude(res.coords.latitude)
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
      var imageUrl:any = image.webPath;
      setFarmphotopath(imageUrl)        
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
      var imageUrl:any = image.webPath;
      setFarmerphotopath(imageUrl)        
    }

    

   
return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle className="text-center">Data Capture</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonFab vertical="top" horizontal="end" slot="fixed">
      <IonFabButton color="tertiary" >
        <IonIcon icon={arrowBack} title="go back" onClick={ () => history.replace(`/farmer/${bvn}`) }  />
      </IonFabButton>
    </IonFab>
      <IonCard>
        <div id="container">
          <div className="section text-center">...continuation</div>
            <IonGrid  className="justify-content-center">
                <IonRow color="primary" className="ion-padding ion-justify-content-between">
                  <IonCol  size="6" >
                    <IonItem>
                      <IonLabel position="floating">Nok Name</IonLabel>
                      <IonInput className="text-center" contentEditable={true} required
                      onIonChange={(e: any) => setNokname(e.target.value)} />
                    </IonItem>
                  </IonCol>
                  <IonCol className="" size="6" >
                    <IonItem>
                      <IonLabel position="floating">NoK Address</IonLabel>
                      <IonInput className="text-center" onIonChange={(e: any) => setNokaddress(e.target.value)} />
                    </IonItem>
                  </IonCol>
                </IonRow> 

                <IonRow color="primary" className="ion-padding ion-justify-content-between">
                  <IonCol className="" size="6" >
                    <IonItem>
                      <IonLabel position="floating">Farm Location</IonLabel>
                      <IonInput type="text" className="text-center" contentEditable={true}
                        onIonChange={(e:any) => { setFarmloc(e.target.value)}}/>
                    </IonItem>    
                  </IonCol>
                  <IonCol className="" size="6" >
                    <IonItem>
                      <IonLabel position="floating">Crop</IonLabel>
                      <IonInput  type="text" 
                      onIonChange={(e: any) => setCrop(e.target.value)}/>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow color="primary" className="ion-padding ion-justify-content-between">
                  <IonCol className="" size="6">
                    <IonItem>
                      <IonLabel position="floating">Soil Type</IonLabel>
                      <IonInput className="ion-select"
                        onIonChange={(e: any) => setFarmsoiltype(e.target.value)}/>
                    </IonItem>
                  </IonCol>
                  <IonCol className="" size="6" >
                    <IonItem>
                      <IonLabel position="floating">Farm Topology</IonLabel>
                      <IonInput type="text"  
                       onIonChange={(e: any) => setFarmtopology(e.target.value)} />
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow color="primary" className="ion-padding ion-justify-content-between">
                  <IonCol className="" size="6">
                    <IonItem>
                      <IonLabel position="floating">Farm Size</IonLabel>
                      <IonInput type="text" 
                          onIonChange={(e: any) => setFarmsize(e.target.value)} />
                    </IonItem>
                  </IonCol>
                  <IonCol className="" size="6" >
                    <IonItem>
                      <IonLabel position="floating">Verification Date</IonLabel>
                      <IonInput type="date" 
                          onIonChange={(e: any) => setVerificationdate(e.target.value)} />
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow color="primary" className="ion-padding ion-justify-content-between">                  
                  <IonCol className="" size="6" >
                    <IonItem>
                      <IonLabel position="floating">Latitude</IonLabel>
                      <IonInput name="lga_origin" type="text">
                        {lat}
                      </IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol className="" size="6" >
                    <IonItem>
                      <IonLabel position="floating">Longitude</IonLabel>
                      <IonInput name="state_origin" type="text">
                        {lon}
                      </IonInput>                      
                    </IonItem>
                      <IonFabButton color="tertiary">
                        <IonIcon icon={navigate} title="get location" onClick={() =>{getCurrentPosition()} }  />
                      </IonFabButton>
                  </IonCol>
                </IonRow>

                <IonRow color="primary" className="ion-padding ion-justify-content-between">
                  <IonCol className="" size="6" >
                    <IonItem>
                        <IonCard>
                          <IonCardHeader>
                              <IonCardSubtitle>Farmer's Image</IonCardSubtitle>
                          </IonCardHeader>

                          <IonCardContent>
                              <IonImg src={photo_face_farm_path} />
                          </IonCardContent>
                              <IonFabButton color="tertiary" onClick={() => takeFarmerPicture()}>
                                  <IonIcon icon={camera} title="Snap Farmer" />
                              </IonFabButton>
                      </IonCard>
                    </IonItem>
                  </IonCol>
                  <IonCol className="" size="6" >
                    <IonItem>
                        <IonCard>
                          <IonCardHeader>
                              <IonCardSubtitle>Farm's Image</IonCardSubtitle>
                          </IonCardHeader>

                          <IonCardContent>
                              <IonImg src={photo_farm_path} />
                          </IonCardContent>
                          <IonFabButton color="tertiary" onClick={() => takeFarmPicture()}>
                              <IonIcon icon={camera} title="Snap Farm" />
                          </IonFabButton>
                      </IonCard>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow color="primary" className="ion-padding ion-justify-content-between">
                <IonButton  color="tertiary" fill="outline" className="round-btn" type="submit" 
                    expand="block" onClick={validateInputs}>Submit</IonButton>
                </IonRow>                
                
            </IonGrid>
        </div> 
      </IonCard>
  </IonContent>
</IonPage>
   );
};

export default FarmCapture;
