import axios from 'axios';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const fileEndpoint = 'http://localhost:8080/uploadTransactions'

function FileUploader() {

    const [selectedFile, setSelectedFile] = useState(null);

    const {
        user
    } = useAuth0();

    // On file select (from the pop up) 
    function onFileChange(event) {

        // Update the state 
        setSelectedFile(event.target.files[0]);

    };

    // On file upload (click the upload button) 
    function onFileUpload() {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 

        formData.append(            
            "file",
            selectedFile,
            selectedFile.name
        );

        formData.append(            
            "userSub",
            user.sub            
        );

        // Details of the uploaded file 
        console.log(user);

        // Request made to the backend api 
        // Send formData object 
        console.log(formData.getAll("file"));
        console.log(formData.getAll("userSub"));
        axios.post(fileEndpoint, formData, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
				</button>
        </div>

    );
}


export default FileUploader; 
