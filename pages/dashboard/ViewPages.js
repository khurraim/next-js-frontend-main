import { useState, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link'; // Import Link from Next.js
import Admin from '../layouts/Admin';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewPages({ files }) {

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    console.log('API_URL:', process.env.API_URL);

    // Make a GET request to your Laravel API endpoint to fetch the categories
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages`)
      .then((response) => {
        setPages(response.data);
        setLoading(false);
        toast.success('Pages retreived');
      })
      .catch((error) => {
        console.error('Error fetching Pages:', error);
        setLoading(false);
      });
  }, []);

  const [excludedFiles, setExcludedFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);

  const excludedFolders = ['components', 'layouts', 'api', 'dashboard']; // Add folder names to exclude
  const excludedFileNames = ['_app.js', '_document.js', 'login.js', 'index.js']; // Add specific file names to exclude

  const deleteFile = async (fileName) => {
    
    const confirmed = window.confirm(`Are you sure you want to delete the file "${fileName}"?`);
    if (!confirmed) {
      return;
    }
    
    try {
      // Send a POST request to the deleteFile API route
      await axios.post('/api/deleteFile', { fileName });

      // Update the list of deleted files
      setDeletedFiles([...deletedFiles, fileName]);

      toast.success("Page deleted successfully");

    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Error deleting page");
    }
  };



  const deleteRecord = async (id, fileName) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/pages/${id}`);
      setPages((prevPages) => prevPages.filter((page) => page.id !== id));
      toast.success('Page Deleted Successfully');
  
      // After successful deletion of the record, delete the file
      deleteFile(fileName);
    } catch (error) {
      console.error('Error deleting Page:', error);
      toast.error('Error Deleting Page. Check if the page is included in some menu.');
    }
  };
  

  // Filter out folders and excluded files
  const filteredFiles = files
    .filter(
      (file) =>
        !excludedFiles.includes(file) &&
        !deletedFiles.includes(file) &&
        !excludedFolders.some((folder) => file.includes(folder)) &&
        !excludedFileNames.includes(file)
    )
    .map((file) => file.replace(/\\/g, '/')); // Normalize file paths for cross-platform compatibility

  return (
    <Admin>


      


      <div className="container-fluid my-5">
      {loading ? (
        <p>Loading Pages...</p>
      ) : pages.length === 0 ? (
        <p>No Pages found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.id}</td>
                <td>{page.title}</td>
                <td>{page.description}</td>
                <td>
                  
                  

                  <Link href={`/dashboard/EditPage/${page.id}`} className="btn btn-primary mx-3">
                    Edit
                  </Link>                  
                  
                  

                  


                  <button className="btn btn-danger" onClick={() => deleteRecord(page.id, page.title.replace(/\s+/g, '') + '.js')}>
                    Delete
                  </button>



                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>


    </Admin>
  );
}

export async function getStaticProps() {
  try {
    const pagesDir = path.join(process.cwd(), 'pages');
    const files = await fs.readdir(pagesDir);

    return {
      props: {
        files,
      },
    };
  } catch (error) {
    console.error('Error reading directory:', error);
    return {
      props: {
        files: [],
      },
    };
  }
}

export default ViewPages;
