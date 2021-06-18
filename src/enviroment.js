let JUDGE_API;
let API_URL;
let SOCKET_URL;

if(process.env.NODE_ENV === "development"){
    JUDGE_API = process.env.REACT_APP_JUDGE_API_DEV;
    API_URL = process.env.REACT_APP_API_URL_DEV;
    SOCKET_URL = process.env.REACT_APP_SOCKET_URL_DEV;
}else{
    JUDGE_API = process.env.REACT_APP_JUDGE_API;
    API_URL = process.env.REACT_APP_API_URL;
    SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
}

export { JUDGE_API, API_URL, SOCKET_URL };