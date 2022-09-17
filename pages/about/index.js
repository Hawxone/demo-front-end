import React, {useState} from 'react';
import Header from "../../components/Header";
import {IoMdPhotos} from "react-icons/io";

const About = () => {

    const [imageToPost, setImageToPost] = useState(null);

    const addImageToPost = (e)=>{
        const reader = new FileReader();
        if(e.target.files[0]) {
            
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setImageToPost(e.target.result);
                console.log(imageToPost)
            }
        }
    }

    return (
        <div>
            <Header />
            <div className={"flex items-center p1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded md hover:cursor-pointer"}>
                <IoMdPhotos size={20} className={"text-green-500"}/>
                <p className={"font-semibold text-gray-600"}>Photo/Video</p>
                <input onChange={addImageToPost} type={"file"}/>
            </div>
        </div>
    );
};

export default About;
