import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const AllFiles = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getAllFiles/');
                console.log(response.data);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div>
            <h1>All Files</h1>
            {files.map((file, index) => (
                file.filename ? (
                    <div key={index}>
                        <h2>{file.filename}</h2>
                        <h2>{file.category}</h2>
                        <a href={`http://localhost:8000/` + file.filename} download>Download</a>
                        <a href={`http://localhost:8000/` + file.filename} target="_blank" rel="noopener noreferrer">View</a>
                    </div>
                ) : null
            ))}
        </div>
    );
};

export default AllFiles;