import axios from 'axios';
import React, { useState } from 'react';

const fileEndpoint = 'http://localhost:8080/uploadTransactions'

function FileUploader() {

    const [selectedFile, setSelectedFile] = useState(null);

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

        // Details of the uploaded file 
        console.log(selectedFile);

        // Request made to the backend api 
        // Send formData object 
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
