import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Admin from "@/pages/layouts/Admin";
import axios from "axios";

function EditPage({page})
{
    // const router = useRouter();
    // const { id } = router.query;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    // States For CKEditor
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};


    // For Loading Ck Editor
    useEffect(() => {
        // Dynamically load CKEditor and ClassicEditor
        import('@ckeditor/ckeditor5-react')
          .then((module) => {
            editorRef.current = {
              CKEditor: module.CKEditor,
              ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            };
            setEditorLoaded(true);
          })
          .catch((error) => {
            console.error('Error loading CKEditor:', error);
          });
      }, []);

    useEffect(() => {
        setTitle(page.title || '');
        setDescription(page.description || '');
      }, [page]);

    // useEffect(() => {
    //     if(id)
    //     {
    //         axios.get(`http://127.0.0.1:8000/api/models/${id}`)
    //         .then((response) => {
    //             setPage(response.data);
    //         })
    //         .catch((error) => {console.log(error);})
    //     }
    // }, [id]);

    const handleSave = async () => {
        try {

            const fileName = title.replace(/\s+/g, "");
          // Update the title and description using the API
          await axios.post('/api/editFile', {
            fileName,
            title,
            description,
          });
          toast.success('File content updated successfully!');
        } catch (error) {
          console.error('Error updating file:', error);
          toast.error('Error updating file content');
        }
      };

    const handleEdit = () =>
    {
        // Make a PUT request to update the category
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/pages/${page.id}`, {
            title,
            description,
        })
        .then(() => {
            // Handle success
            toast.success("Page Updated Successfully");
        })
        .catch((error) => {
            console.error('Error updating Page:', error);
            toast.error("Error updating Page. Title and description is required. Title should be unique");
        });

        handleSave();
    }

    return (
        <Admin>
            <div className="container-fluid my-5">
                <div className="card">
                    
                    <div className="card-header">
                        <h2 className="text-center">Edit Page with ID</h2>
                    </div>
                    
                    <div className="card-body">
                        <form >
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                type="text" 
                                value={title} 
                                className="form-control" 
                                onChange={(e) => setTitle(e.target.value)}
                                /> 
                            </div>

                            {/* <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                className="form-control" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                /> 
                            </div> */}

                            <div className="form-group">
                                            {editorLoaded ? (
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={description}
                                                onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data);
                                                }}
                                                config={{
                                                extraAllowedContent: 'br[self-closing]',
                                                }}
                                            />
                                            ) : (
                                            <div>Loading CKEditor...</div>
                                            )}
                            </div>

                            <button 
                            type="button" 
                            className='btn btn-large my-3 w-100 btn-primary' 
                            onClick={handleEdit}
                            >
                                Update Page
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </Admin>
    )

}

EditPage.getInitialProps = async ({ query }) => {
    const { id } = query;
  
    // Fetch the category data based on the ID from the API
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/${id}`);
      const page = response.data;
      return { page };
    } catch (error) {
      console.error('Error fetching category:', error);
      return { page: {} };
    }
  };
  

export default EditPage;