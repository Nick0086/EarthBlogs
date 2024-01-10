import { Client, Account ,ID } from "appwrite";
import conf from "../conf/conf"

export class AuthService {

    client = new Client;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async CreateAccount({email,name,password}){
        console.log("email",email)
        console.log("name",name)
        console.log("password",password)
        try {
            const createAccount = await this.account.create(ID.unique(),email,password,name);
            if(createAccount){
                return this.loginUser({email,password})
            }else{
                return false;
            }         
        } catch (error) {
            console.log("Authservice :: CreateAccount :: error", error);
            throw error;
        }
    }

    async loginUser({email,password}){
        try {
            const respond = await this.account.createEmailSession(email,password);
            return respond;
        } catch (error) {
            console.log("Authservice :: loginUser :: error", error);
            throw error;
        }
    }

    async getuser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Authservice :: getuser :: error", error);      
        }
    }

    async logout() {
        try {
            console.log("logout call")
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    };
}

const authService = new AuthService();

export default authService;

