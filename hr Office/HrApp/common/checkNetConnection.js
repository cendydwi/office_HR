import { NetInfo,ToastAndroid } from 'react-native';

export const CheckConnection = {

    async isconnection(){
        if (await NetInfo.isConnected.fetch()){
            ToastAndroid.show('Connected', ToastAndroid.TOP);
        }
        else{
            ToastAndroid.show('Plese Connect the Internet', ToastAndroid.TOP);
        }
        
    }
    
}
