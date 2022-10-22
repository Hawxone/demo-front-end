import React, {useState} from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import "filepond/dist/filepond.min.css";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import {useDispatch} from "react-redux";
import {saveImage} from "../../public/src/features/ImageSlice";



registerPlugin(FilePondPluginImageExifOrientation)

const AwsUploadComponent = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);

    const BUCKET_NAME='cdn.dimasblog.my.id'
    const IAM_USER_KEY ='AKIA5AKBQLIF4DEVF3AT'
    const IAM_USER_SECRET ='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'

    const s3Client = new S3Client({
        region: "ap-northeast-1",
        credentials:{
            accessKeyId:IAM_USER_KEY,
            secretAccessKey:IAM_USER_SECRET
        }
    });


    const process = async (fieldName,file,metadata,load,error,progress,abort,transfer,options) => {
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: "galleries/" + file.name,
            Body: file,
            ContentType: "image/jpeg"
        };


            const data = await s3Client.send(new PutObjectCommand(uploadParams));
            load(data)
            const name = file.name
            const order =1
            dispatch(saveImage(name))
    }


    const uploadFile=()=>{
        files.map(async file => {
            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: "galleries/" + file.file.name,
                Body: file.file,
                ContentType: "image/jpeg"
            };

            try {
                const data = await s3Client.send(new PutObjectCommand(uploadParams));
                console.log("Success", data);
                return data;

            } catch (e) {
                console.log("Error", e);
            }
            console.log("finished")
        })



    }




    return (
        <div className={"bg-gray-200 flex-grow h-max w-full pt-6 mr-6"}>

                <FilePond
                    className={"ml-5"}
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    name="files"
                    server={{process}}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />


            <div>
                <button onClick={uploadFile} className={"ml-5 w-full md:w-auto bg-gray-900 text-white font-medium py-2 px-3 rounded"}>Upload</button>
            </div>

        </div>

    );

};

export default AwsUploadComponent;
