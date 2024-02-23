import { useState, useEffect } from 'react';
import axios from 'axios';

const FileViewers = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getAllFiles');
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div>
            <h1>List of Files</h1>
            {files.map((file, index) => (
                <div key={index}>
                    <h2>File {index + 1}</h2>
                    <iframe
                        src={`/api/file/${file._id}`}
                        width="10%"
                        height="500px"
                        style={{ border: 'none' }}
                        title={`File ${index + 1}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default FileViewers;