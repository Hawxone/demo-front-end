import React, {useEffect, useState} from 'react';
import externalService from "../../services/ExternalService";
import Image from "next/image";

const GalleryList = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [count, setCount] = useState(0);
    const [images, setImages] = useState([]);

    const getRequestParams = (page, pageSize) => {
        let params = {};

        if (page) {
            params["page"] = page;
        }

        if (pageSize) {
            params["per_page"] = pageSize;
        }

        return params;
    };

    const retrieveImages = ()=>{
        const params = getRequestParams(page,pageSize);

        externalService.getAllPaginated(params)
            .then((response)=>{
               const {next_page,page,per_page,photos,total_results}=response.data
                console.log(response.data)
                setImages(photos)
            })
    }

    useEffect(retrieveImages, [page,pageSize])



    return (
        <div className={"bg-gray-200 flex-grow h-screen w-full pt-6 mr-6 overflow-y-auto mt-6"}>
            <div className={"bg-white ml-5 grid justify-items-center"}>
                {
                    images && images.map((image)=>(
                        <Image key={image.id} src={image.src.medium} width={500} height={700}  />
                    ))
                }
            </div>
        </div>
    );
};

export default GalleryList;
