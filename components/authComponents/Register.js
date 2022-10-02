import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {registerUser} from "../../public/src/features/UserSlice";
import {useRouter} from "next/router";

const RegisterComponent = () => {
    const router = useRouter();
    const initialState = {
        id:null,
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    }

    const [userState, setUserState] = useState(initialState);

    const handleInputChange = event => {
        const { id, value } = event.target;
        setUserState({ ...userState, [id]: value });
    };

    const { loading, userInfo, error, success } = useSelector(
        (state) => state.users
    )


    const dispatch = useDispatch()

    const submitForm = (e)=>{
       if(userState.password !== userState.confirmPassword){
           alert('password mismatch')

           return
       }
       userState.email = userState.email.toLowerCase();
        let username = userState.username;
        let password = userState.password;
        let email = userState.email;
        dispatch(registerUser({username,password,email}))
    }

    useEffect(() => {
      if(success) router.push("/auth/login")
      if(userInfo) router.push("/")
    }, [router,userInfo,success]);


    return (
        <div className={"flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 w-full"}>
            <div className={"flex items-center mb-6 text-2xl font-semibold text-gray-900"}>
                <Image className={"w-8 h-8 mr-2"} src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"} height={40} width={40} />
                Flowbite
            </div>
            <div className={"w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 "}>
                <div className={"p-8 space-y-4 md:space-y-6 sm:p-8"}>
                    <h1 className={"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"}>
                        Sign Up
                    </h1>

                    <form className="space-y-4 md:space-y-6 w-full" action="#">
                        <div>
                            <label htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Your
                                username</label>
                            <input type="text" name="username" id="username" value={userState.username||""} onChange={handleInputChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="username" required="" />
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Your
                                email</label>
                            <input type="email" name="email" id="email" value={userState.email||""} onChange={handleInputChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="abc@mail.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" value={userState.password||""} onChange={handleInputChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   required=""/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" value={userState.confirmPassword||""} onChange={handleInputChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   required=""/>
                        </div>

                        <button type="button" onClick={submitForm}
                                className="w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign
                            in
                        </button>
                        <p className="text-sm font-light text-gray-500 ">
                            Already have an account? <Link href={"/auth/login"}
                                                          className="font-medium text-primary-600 hover:underline">Sign
                            in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
