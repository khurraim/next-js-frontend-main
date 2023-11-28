import React, { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Select from 'react-select';
import Modal from "./components/Modal";

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import {
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

function Listing()
{

    // Router Variable
    const router = useRouter();

    // Style Object
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          borderRadius: '0px',
          padding: '8px 40px',
          background: '#fff',
          border: '2px solid #000',
          margin: '2px',
          width: '100%',
        }),
      };

    // Models
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for location [dropdown]
    const [uniqueAges, setUniqueAges] = useState([]); // State for unique age values
    const [uniqueNationality, setUniqueNationalities] = useState([]);
    const [uniquePrices, setUniquePrices] = useState([]);
    const [uniqueLocations, setUniqueLocations] = useState([]);
    const [uniqueHeights, setUniqueHeights] = useState([]);

    const [uniqueDressSizes, setUniqueDressSizes] = useState([]);

    // States For Filters
    const [location, setLocation] = useState(["all"]);
    const [age, setAge] = useState(["all"]); 
    const [nationality, setNationality] = useState(["all"]);
    const [price, setPrice] = useState(["all"]);
    const [height, setHeight] = useState(["all"]);

    const [dressSize, setDressSize] = useState(["all"]);


    // Open Close Modal

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [selectedAge,setSelectedAge] = useState('');
    const [selectedNationality, setSelectedNationality] = useState('');
    const [selectedDressSize, setSelectedDressSize] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedId, setSelectedId] = useState('');

    // New
    const [records, setRecords] = useState([]);
    const [services, setServices] = useState({}); 
    const [rates, setRates] = useState({});

    // Pagination
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [itemsPerPage] = useState(12); // Items per page

    


    // Render Unique Locations in filters column
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/unique-locations`)
        .then((response)=>{
            setUniqueLocations(response.data);
        })
        .catch((error) => { console.log("Error fetching locations :", error) })
    },[]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/unique-ages`)
        .then((response) => {
            setUniqueAges(response.data);
        })
        .catch((error) => { console.log("Error fetching ages :", error) })
    },[]);

    // this hook is rendering nationalities in the filters column
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/unique-nationalities`)
        .then((response) => {
            setUniqueNationalities(response.data);
        })
        .catch((error) => { console.log("Error fetching nationalities :", error) })
    },[]);

    // this hook is rendering prices in the filters column
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/unique-prices`)
        .then((response)=>{
            setUniquePrices(response.data);
        })
        .catch((error) => { console.log("Error fetching prices :", error) })
    },[]);

    // unique heights
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/unique-heights`)
        .then((response)=>{
            setUniqueHeights(response.data);
        })
        .catch((error) => { console.log("Error fetching prices :", error) })
    },[]);

    // Fetching Rates
  useEffect(()=>{
    // Fetch services for each model
    const fetchRates = async () => {
      const ratesData = {};

      for (const record of records) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/models/rates/${record.id}`
          ); // Replace with your service API endpoint
          ratesData[record.id] = response.data.rates;
        } catch (error) {
          console.error('Error fetching services:', error);
          ratesData[record.id] = [];
        }
      }
      setRates(ratesData);
    };

    if (records.length > 0) {
      fetchRates();
    }
  },[records]);
  


    const handleFilterChange = (filterOptions) => {
        const queryParams = new URLSearchParams();
    
        if (filterOptions.age.length > 0) {
            queryParams.set('age', filterOptions.age.join(','));
        } else {
            queryParams.delete('age');
        }
    
        if (filterOptions.nationality.length > 0) {
            queryParams.set('nationality', filterOptions.nationality.join(','));
        } else {
            queryParams.delete('nationality');
        }
    
        if (filterOptions.price.length > 0) {
            queryParams.set('price', filterOptions.price.join(','));
        } else {
            queryParams.delete('price');
        }
    
        if (filterOptions.location.length > 0) {
            queryParams.set('location', filterOptions.location.join(','));
        } else {
            queryParams.delete('location');
        }
    
        if (filterOptions.dressSize !== 'all') {
            queryParams.set('dressSize', filterOptions.dressSize);
        }

        if (filterOptions.height !== 'all') {
            queryParams.set('height', filterOptions.height);
        } else {
            queryParams.delete('height');
        }
    
        router.push(`/listing?${queryParams.toString()}`);
    };


    useEffect(() => {
        const ageQueryParam = Array.isArray(age) ? age.join(",") : age;
        const nationalityQueryParam = Array.isArray(nationality) ? nationality.join(",") : nationality;
        const priceQueryParam = Array.isArray(price) ? price.join(",") : price;
        const locationQueryParam = Array.isArray(location) ? location.join(",") : location;
        const heightQueryParam = Array.isArray(height) ? height.join(",") : height;
        
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/models?age=${ageQueryParam}&nationality=${nationalityQueryParam}&price=${priceQueryParam}&location=${locationQueryParam}&height=${heightQueryParam}&dressSize=${dressSize}`)
            .then((response) => {
                setModels(response.data);
                setRecords(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching models: ", error);
            });
    }, [age, nationality, price, location, height, dressSize, router]);


    
   
    


    // Function to open the modal
    const  openModal = async (imageUrl,aboutMe,age,nationality, dressSize, weight, video, modelId) => {
        console.log('Opening modal with image URL:', imageUrl);
        setSelectedImage(imageUrl);
        setAboutMe(aboutMe);
        setSelectedAge(age);
        setSelectedNationality(nationality);
        setSelectedDressSize(dressSize);
        setSelectedWeight(weight);
        setSelectedVideo(video);
        setSelectedId(modelId);
        setShowModal(true);
        
        
      };
    
      // Function to close the modal
      const closeModal = () => {
        console.log('Closing Modal');
        setSelectedImage('');
        setAboutMe('');
        setSelectedAge('');
        setSelectedNationality('');
        setSelectedDressSize('');
        setSelectedWeight('');
        setSelectedId('');
        setSelectedVideo('');
        setShowModal(false);
      };

    // Calculate the indexes of items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = models.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Layout>

            {showModal && 
            <Modal 
            imageUrl={selectedImage} 
            aboutMe={aboutMe} 
            age={selectedAge} 
            nationality={selectedNationality} 
            dressSize={selectedDressSize}
            weight={selectedWeight}
            video={selectedVideo}
            id={selectedId}
            onClose={closeModal} 
            />}
            
            <div className="ml-5" >

                <div className="main-container-second">
                    <div className="top-text">
                        It is a long established fact that a reader will be distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                        of letters, as opposed to using 'Content here, content here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
                        search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                        evolved over the years, sometimes by accident, sometimes on purpose
                    </div>
                    <div className="whats-app-number">
                    <div>
                        <table>
                            <tbody><tr>
                                <td className="whats-app-number-icon">
                                    <i className="fab fa-whatsapp"></i>
                                    <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 45, color: "black" }} />
                                </td>
                                <td>Call or WhatsApp on<br/>(+44) 07XX XXX XXX</td>
                            </tr>
                        </tbody></table>
                    </div>
                    </div>
                    <div className="filters mt-5">
                    
                        <div className="text-center d-flex justify-content-center">             
                            
                            <Select
                                styles={customStyles}
                                className="mx-3"
                                placeholder="Select Age"
                                value={age.map((a) => ({ label: a, value: a }))}
                                onChange={(selectedOptions) => {
                                    const selectedAges = selectedOptions.map((option) => option.value);
                                    setAge(selectedAges);
                                    handleFilterChange({ age: selectedAges, nationality, price, location, dressSize });
                                    }}
                                options={uniqueAges.map((uniqueAge) => ({ label: uniqueAge, value: uniqueAge }))}
                                isMulti
                            />

                            <Select
                                styles={customStyles}
                                className="mx-3"
                                placeholder="Select Nationality"
                                value={nationality.map((n) => ({ label: n, value: n }))}
                                onChange={(selectedOptions) => {
                                    const selectedNationalities = selectedOptions.map((option) => option.value);
                                    setNationality(selectedNationalities);
                                    handleFilterChange({ age, nationality: selectedNationalities, price, location, dressSize });
                                }}
                                options={uniqueNationality.map((uniqueNationality) => ({
                                    label: uniqueNationality.nationality,
                                    value: uniqueNationality.nationality,
                                }))}
                                isMulti
                            />

                            
                            
                                
                            <Select
                                styles={customStyles}
                                className="mx-3"
                                placeholder="Select Location"
                                value={location.map((l) => ({ label: l, value: l }))}
                                onChange={(selectedOptions) => {
                                    const selectedLocations = selectedOptions.map((option) => option.value);
                                    setLocation(selectedLocations);
                                    handleFilterChange({ age, nationality, price, location: selectedLocations, dressSize });
                                }}
                                options={uniqueLocations.map((uniqueLocation) => ({
                                    label: uniqueLocation.location,
                                    value: uniqueLocation.location,
                                }))}
                                isMulti
                            />


                            <Select
                                styles={customStyles}
                                className="mx-3"
                                placeholder="Select Prices"
                                value={price.map((p) => ({ label: p, value: p }))}
                                onChange={(selectedOptions) => {
                                    const selectedPrices = selectedOptions.map((option) => option.value);
                                    setPrice(selectedPrices);
                                    handleFilterChange({ age, nationality, price: selectedPrices, location, dressSize });
                                }}
                                options={uniquePrices.map((uniquePrice) => ({
                                    label: uniquePrice.price,
                                    value: uniquePrice.price,
                                }))}
                                isMulti
                            />

                                <Select
                                styles={customStyles}
                                className="mx-3"
                                placeholder="Select Heights"
                                value={height.map((p) => ({ label: p, value: p }))}
                                onChange={(selectedOptions) => {
                                    const selectedHeight = selectedOptions.map((option) => option.value);
                                    setHeight(selectedHeight);
                                    handleFilterChange({ age, nationality, price, location, height: selectedHeight, dressSize });
                                }}
                                options={uniqueHeights.map((uniqueHeight) => ({
                                    label: uniqueHeight.height,
                                    value: uniqueHeight.height,
                                }))}
                                isMulti
                            />

                        
                        </div>
                    
                    </div>
                </div>

                <div className="row listing-section">
                <div className="col-sm-12 col-md-12 col-lg-12 col-12 my-5">
                            {loading ? (
                                <p>Loading models...</p>
                            ) : currentItems.length === 0 ? (
                                <p>No models found.</p>
                            ) : (
                                <div className="row">
                                    {currentItems.map((model) => (
                                        <>
                                        {/* <div className="col-sm-3 col-md-3 col-lg-3 col-12" key={model.id}>                                
                                            <div className="card  mb-3" 
                                            onClick={() => openModal(
                                                `http://127.0.0.1:8000/storage/${model.featuredImage}`,
                                                `${model.modelDescription}`,
                                                `${model.age}`,
                                                `${model.nationality}`,
                                                `${model.dressSize}`,
                                                `${model.weight}`,
                                                // model
                                                )}>
                                                <img
                                                src={`http://127.0.0.1:8000/storage/${model.featuredImage}`}
                                                alt="Featured Image"
                                                style={{'height':'auto', 'width': '100%'}}
                                                />
                                                <div className="card-body">   
                                                    {model.title}
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-sm-3 col-md-3 col-lg-3 col-12" key={model.id}>
                                            <div className="custom-card red"
                                            onClick={() => openModal(
                                                `http://127.0.0.1:8000/storage/${model.featuredImage}`,
                                                `${model.modelDescription}`,
                                                `${model.age}`,
                                                `${model.nationality}`,
                                                `${model.dressSize}`,
                                                `${model.weight}`,
                                                `${model.video}`,
                                                `${model.id}`
                                                // model
                                                )}>
                                            <img  src={`http://127.0.0.1:8000/storage/${model.featuredImage}`} alt=""/>
                                            <div class="card-info">
                                                <div className="title">{model.title}</div>
                                                <div className="location">{model.location}</div>
                                                <div className="price">
                                                    
                                                    {
                                                        records.map((record) => {
                                                            const recordRates = rates[record.id];

                                                            return (
                                                            <>
                                                                {recordRates && recordRates.length > 0 && (
                                                                <ul style={{listStyle: 'none', 'display': 'inline-block', 'padding': 'none'}}>
                                                                    <li key={recordRates[recordRates.length - 1].id}>
                                                                    <b>Incall : </b>{recordRates[recordRates.length - 1].incall}
                                                                    
                                                                    <b>Outcall :</b>{recordRates[recordRates.length - 1].outcall}
                                                                    
                                                                    </li>
                                                                </ul>
                                                                )}
                                                                {!recordRates || recordRates.length === 0 && (
                                                                <div>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <img
                                                                        src="https://cdn-icons-png.flaticon.com/512/7560/7560658.png"
                                                                        alt="Loading..."
                                                                        style={{ animation: 'spin 3s linear infinite', width: '50px' }}
                                                                    />
                                                                    </div>
                                                                    <p style={{ textAlign: 'center' }}>Loading....</p>
                                                                </div>
                                                                )}
                                                            </>
                                                            );
                                                        }).slice(-1) // Display only the last record
                                                    }

                                                </div>
                                            </div>
                    
                                            </div>

                                            

                                        </div>
                                        
                                        

                                        
                                        </>
                                    ))}
                                </div>
                            )}
                            {/* Pagination Controls */}
                            <div className="text-center">
                                <ul className="pagination my-5">
                                    {Array.from({ length: Math.ceil(models.length / itemsPerPage) }).map((_, index) => (
                                        <li
                                            key={index + 1}
                                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                        >
                                            <button
                                                className="page-link"
                                                style={{
                                                    background: '#333', 
                                                    color: '#fff', 
                                                    borderRadius: '0px',
                                                    marginRight: '5px'
                                                }}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                </div>
                </div>
            
            </div>
        </Layout>
    )
}

export default Listing;