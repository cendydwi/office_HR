export const IsNullOrEmpty = (value ) => {
    if (value ==null){
        return true;
    }
    if(value ==""){
        return true;
    }
    return false;
};