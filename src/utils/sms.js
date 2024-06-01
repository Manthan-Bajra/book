require("dotenv").config();
const axios = require("axios");

const sendSMS = async (otp,mobileNumber,countryCode="") => {
    let userNumber=mobileNumber;
    // if(countryCode){
    //     if (countryCode.startsWith('+')) {
    //         countryCode = countryCode.slice(1);
    //     }
    //     userNumber = countryCode+mobileNumber;
    // }else{
    //     userNumber = "91"+mobileNumber;
    // }
    
    // const userID=process.env.GUPSHAP_USER_ID;
    // const password=process.env.GUPSHAP_PASSWORD;
    let apiKey = urlencode('Your apiKey');
	
	// Message details
	let numbers = [userNumber];
	let sender = 'TXTLCL';//urlencode('TXTLCL');
	let message = `${otp} is your OTP for login. Please do not share it with anyone.`;//rawurlencode('This is your message');
    // Construct the API request
    const requestOptions = {
        method: 'post',
        url: 'https://api.textlocal.in/send/',
        data: {
            // method: 'sendMessage',
            // send_to: userNumber,
            // msg: `let {otp} is OTP to login to Apna dharm account. Do not share this OTP with anyone.`,
            // msg_type: 'TEXT',
            // userid: userID,
            // auth_scheme: 'PLAIN',
            // password: password,
            // format: 'JSON',
            // v: 1.1
            'apikey':apiKey, 
            'numbers': numbers, 
            "sender":sender,
            "message": message
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        // Make the Gupshup API request using Axios
        const response = await axios(requestOptions);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

module.exports = {
    sendSMS
}