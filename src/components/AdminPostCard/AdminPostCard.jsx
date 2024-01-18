import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import postService from '../../Appwrite/PostData';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function AdminPostCard({ data, getpost }) {

    const [img, setImg] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const deleteHandler = () => {
        if (window.confirm('Are you sure to delete this Post?')) {
            setLoading(false)

            postService.delatePost(data.$id)
                .then((res) => {
                    if (res) {
                        postService.delatePost(data.Featureimage);
                        navigate('/dashboard');
                    }
                })
                .catch((err) => console.error("err in delete post", err))
                .finally(() => getpost());
        }
    }

    useEffect(() => {
        postService.getFilePreview(data.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))
    })

    return (
        <>
            {
                loading ? <div className='grid grid-cols-12 gap-4 my-4 p-4 w-[85%] mx-auto bg-[#F4F6FF] rounded-lg'>
                    <div className='col-span-3' >
                        <div className='rounded-lg overflow-hidden' >
                            <img src={img} className='aspect-video' alt="" />
                        </div>
                    </div>
                    <div className='col-span-7' >
                        <h3>{(data.Title).substring(0, 50) + "..."}</h3>
                        {/* <p>{Parser((data.Content).slice(0, 500))}</p> */}
                        <p>{data.$createdAt.split('T')[0].split('-')[2]} - {data.$createdAt.split('T')[0].split('-')[1]} - {data.$createdAt.split('T')[0].split('-')[0]}</p>
                    </div>
                    <div className='col-span-2 flex flex-col items-center justify-between gap-2' >
                        <Button classname='md:w-[70px] md:p-2 bg-blue-600 hover:bg-blue-900 rounded-lg text-sm' onClick={() => navigate(`/editpost/${data.$id}`)} >Edit</Button>
                        <Button classname='md:w-[70px] md:p-2 bg-red-500 hover:bg-red-900 rounded-lg text-sm' onClick={deleteHandler} >Delete</Button>
                    </div>
                </div> : <Spinner />
            }
        </>
    )
}

export default AdminPostCard