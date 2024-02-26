import { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileViewers = () => {
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/files/65db5a7f28165c78a1d05a69');
                setFile(response.data);
            } catch (error) {
                console.error('Error fetching file:', error);
            }
        };

        fetchFile();
    }, []);

    return (
        <div>
            <h1>File Viewer</h1>
            {file && (
                <div>
                    <h2>{file.filename}</h2>
                    <Document
                        file={`http://localhost:8000/` + file.filename}
                    >
                        <Page pageNumber={1} renderTextLayer={false} />
                    </Document>
                </div>
            )}
        </div>
    );
};

export default FileViewers;