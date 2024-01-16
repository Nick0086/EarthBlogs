import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../input';
import Button from '../Button';
import RTE from '../RTE/RTE';
import Selector from '../Selector';
import './PostForm.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import postService from '../../Appwrite/PostData';
import { useNavigate } from 'react-router-dom';
import Spinner from "../Spinner/Spinner"

function PostForm({ editPost }) {
    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
            Title: editPost?.Title || '',
            Content: editPost?.Content || '',
            status: editPost?.status || 'Active',
            Category: editPost?.Category || "Personal",
        }
    });
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();
    const [loading, SetLoading] = useState(true);
    

    const postHandler = async (data) => {

        SetLoading(false);

        if (editPost) {

            console.log("editPost",editPost)
            console.log("data",data)
            console.log(typeof editPost.$id)

            const imageFile = data.image[0] ? await postService.uploadFile(data.image[0]) : null;

            if (imageFile) {
                await postService.delateFile(editPost.Featureimage);
            }

            data.Featureimage = imageFile?.$id || editPost.Featureimage;

            const editposts = await postService.updatePost(editPost.$id,data);

            if (editposts) {
                navigate('/');
            }

        } else {
            const imageFile = await postService.uploadFile(data.image[0]);
            const fileId = imageFile.$id;

            data.Featureimage = fileId;
            data.PostId = fileId.concat(imageFile.signature).slice(0, 30);
            data.userId = userData.$id;

            const addPost = await postService.createPost(data);

            if (addPost) {
                navigate('/');
            }
        }

        SetLoading(true);
    };

    // fuction for send notification error in post data fill
    const notify = () => {
        if (Object.keys(errors).length !== 0) {
            toast.error(`
                    ${errors.title ? errors.title.message :
                    errors.content ? errors.content.message :
                        errors.image ? errors.image.message : ""}
                    `, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
            }
            );
        }
    }
    useEffect(() => {
        // prevent unauthorize user for edit post
        if(editPost){
            if(userData.$id !== editPost.userId){
                navigate('/')
            }  
        }
        // Notify only after the render, using useEffect
        notify();
    }, [errors, setValue, getValues,notify]);

    return (
        <>
            {
                loading ? <div className='bg-gray-100 post-bg' >
                    <ToastContainer />
                    <div className='lg:py-36 md:py-12 py-10 container' >
                        <form className=' lg:w-3/4 bg-white bg-opacity-60 shadow-xl backdrop-blur-sm   md:w-[90%] w-[95%] rounded-2xl mx-auto md:p-8 p-4' onSubmit={handleSubmit(postHandler)} >
                            <h3 className='md:text-2xl text-xl font-medium text-dark-green text-center mb-10'>Create New Post</h3>
                            <div>
                                <Input
                                    label="Title"
                                    labelclass="text-[16px]"
                                    type="text"
                                    placeholder="Title"
                                    {...register("Title",
                                        {
                                            required: "Title is required",
                                            maxLength: {
                                                value: 120,
                                                message: 'Title cannot exceed 120 characters',
                                            }
                                        })}
                                />
                                <RTE
                                    label="Content :"
                                    labelclass="text-[16px]"
                                    name="Content"
                                    control={control}
                                    defaultValue={editPost?.Content || ''}
                                    {...register("Content",
                                        {
                                            required: "Content is required",
                                            maxLength: {
                                                value: 3000,
                                                message: 'Title cannot exceed 3000 characters',
                                            }
                                        }
                                        )}
                                />
                                <Input
                                    label="Featured Image"
                                    labelclass="text-[16px]"
                                    placeholder="Featured Image"
                                    type="file"
                                    classname="border-b-0"

                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", {
                                        // required: "Post Thumbnail is required",
                                    })}
                                />
                                <Selector
                                    labelclass="text-[16px]"
                                    label="Status"
                                    options={["Active", "Inactive"]}
                                    className="mb-6"
                                    {...register("status", { required: true })}
                                />
                                <Selector
                                    label="Category"
                                    labelclass="text-[16px]"
                                    options={["Personal", "News", "Sport", "Travel", "Food", "Fashion", "Finance", "Music", "Business", "Lifesyle"]}
                                    className="mb-6 "
                                    {...register("Category", { required: true })}
                                />
                                <div className='text-center mt-6'>
                                    <Button type='submit'>Add Post</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div> :
                    <Spinner />
            }
        </>

    )
}

export default PostForm