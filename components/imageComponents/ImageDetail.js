import React, {useEffect, useState} from 'react';
import Image from "next/image";
import ImageService from "../../services/ImageService";
import Link from "next/link";
import ImageId from "../../pages/image/[imageId]";


const ImageDetail = ({currentImage, nextImage,imageId}) => {


    return (

        <div className={"mt-1"} onClick={()=>{console.log("clicked")}}>
            <div className={"bg-blue-600"}></div>
            {imageId == nextImage.imageOrder && <div>
                <Image key={nextImage.id}  src={nextImage.image} width={856} height={1200} alt={nextImage.imageOrder} quality={30} priority={true}/>
            </div>

            }
            {imageId == currentImage.imageOrder && <div>
                <Image key={currentImage.id}  src={currentImage.image} width={856} height={1200} alt={currentImage.imageOrder} quality={30} priority={true}/>
            </div>

            }

    </div>


    );
};

export default ImageDetail;
