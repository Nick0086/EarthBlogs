import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import Parser from 'html-react-parser';
import Button from '../Button';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';



function DetailPostCard({ post }) {

    const userId = useSelector((state) => state.auth.userData);

    const [img, setImg] = useState();
    const [LikeID, setlike] = useState()
    const [likeCount, setLikeCount] = useState()
    const [userlike, seruerlike] = useState(false);
    const [btndis, setBtnDis] = useState(false)

    const userData = {
        userId: userId.$id,
        postId: post.$id
    }
    useEffect(() => {
        // function for count view
        postService.updatePost(post.$id, {
            ...post,
            View: parseInt(post.View + 1),
        }).then((res) => console.log(res.View))
        // function for get image
        postService.getFilePreview(post.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))

        // function for check user like post or not  on page load
        postService.getLike(userData)
            .then((res) => {
                if (res.documents.length !== 0) {
                    console.log("getLike", res)
                    setlike(res.documents[0].$id);
                    seruerlike(true);
                }
            })
    }, [])

    useEffect(() => {
        postService.getLike({ ...userData, userId: null })
            .then((res) => setLikeCount(res.total))
    })

    const likeHandler = async () => {
        setBtnDis(true)
        postService.createLike(post.userId, post.$id)
            .then((res) => {
                if (res) {
                    setlike(res.$id);
                    seruerlike(true);
                }
            })
            .finally(() => setBtnDis(false))
    }
    const deleteHandler = async () => {
        setBtnDis(true)
        postService.removeLike(LikeID)
            .then((res) => {
                if (res) {
                    seruerlike(false)
                }
            })
            .finally(() => setBtnDis(false))
    }

    return (
        <div className='container' >
            <div className='w-[90%]  mx-auto' >
                <h2 className='text-4xl font-bold mb-8 text-center' >{post.Title}</h2>
                <div className='mx-auto mb-8'>
                    <img src={img} className=' w-full aspect-video rounded-xl  mb-4' alt="" />
                    <Button disable={btndis} classname='bg-transparent hover:bg-transparent md:w-[auto] md:p-[2px] p-[0px]' onClick={userlike ? deleteHandler : likeHandler} >
                        {
                            !userlike ? <FaRegHeart className='text-black text-xl' /> : <FaHeart className='text-red-600  text-xl' />
                        }
                        <p className='text-black capitalize' >{likeCount > 0 ? likeCount : "No Like"}</p>
                    </Button>
                </div>
                <h3 className='text-2xl font-extrabold tracking-wide mb-6' >{post.Title}</h3>
                <div className='text-lg font-medium  opacity-70 tracking-tight' >{Parser(post.Content)}</div>
            </div>
        </div>
    )
}

export default DetailPostCard