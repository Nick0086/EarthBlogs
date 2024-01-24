import { Client, Databases, ID, Storage, Query } from "appwrite";
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
    async updatePost(PostId, { Title, Featureimage, Category, status, Content, View }) {
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
                    View
                }
            )

        } catch (error) {
            console.error("Appwrite serive :: updatePost :: error", error);
        }
    }
    async getPost(PostId) {
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
    async delatePost(PostId) {
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
    async getAllPost(queries = [Query.equal("status", "Active")]) {
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
    async getFiterPost({ userId, Category }) {

        let queryArray = [];
        if (userId) {
            queryArray.push(Query.equal("userId", userId))
        }
        if (Category !== "Posts" && Category) {
            queryArray.push(Query.equal("Category", Category));
            console.log("Category", Category)
        }
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteCollectionId,
                queryArray
            )
        } catch (error) {
            console.error("Appwrite serive :: getUserPost :: error", error);
        }
    }



    // ====================== post like =======================

    async createLike(userId, postId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteLikeCollectionId,
                ID.unique(),
                {
                    userId,
                    postId,
                }
            )
        } catch (error) {
            console.error("Appwrite serive :: createLike :: error", error);
            return false;
        }
    }

    async removeLike(LikeID) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaaseId,
                conf.appwriteLikeCollectionId,
                LikeID
            )
        } catch (error) {
            console.error("Appwrite serive :: removeLike :: error", error);
            return false;
        }
    }

    async getLike({ userId, postId }) {
        let queryArray = [
            Query.equal("postId", postId),
        ];

        if (userId) {
            queryArray.push(Query.equal("userId", userId));
        }

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaaseId,
                conf.appwriteLikeCollectionId,
                queryArray
            )
        } catch (error) {
            console.error("Appwrite serive :: getLike :: error", error);
        }
    }


    // ================== File Service =============

    async uploadFile(file) {
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

    async delateFile(fileId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.error("Appwrite serive :: delatePost :: error", error);
        }
    }

    async getFilePreview(fileId) {
        try {
            const res = await this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            return res;
        } catch (error) {
            console.error("Appwrite serive :: getFilePreview :: error", error);
        }
    }

}

const postService = new PostService();
export default postService;