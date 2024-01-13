import { Client, Databases, ID, Storage ,Query} from "appwrite";
import conf from "../conf/conf";

export class PostService {

    client = new Client;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost({ Title, Featureimage, Category, status, Content, userId, PostId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId,
                {
                    Title,
                    Featureimage,
                    Category,
                    status,
                    Content,
                    userId,
                    PostId
                }
            )
        } catch (error) {
            console.error("Appwrite serive :: createPost :: error", error);
            return false;
        }
    }
    async updatePost({Title, Featureimage, Category, status, Content,PostId}){
        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId,
                {
                    Title,
                    Featureimage,
                    Category,
                    status,
                    Content,
                }
            )
            
        } catch (error) {
            console.error("Appwrite serive :: updatePost :: error", error);
        }
    }
    async getPost(PostId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId
            )
        } catch (error) {
            console.error("Appwrite serive :: getPost :: error", error);
        }
    }
    async delatePost(PostId){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                PostId
            )
        } catch (error) {
            console.error("Appwrite serive :: delatePost :: error", error);
        }
    }
    async getAllPost(queries = [Query.equal("status", "Active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.error("Appwrite serive :: getAllPost :: error", error);   
        }
    }

    async getUserPost(userId){
        console.log("userId",userId)
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId",userId)
                ]
            )
        } catch(error){
            console.error("Appwrite serive :: getUserPost :: error", error);   
        }
    }


    // ================== File Service =============

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )   
        } catch (error) {
            console.error("Appwrite serive :: uploadFile :: error", error);
            return false;
        }
    }

    async delatePost(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.error("Appwrite serive :: delatePost :: error", error);   
        }
    }

    async getFilePreview(fileId){
        try {
            return await this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("Appwrite serive :: getFilePreview :: error", error); 
        }
    }

}

const postService = new PostService();
export default postService;