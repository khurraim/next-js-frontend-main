// EditFooterContent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '@/pages/layouts/Admin';
import { useRouter } from 'next/router';
import {toast} from 'react-toastify';


const EditFooterContent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the footer content to edit based on the ID
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/footerContent/${id}`) // Replace with your API endpoint
      .then((response) => {
        setContent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching footer content:', error);
        setLoading(false);
      });
  }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('copyright_text', content.copyright_text);
    if (content.footer_image) {
      formData.append('footer_image', content.footer_image);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/footerContent/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200) {
      router.push('/dashboard/ViewFooterContent');
      toast.success('Content Updated Successfully');
    } else {
      toast.error('Failed to update content. Please try again.');
    }
  } catch (error) {
    console.error('Error updating footer content:', error);
    toast.error('An error occurred while updating content.');
  }
};

  

  return (
    <Admin>
      <div className="container-fluid my-3">
        {loading ? (
          <p>Loading footer content...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="copyrightText">Copyright Text</label>
              <input
                type="text"
                id="copyrightText"
                className="form-control"
                value={content.copyright_text || ''}
                onChange={(e) =>
                  setContent({ ...content, copyright_text: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="footerImage">Footer Image</label>
              <input
                type="file"
                id="footerImage"
                className="form-control-file"
                onChange={(e) => {
                  const updatedContent = { ...content };
                  updatedContent.footer_image = e.target.files[0];
                  setContent(updatedContent);
                }}
              />
            </div>
            <div className="form-group">
              <label>Existing Footer Image</label>
              {content.footer_image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${content.footer_image}`}
                  alt="Footer Image"
                  style={{ width: '100px', height: 'auto' }}
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Update
            </button>
          </form>
        )}
      </div>
    </Admin>
  );
};

export default EditFooterContent;
