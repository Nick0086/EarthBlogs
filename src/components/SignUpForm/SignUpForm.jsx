import React, { useState } from 'react'
import Input from '../input';
import Button from '../Button';
import { useForm } from 'react-hook-form';

function SignUpForm() {

    const {register, handleSubmit , formState: { errors } } = useForm();

    const create = (data) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(errors)
            console.log(error)
        }
        
    }

    return (
        <div className='bg-gray-100' >
            <div className='lg:py-16 md:py-12 py-10 container' >
                <div className='lg:w-2/4 md:w-2/3 bg-white mx-auto rounded-xl' >
                    <form className='w-full md:p-8 p-6 mx-auto' onSubmit={handleSubmit(create)}>
                        <h3 className='md:text-2xl text-xl font-medium text-dark-green text-center mb-10'>Registration to Our World</h3>
                        <div className='md:w-3/4 mx-auto' >
                            <Input
                                label="Name"
                                placeholder="Enter Your Full Name"
                                required
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter Your Email Here"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^[A-Za-z]{3,}[0-9]{1,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{2,3}$/.test(value) || 
                                        "Email address must be a valid address",
                                    }
                                })}
                            />
                            { errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message || ""}</p>}
                            <Input
                                type="password"
                                label="password"
                                placeholder="*****"
                                {...register("password", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9@#$%^&*]{8,15}$/.test(value) || 
                                        "Password must Contain atleast 1 UpperCase , 1 Lowwercase, 1 Symbol and min length 8 ",
                                    }
                                })}
                            />
                            { errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message || ""}</p>}
                        </div>
                        <div className='text-center mt-6'>
                            <Button type='submit'>create account</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm;