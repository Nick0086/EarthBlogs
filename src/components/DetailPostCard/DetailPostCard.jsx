import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import Parser from 'html-react-parser';
import Button from '../Button';

function DetailPostCard({ post }) {
    const [img, setImg] = useState();
    const [LikeID, setlike] = useState()
    const [userlike, seruerlike] = useState(false);

    useEffect(() => {
        postService.getFilePreview(post.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))

        postService.getLike(post.userId,post.$id)
        .then((res) => {
            if(res.documents.length !== 0){
                console.log(res)
                seruerlike(true);
            }
        })
    })

    useEffect(() => {
        postService.updatePost(post.$id, {
            ...post,
            View: parseInt(post.View + 1),
        }).then((res) => console.log(res.View))
    }, [])




    const likeHandler = async () => {
        postService.createLike(post.userId,post.$id)
            .then((res) => {
                if (res) {
                    setlike(res.$id);
                    seruerlike(true);
                }
            });

    }
    const deleteHandler = async () => {
        console.log(LikeID)
        postService.removeLike(LikeID)
            .then((res) => {
                if (res) {
                    seruerlike(false)
                }
            })

    }

    return (
        <div className='container' >
            <div className='w-3/4 pt-16 mx-auto' >
                <img src={img} className=' w-2/3 aspect-video rounded-xl' alt="" />
                <h3>{post.Title}</h3>
                <h3>{Parser(post.Content)}</h3>
                <Button onClick={userlike ? deleteHandler : likeHandler} >lIKE</Button>
            </div>
        </div>
    )
}

export default DetailPostCard