import React, { useEffect, useState } from 'react'
import { PostForm, Spinner } from '../components'
import { useParams } from 'react-router-dom';
import postService from '../Appwrite/PostData';

function EditPostpage() {

    const { postid } = useParams();
    const [editPost, setEditPost] = useState('');
    const [lo, setLo] = useState(true)

    useEffect(() => {
        setLo(true)
        if (postid) {
            postService.getPost(postid)
                .then((res) => setEditPost(res))
                .catch((error) => console.error("error in fetch post for edit", error))
                .finally(() => setLo(false))
        }
    }, [postid])

    return (<>
        {
            lo ? <Spinner/> : <PostForm editPost={editPost} />
        }
    </>

    )
}

export default EditPostpage;