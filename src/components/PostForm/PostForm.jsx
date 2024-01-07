import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '../input';
import Button from '../Button';
import RTE from '../RTE/RTE';
import Selector from '../Selector';

function PostForm() {
    const { register, handleSubmit, control } = useForm();

    const post = async (data) => {
        console.log(data);
    }

    return (
        <div className='bg-gray-100' >
            <div className='lg:py-16 md:py-12 py-10 container' >
                <form className='bg-white lg:w-3/4 md:w-[90%] w-[95%] rounded-2xl mx-auto md:p-8 p-4' onSubmit={handleSubmit(post)} >
                    <h3 className='md:text-2xl text-xl font-medium text-dark-green text-center mb-10'>Create New Post</h3>
                    <div>
                        <Input
                            label="Title"
                            type="text"
                            placeholder="Title"
                            {...register("title", { required: true })}
                        />
                         <RTE label="Content :" name="content" control={control}/>
                         <Input
                            label="Featured Image"
                            placeholder="Featured Image"
                            type="file"
                            classname="border-b-0"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: true })}
                        />
                        <Selector
                            label="Status"
                            options={["Active", "Inactive"]}
                            className="mb-6"
                            {...register("status", { required: true })}
                        />
                        <Selector
                            label="Category"
                            options={["Sport", "News","Travel","Food","Fashion","Finance","Personal","Music","Business","Lifesyle"]}
                            className="mb-6"
                            {...register("category", { required: true })}
                        />
                         <div className='text-center mt-6'>
                            <Button type='submit'>Add Post</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm