import React, { useState } from 'react';
import styles from './UploadVideo.module.css';
import { TextField, Button } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
export default function UploadVideo() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const {
        acceptedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({
        maxFiles: 1,
        accept: 'image/png'
    });

    const onSubmit = (e) => {
        console.log(acceptedFiles);
    }

    return (
        <div className={styles.mainContainer}>
            <form onSubmit={onSubmit}>
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <p>Upload your video</p>
                    </div>
                    {/* 
                    <p>{files[0] ? files[0] : null}</p> */}
                    <p>{acceptedFiles?'ne':'da'}</p>
                </section>
                <TextField type="text" className={styles.inputs} size="small" label="Title" variant="outlined" value={title} onChange={changeTitle} />
                <TextField type="text" size="small" label="Author" variant="outlined" value={author} onChange={changeAuthor} />
                <Button variant="contained" color="primary" onClick={onSubmit}>Upload</Button>
            </form>
        </div>
    )
}