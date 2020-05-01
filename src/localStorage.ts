import { Plugins } from '@capacitor/core'


const { Storage } = Plugins;

// Set Object to the Local Storage
export async function setObject(key: string, farmar: {}) {
    await Storage.set({
        key: key,
        value: JSON.stringify(farmar)
    })
}

// Get the Farmars
// get(options: { key: string }): Promise<{ value: any }>
export async function getObject(key: string) {   
    await Storage.get({key: key})
        .then((res: any) =>{
            const farmer = JSON.parse(res.value)
            return res.value;
        })
    //const farmers = JSON.parse(ret.value);
}

// Get All the Farmers in an Array
export async function getAllLocalStorageFarmers( keys:[]){
  const lsKeys = keys;
  let returnedFarmersArr : any = []
  let i = 0;

  // For each key get the farmer
  lsKeys.forEach( (lsKey:any) => {
    Storage.get({key: lsKey})
      .then( (result:any) => {
        returnedFarmersArr[i++] = {...JSON.parse(result.value)}
      })      
  })
  return returnedFarmersArr;
}

// Set Item to LS
// set(options: { key: string, value: string }): Promise<void>
export async function setItem(ky: string, value: {}) {
    await Storage.set({
      key: ky,
      value: JSON.stringify(value)
    });
  }

//Get Item from LS
export async function getItem(key: string) {
  let value: any
  value  = await Storage.get({ key: key });
  return true;
}

// Remove an Item from the LS
export async function removeItem() {
    await Storage.remove({ key: 'name' });
  }

// Get Keys from the LS
// keys(): Promise<{ keys: any }>
export async function getKeys() {
  let theKeys: any
    await Storage.keys().
    then(res => {
      theKeys = res.keys         
    });    
    return theKeys  
  }

// Clear the LS
export async function clearLS() {
    await Storage.clear();
  }
    

