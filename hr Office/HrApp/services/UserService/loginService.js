
export const loginUser=async(user, pass)=> {
    userinfo = [{
        userName: 'h001',
        pass: '123456',
        userType: 1
    }, {
        userName: 'h002',
        pass: '123456',
        userType: 2
    }]
        try {
                userinfo.forEach(element => {
                    if (user=== element.userName && pass=== element.pass && element.userType===1) {
                        return {  isSuccess: true, userType:'admin',message: "" };
                    }else if(user=== element.userName && pass=== element.pass && element.userType===1){
                        return {  isSuccess: true, userType:'user',message: "" };
                    }else{
                        return {  isSuccess: false, userType:null,message: "error" };
                    }
                });
        } catch (error) {
            console.error(error);
        }


};