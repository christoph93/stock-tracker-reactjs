import axios from 'axios';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Toast from 'react-bootstrap/Toast'
import { Row, Col } from 'react-bootstrap'
import config from '../config/apiconfig.js'



function FileUploader(props) {

    const [selectedFile, setSelectedFile] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const fileEndpoint = `${config.apiBasePath}/${props.path}`;

    const {
        user
    } = useAuth0();


    const toggleShowToast = () => setShowToast(!showToast);

    // On file select (from the pop up) 
    function onFileChange(event) {

        // Update the state 
        setSelectedFile(event.target.files[0]);

    }

    // On file upload (click the upload button) 
    function onFileUpload() {

        const formData = new FormData();

        if (!selectedFile.name.includes('.xls')) {
            setShowToast(true);
        } else {

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
    }

    return (
        <div>
            
            <Row>
                <Col xs={6}>
                    <Toast show={showToast} onClose={toggleShowToast}>
                        <Toast.Header>
                            <strong className="mr-auto">Invalid file</strong>
                        </Toast.Header>
                        <Toast.Body>File must be .xls</Toast.Body>
                    </Toast>
                </Col>
            </Row>

            <input type="file" onChange={onFileChange} />

            <button onClick={onFileUpload}>
                Upload
				</button>
        </div>

    );
}


export default FileUploader; 
