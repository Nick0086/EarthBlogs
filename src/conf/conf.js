const conf = {
    appwriteUrl : (import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteLikeCollectionId : String(import.meta.env.VITE_APPWRITE_LIKE_COLLECTION_ID),
    appwriteCommentCollectionId : String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;