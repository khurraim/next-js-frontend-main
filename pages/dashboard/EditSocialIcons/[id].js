import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Admin from '../../layouts/Admin';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditSocialIcon() {
  const router = useRouter();
  const { id } = router.query;
  const [socialIcon, setSocialIcon] = useState({ name: '', link: '' });
  const [socialMediaOptions] = useState([
    'Facebook', 'Instagram', 'Twitter', 'Pinterest', 'Snapchat', 'Linkedin'
  ]);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/social-icons/${id}`)
        .then((response) => {
          setSocialIcon(response.data);
        })
        .catch((error) => {
          console.error('Error fetching social icon:', error);
        });
    }
  }, [id]);

  const handleNameChange = (e) => {
    setSocialIcon({ ...socialIcon, name: e.target.value });
  };

  const handleLinkChange = (e) => {
    setSocialIcon({ ...socialIcon, link: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/social-icons/${id}`, socialIcon);
      toast.success('Social Icon updated successfully');
    } catch (error) {
      console.error('Error updating social icon:', error);
      toast.error('Error updating social icon');
    }
  };

  return (
    <Admin>
      <div className="container-fluid my-5">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title text-left">Edit Social Icon</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <select
                  className="form-control"
                  value={socialIcon.name}
                  onChange={handleNameChange}
                >
                  <option value="">Select Social Media</option>
                  {socialMediaOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  className="form-control"
                  value={socialIcon.link}
                  onChange={handleLinkChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default EditSocialIcon;
