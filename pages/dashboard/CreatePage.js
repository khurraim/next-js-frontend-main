import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function CreateFileForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  // Loading Ck Editor
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

  const createPage = async () => {

    // Check if title is empty
    if (title.trim() === '') {
      toast.error('Title cannot be empty');
      return;
    }
  
    // Check if description is empty
    if (description.trim() === '') {
      toast.error('Description cannot be empty');
      return;
    }
    
    // Save Record in database
    try
    {
        const response =  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pages`, {title, description});
        toast.success('Page Saved Successfully');
    }
    catch(error)
    {
      console.log("Error Creating File: ")
      toast.error('Error Saving Record');
    }

    
  };

  
   
  

  return (
    <Admin>
      <div className='container-fluid my-5'>
        <div className='card'>
          <div className='card-header'>
            <h3 className='text-center card-title'>Create Page</h3>
          </div>

          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label className='form-label' htmlFor='title'>
                  Title:
                </label>
                <input
                  type='text'
                  id='title'
                  value={title}
                  className='form-control'
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='form-label' htmlFor='description'>
                  Description:
                </label>
                {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                    }}
                    config={{
                      // Add a custom data processor to handle line breaks
                      extraAllowedContent: 'br[self-closing]',
                    }}
                  />
                ) : (
                  <div>Loading CKEditor...</div>
                )}
              </div>
              <button
                className='btn btn-primary'
                type='button'
                onClick={createPage}
              >
                Create Page
              </button>
            </form>
          </div>
        </div>
      </div>
    </Admin>
  );
}
