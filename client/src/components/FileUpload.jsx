import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [category, setCategory] = useState('category1');
    const [otherCategory, setOtherCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleOtherCategoryChange = (event) => {
        setOtherCategory(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('category', category === 'other' ? otherCategory : category);
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8000/api/upload', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <form encType="multipart/form-data" onSubmit={handleSubmit} className="p-8 border border-gray-200 rounded bg-white" >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category:
                    </label>
                    <select id="category" name="category" value={category} onChange={handleCategoryChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="React">React</option>
                        <option value="Java">Java</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                {category === 'other' && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="other">
                            Other:
                        </label>
                        <input type="text" id="other" name="other" value={otherCategory} onChange={handleOtherCategoryChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                        Upload a file:
                    </label>
                    <input type="file" id="file" name="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FileUpload;