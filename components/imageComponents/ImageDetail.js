import React, {useEffect, useState} from 'react';
import Image from "next/image";
import ImageService from "../../services/ImageService";
import Link from "next/link";
import ImageId from "../../pages/image/[imageId]";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";


const ImageDetail = ({props,imageId}) => {


    return (

        <div className={"mt-1"} onClick={()=>{console.log("clicked")}}>
            {
                props.map((prop)=>(
                        imageId == prop.imageOrder && (<div key={prop.id}>
                        <Image   src={prop.image} width={856} height={1200} alt={prop.imageOrder} quality={30} priority={true}/>
                    </div>)

                ))
            }


    </div>


    );
};

export default ImageDetail;
