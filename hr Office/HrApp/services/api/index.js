import { AsyncStorage, NetInfo,ToastAndroid } from "react-native";
import _ from "lodash";
import apiConfig from "./config";
import {CheckConnection} from '../../common/checkNetConnection'

export const getApi = async (action, headers = {}) => {
  
  try {
    if (await NetInfo.isConnected.fetch()){
    const userToken = await AsyncStorage.getItem("userToken");
    console.log('UserToker:',userToken);
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `bearer ${userToken}`
            }
          : {
              "Client-ID": apiConfig.clientId
            }),
        ...headers,
        ...{
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      },
      item => !_.isEmpty(item)
    );
    console.log(`getApi url: ${apiConfig.url}${action}`);
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: "GET",
      headers: requestHeaders
    });
    // console.log(response,'text phone number.........');
    if (response.ok) {
      let responseJson = await response.json();
      return { result: responseJson, isSuccess: true, message: "" };
    }
    return { result: null, isSuccess: false, message: response.statusText };
  }else{
    ToastAndroid.show('Please Connect to Internet', ToastAndroid.TOP);
  }
  } 
  catch (error) {
    console.error(error);
    return { result: null, isSuccess: false, message: error };
  
  }

}



export const postApi = async (action, headers = {}, body = {}) => {
  try {
    if (await NetInfo.isConnected.fetch()){
    console.log(`body: ${body}`);
    const userToken = await AsyncStorage.getItem("userToken");
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `bearer ${userToken}`
            }
          : {
              "Client-ID": apiConfig.clientId
            }),
        ...headers,
        ...{
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      },
      item => !_.isEmpty(item)
    );
    console.log(`postApi url: ${apiConfig.url}${action}`);
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(body)
    });

    console.log("response",response);

    let responseJson = await response.json();
    console.log("responseJson",responseJson);
     if (response.ok) {
      return { result: responseJson, isSuccess: true, message: "" };
    }
    return { result: null, isSuccess: false, message: "" };
  }else{
    ToastAndroid.show('Please Connect to Internet', ToastAndroid.TOP);
  }
  } catch (error) {
    console.error(error);
    return { result: null, isSuccess: false, message: error };
  }
};


// export const postApi = async (action, headers = {}, body = {}) => {
//   try {
//     console.log(`body: ${body}`);
//     const userToken = await AsyncStorage.getItem("userToken");
//     let requestHeaders = _.pickBy(
//       {
//         ...(userToken
//           ? {
//               Authorization: `Bearer ${userToken}`
//             }
//           : {
//               "Client-ID": apiConfig.clientId
//             }),
//         ...headers,
//         ...{
//           "Content-Type": "application/json"
//         }
//       },
//       item => !_.isEmpty(item)
//     );
//     var object = {
//       method: 'POST',
//       headers:requestHeaders,
//       body:body
//   };
//     console.log(`postApi url: ${apiConfig.url}${action}`);
//     console.log(`postApi body`,object);
//     let response = await fetch(`${apiConfig.url}${action}`, object);
//     let responseJson = await response.json();
//     console.log("responseJson",responseJson);
//      if (response.ok) {
//       return { result: responseJson, isSuccess: true, message: "" };
//     }
//     return { result: null, isSuccess: false, message: "" };
//   } catch (error) {
//     console.error(error);
//     return { result: null, isSuccess: false, message: error };
//   }
// };
export const loginPostApi = async (action, headers = {}, body = {}) => {
  try {
    if (await NetInfo.isConnected.fetch()){
    console.log(`body: ${body}`);

    if(await !NetInfo.isConnected.fetch()){  
      alert("test...");
      // this.setState({alertHeading:"Invalid Phonenumber!"})
      throw "Please Connect Internet";
      
  }
    const userToken = await AsyncStorage.getItem("userToken");
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`
            }
          : {
              "Client-ID": apiConfig.clientId
            }),
        ...headers,
        ...{
          // "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      item => !_.isEmpty(item)
    );
    console.log(`postApi url: ${apiConfig.url}${action}`);
    console.log(`postApi body`, "userName=" + encodeURIComponent(body.UserName) +
    "&password=" + encodeURIComponent(body.Password) +
    "&grant_type=password");
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: "POST",
      headers: requestHeaders,
      body: "UserName=" + encodeURIComponent(body.UserName) +
      "&Password=" + encodeURIComponent(body.Password) +
      "&grant_type=password",
    });

console.log
    let responseJson = await response.json();
    console.log("responseJson",responseJson);
     if (response.ok) {
      return { result: responseJson, isSuccess: true, message: "" };
    }
    return { result: null, isSuccess: false, message: "" };
  }else{
    ToastAndroid.show('Please Connect to Internet', ToastAndroid.TOP);
  }
  } catch (error) {
    console.error(error);
    return { result: null, isSuccess: false, message: error };
  }
};

export const postApiFormDataForPDF = async (
  action,
  headers = {},
  keyValue = {},
  uri = "",
  fileType = "",
  fileName = ""
) => {
  try {
    if (await NetInfo.isConnected.fetch()){
     const userToken = await AsyncStorage.getItem("userToken");
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`
            }
          : {
              "Client-ID": apiConfig.clientId
            }),
        ...headers,
        ...{
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      },
      item => !_.isEmpty(item)
    );

    var formData = new FormData();
    //Fields in the post
    formData.append(keyValue.key, keyValue.Value);
    // pictureSource is object containing image data.

    if (uri) {
      var document = {
        uri: uri,
        type: 'document/pdf',
        name: 'files.pdf'
      };
      formData.append("files", document);
    }

    console.log(`${apiConfig.url}${action}`);
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: "POST",
      headers: requestHeaders,
      body: formData
    });
    let responseJson = await response.json();
    return { result: responseJson, isSuccess: true, message: "" };
  }else{
    ToastAndroid.show('Please Connect to Internet', ToastAndroid.TOP);
  }
  } catch (error) {
    console.error(error);
    return { result: null, isSuccess: false, message: error };
  }
};
export const postApiFormData = async (
  action,
  headers = {},
  keyValue = {},
  uri = "",
  fileType = "",
  fileName = ""
) => {
  try {
    if (await NetInfo.isConnected.fetch()){
    const userToken = await AsyncStorage.getItem("userToken");
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`
            }
          : {
              "Client-ID": apiConfig.clientId
            }),
        ...headers,
        ...{
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      },
      item => !_.isEmpty(item)
    );

    var formData = new FormData();
    // Fields in the post
    formData.append(keyValue.key, keyValue.Value);

    // pictureSource is object containing image data.

    if (uri) {
      var photo = {
        uri: uri,
        type: fileType,
        name: fileName
      };
      formData.append("files", photo);
    }

    console.log(`${apiConfig.url}${action}`);
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: "POST",
      headers: requestHeaders,
      body: formData
    });

    if (response.ok) {
      let responseJson = await response.json();
      return { result: responseJson, isSuccess: true, message: "" };
    }
    return { result: null, isSuccess: false, message: response.statusText };
  }else{
    ToastAndroid.show('Please Connect to Internet', ToastAndroid.TOP);
  }
  } catch (error) {
    console.error(error);
    return { result: null, isSuccess: false, message: error };
  }
};

export const deleteApi = async (action, headers = {}) => {
  try {
    if (await NetInfo.isConnected.fetch()){
    const userToken = await AsyncStorage.getItem("userToken");
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `bearer ${userToken}`
            }
          : {
              "Client-ID": apiConfig.clientId
            }),
        ...headers,
        ...{
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      },
      item => !_.isEmpty(item)
    );

    console.log(`${apiConfig.url}${action}`);
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: "DELETE",
      headers: requestHeaders
    });
console.log(response,'..........................')
    if (response.ok) {
      let responseJson = await response.json();
      return { result: responseJson, isSuccess: true, message: "" };
    }
    return { result: null, isSuccess: false, message: response.statusText };
  }else{
    ToastAndroid.show('Please Connect to Internet', ToastAndroid.TOP);
  }
  } catch (error) {
    console.error(error);
    return { result: null, isSuccess: false, message: error };
  }
};