import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Admin from '../../layouts/Admin';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';

function EditSocialIcon() {
  const router = useRouter();
  const { id } = router.query;
  const [socialIcon, setSocialIcon] = useState({ name: '', link: '' });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [validationError, setValidationError] = useState('');
  const solidIcons = Object.keys(SolidIcons).map((icon) => ({ name: icon, icon: SolidIcons[icon] }));
  const brandIcons = Object.keys(BrandIcons).map((icon) => ({ name: icon, icon: BrandIcons[icon] }));

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/social-icons/${id}`)
        .then((response) => {
          setSocialIcon(response.data);
          setSelectedIcon({ name: response.data.name });
        })
        .catch((error) => {
          console.error('Error fetching social icon:', error);
        });
    }
  }, [id]);

  const handleNameChange = (e) => {
    setSocialIcon({ ...socialIcon, name: e.target.value });
    setSelectedIcon({ name: e.target.value });
  };

  const handleLinkChange = (e) => {
    setSocialIcon({ ...socialIcon, link: e.target.value });
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setSocialIcon({ ...socialIcon, icon_class: icon?.name || '' });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!socialIcon.name || !socialIcon.link) {
      setValidationError('Both fields are required.');
      toast.error('Both fields are required.');
      return;
    }

    // Validate link format
    if (!socialIcon.link.startsWith('https://')) {
      setValidationError('Link should start with "https://".');
      toast.error('Link should start with "https://".');
      return;
    }

    try {
      setSocialIcon({ ...socialIcon, icon_class: selectedIcon?.name || '' });

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
                <input
                  type="text"
                  className="form-control"
                  value={socialIcon.name}
                  onChange={handleNameChange}
                />
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
                <div className="mt-3">
                  {selectedIcon && (
                    <div>
                      <FontAwesomeIcon icon={selectedIcon.icon} size="3x" className="selected-icon" />
                      <p className="mt-2">Selected Icon: {selectedIcon.icon_class}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="icon-container card d-flex flex-wrap" style={{ width: '100%', height: '400px', overflowY: 'auto' }}>
                {[...solidIcons, ...brandIcons].map((item, index) => (
                  <div
                    key={index}
                    className={`icon-item ${selectedIcon && selectedIcon.name === item.name ? 'text-primary' : ''}`}
                    onClick={() => handleIconClick(item)}
                  >
                    <FontAwesomeIcon icon={item.icon} size="4x" className="icon m-2" />
                  </div>
                ))}
              </div>
              <div className="form-group mt-3">
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
