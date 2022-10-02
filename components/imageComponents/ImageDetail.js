import React from 'react';
import Image from "next/image";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";


const ImageDetail = ({props,imageId}) => {


    return (

        <div className={"mt-1"} onClick={()=>{console.log("clicked")}}>
            {
                props.map((prop)=>(


                        imageId == prop.imageOrder && (

                            <div key={prop.id}>
                                <img loading={"lazy"} src={prop.imageUrl} width={856} height={1200} alt={prop.imageOrder} />
                            </div>

                        )

                ))
            }

            {
                props.map((prop)=>(
                    <div className={"hidden"} key={prop.id}>
                        <img src={prop.imageUrl} width={856} height={1200} alt={prop.imageOrder} quality={30} priority={true}/>
                    </div>

                ))
            }


    </div>


    );
};

export default ImageDetail;
