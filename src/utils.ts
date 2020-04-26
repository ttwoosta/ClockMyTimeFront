
const axios = require('axios');

export default class Utils {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }

    static readonly m_BaseURL = 'https://scottflaskapptutorial.herokuapp.com/';
  
    public static requestCsrfToken() {
        return axios({
            url: '/get-csrf-token/',
            baseURL: Utils.m_BaseURL,
            maxRedirects: 0,
          })
          .then(function (response: any) {
              Utils.setCsrfToken(response.data["csrftoken"]);
          })
    }

    public static createApiClient() {
        var token = Utils.getCsrfToken();

        const instance = axios.create({
            withCredentials: true,
            baseURL: Utils.m_BaseURL,
            headers: {
                'X-XSRF-TOKEN': token
            }
          });

          instance.interceptors.request.use(function (config) {
            // Do something before request is sent
            if (config.url === '/accounts/login/') {
                debugger;
                var token = Utils.getCsrfToken();
                config.headers.common.Cookie = "xsrf=" + token;
            }
            return config;
          }, function (error) {
            return Promise.reject(error);
          });

        // Add a response interceptor
        instance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
                
        return instance;
    }

    static readonly kCSRF = "csrf_token";
    static readonly kUsername = "username";
    static readonly kFullname = "fullname";
    static readonly kEmail = "email";
    static readonly kSessionId = "sessionid";

    public static getCsrfToken() {
        return localStorage.getItem(Utils.kCSRF);
    }

    public static setCsrfToken(token: string) {
        localStorage.setItem(Utils.kCSRF, token);
    }

    public static getUsername() {
        return localStorage.getItem(Utils.kUsername);
    }

    public static setUsername(username: string) {
        localStorage.setItem(Utils.kUsername, username);
    }

    public static getEmail() {
        return localStorage.getItem(Utils.kEmail);
    }

    public static setEmail(email: string) {
        localStorage.setItem(Utils.kEmail, email);
    }

    public static getFullName() {
        return localStorage.getItem(Utils.kFullname);
    }

    public static setFullName(fullname: string) {
        localStorage.setItem(Utils.kFullname, fullname);
    }

    public static getCookie(c_name: string)
    {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0; i<ARRcookies.length; i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
    }

    public static removeCreads() {
        localStorage.removeItem(Utils.kFullname);
        localStorage.removeItem(Utils.kUsername);
        localStorage.removeItem(Utils.kEmail);
        localStorage.removeItem(Utils.kCSRF);
    }

    public static isLogginIn() {
        return this.getCookie(Utils.kSessionId) !== null && this.getFullName() !== null;
    }
}