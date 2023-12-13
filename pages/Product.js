import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "./components/Modal";
import NewHeader from "./components/NewHeader";

const Product = () => {

  const router = useRouter();

  const filterStyles = {
    border: '2px solid #000',
    textTransform : 'uppercase',
    padding: '0.5rem',
    listStyle: 'none',
    borderTop : 'none',
    width: '100%',
    maxHeight : '250px',
    overflow: 'auto',
    zIndex: '2'
  }

  const radioStyle = {
    marginRight: '0.2 rem',
    borderRadius: '0px',
    height : '16px',
    width: '16px',
    borderColor : 'black',
    
  }

  const labelStyle = {
    paddingLeft: '10px'
  }

  const anchorStyles = {
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '0.5rem',
    border: '2px solid #000',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase'
  }

  const [modelsData, setModelsData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]); // Only used to show selected filters


  const [isCharacteristicsVisible, setIsCharacteristicsVisible] = useState(false);
  const [isLocationsVisible, setIsLocationsVisible] = useState(false);
  const [isIncallVisible, setIsIncallVisible] = useState(false);
  const [isOutcallVisible, setIsOutcallVisible] = useState(false);

  const [uniqueAges, setUniqueAges] = useState([]); // State for unique age values
  const [uniqueNationality, setUniqueNationalities] = useState([]);
  const [uniqueDressSizes, setUniqueDressSizes] = useState([]);
  const [uniqueIncalls, setUniqueIncalls] = useState({});
  const [uniqueOutcalls, setUniqueOutcalls] = useState({});
  const [uniqueLocations, setUniqueLocations] = useState([]);


  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const [selectedDressSizes, setSelectedDressSizes] = useState([]);
  const [selectedSubLocation, setSelectedSubLocation] = useState([]);
  const [selectedIncalls, setSelectedIncalls] = useState([]);
  const [selectedOutcall, setSelectedOutcall] = useState(null);



  const toggleCharacteristicsVisibility = () => {
    setIsCharacteristicsVisible(!isCharacteristicsVisible);
  };

  const toggleLocationsVisibility = () => {
    setIsLocationsVisible(!isLocationsVisible);
  }

  const toggleIncallVisibility = () => {
    setIsIncallVisible(!isIncallVisible);
  }

  const toggleOutcallVisibility = () => {
    setIsOutcallVisible(!isOutcallVisible);
  }

  // const handleCheckboxClick = (event) => {
  //   // Prevent the event from propagating to the parent div
  //   event.stopPropagation();
  // };

  const handleCheckboxClick = (category, value) => {
    switch (category) {
      case 'age':
        setSelectedAges((prevSelectedAges) => {
          const newSelectedAges = prevSelectedAges.includes(value)
            ? prevSelectedAges.filter((age) => age !== value)
            : [...prevSelectedAges, value];
          console.log('Selected Ages:', newSelectedAges);
          return newSelectedAges;
        });
        break;
      case 'nationality':
        setSelectedNationalities((prevSelectedNationalities) => {
          const newSelectedNationalities = prevSelectedNationalities.includes(value)
            ? prevSelectedNationalities.filter((nationality) => nationality !== value)
            : [...prevSelectedNationalities, value];
          console.log('Selected Nationalities:', newSelectedNationalities);
          return newSelectedNationalities;
        });
        break;
      case 'dressSize':
        setSelectedDressSizes((prevSelectedDressSizes) => {
          const newSelectedDressSizes = prevSelectedDressSizes.includes(value)
            ? prevSelectedDressSizes.filter((dressSize) => dressSize !== value)
            : [...prevSelectedDressSizes, value];
          console.log('Selected Dress Sizes:', newSelectedDressSizes);
          return newSelectedDressSizes;
        });
        break;
        case 'subLocation':
          setSelectedSubLocation((prevSelectedSubLocation) => {
            if (prevSelectedSubLocation.includes(value)) {
              return prevSelectedSubLocation.filter((subLocation) => subLocation !== value);
            } else {
              return [...prevSelectedSubLocation, value];
            }
          });
          break;
        
        
    case 'incall':
      setSelectedIncalls((prevSelectedIncalls) => {
        if (prevSelectedIncalls.includes(value)) {
          return prevSelectedIncalls.filter((incall) => incall !== value);
        } else {
          return [...prevSelectedIncalls, value];
        }
      });
      break;
    
      default:
        break;
    }
  };


   // this hook is rendering ages in the filters column
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

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/models/unique-dress-sizes`)
    .then((response)=>{
        setUniqueDressSizes(response.data);
    })
    .catch((error) => { console.log("Error fetching locations :", error) })
  },[]);

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/unique-incall`)
    .then((response)=>{
      console.log(response.data);
      setUniqueIncalls(response.data);
    })
    .catch((error)=>{console.log("Error fetching Incalls: ", error);})
  }, []);

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/unique-outcall`)
    .then((response)=>{
      console.log(response.data);
      setUniqueOutcalls(response.data);
    })
    .catch((error)=>{console.log("Error fetching Incalls: ", error);})
  }, []);

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/unique-outcall`)
    .then((response)=>{
      setUniqueOutcalls(response.data);
    })
    .catch((error)=> {console.log("Error fetching outcalls: ", error)});
  },[]);

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/unique-locations`)
    .then((response)=>{
      setUniqueLocations(response.data);
    })
    .catch((error)=>{console.log("Error fetching locations : ",error)});
  },[]);


  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-filtered-models`)
    .then((response)=>{
      setModelsData(response.data);
    })
    .catch((error)=>{console.log("Error fetching models : ",error)});
  },[])

  const handleShowGirls = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-filtered-models`;

    const filters = {};

    if (selectedAges.length > 0) {
      filters.age = selectedAges.join(',');
    }

    if (selectedNationalities.length > 0) {
      filters.nationality = selectedNationalities.join(',');
    }

    if (selectedDressSizes.length > 0) {
      filters.dress_size = selectedDressSizes.join(',');
    }

    if (selectedSubLocation.length > 0) {
      filters.subLocation = selectedSubLocation.join(',');
    }

    if (selectedIncalls.length > 0) {
      filters.incall = selectedIncalls.join(',');
    }

    if (selectedOutcall) {
      filters.outcall = selectedOutcall;
    }

     // Update selectedFilters array based on selected filter values
     const newSelectedFilters = [];

     if (selectedAges.length > 0) {
       newSelectedFilters.push(`Age: ${selectedAges.join(', ')}`);
     }
 
     if (selectedNationalities.length > 0) {
       newSelectedFilters.push(`Nationality: ${selectedNationalities.join(', ')}`);
     }
 
     if (selectedDressSizes.length > 0) {
       newSelectedFilters.push(`Dress Size: ${selectedDressSizes.join(', ')}`);
     }
 
     if (selectedSubLocation.length > 0) {
       newSelectedFilters.push(`Location: ${selectedSubLocation.join(', ')}`);
     }
 
     if (selectedIncalls.length > 0) {
       newSelectedFilters.push(`Incall: £${selectedIncalls.join(', £')}`);
     }
 
     if (selectedOutcall) {
       newSelectedFilters.push(`Outcall: £${selectedOutcall}`);
     }
 
     // Update the state
     setSelectedFilters(newSelectedFilters);

    

    axios.get(apiUrl, { params: filters })
      .then((response) => {
        setModelsData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching models:', error);
      });
  };

  const handleRadioChange = (category, value) => {
    switch (category) {
      case 'outcall':
        setSelectedOutcall(value);
        break;
      // ... any other cases
      default:
        break;
    }
  };

    return (
      <>
      <NewHeader/>
        <main className="main-wrapper innrerPages-waper">
          <section className="products-sec">
            <div className="container-lg">
              <div className="row">
                <div className="col-lg-9 mx-auto">
                  <h5 className="section-dis">Our full selection of female London escorts are available 24/7. These girls are ideal for any occasion, including dinner dates, social gatherings and quiet intimate relationships where discretion is guaranteed. If you do want to meet a local call girl, we have over 100 ladies from the UK, Europe and South America, working in the city to provide escort services to gentlemen who seek romance and companionship. If you are looking for escorts that are beautiful, friendly, passionate and attentive, you need to contact us. </h5>
                  <div className="text-center mt-5">
                    <a className="btn-dark-outline my-4" href="https://www.whatsapp.com/"><span><i className="fa-brands fa-whatsapp" /></span> <span>Call or WhatsApp on <br /> (+44) 07XX XXX XXX</span></a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="row">
                    <div className="col-lg-3 mt-3">
                      <div id="list1"  tabIndex={100} >
                        <span className="anchor" style={anchorStyles} onClick={toggleCharacteristicsVisibility} >Characteristics</span>
                        {isCharacteristicsVisible && (
                          <ul id="items" style={filterStyles} className="items">
                          <h5>Age</h5>
                          {uniqueAges.filter((age) => age !== null).map((age) => (
                            <li key={age}>
                              <input
                                //onClick={handleCheckboxClick}
                                style={radioStyle}
                                className="form-check-input"
                                type="checkbox"
                                onChange={() => handleCheckboxClick('age', age)}

                                id={age}
                                checked={selectedAges.includes(age)}

                              />
                              <label style={labelStyle} htmlFor={age}>{age}</label>
                            </li>
                          ))}

                         
                          <h5>Nationality</h5>
                          {uniqueNationality.filter((nationality) => nationality.nationality !== null).map((nationality) => (
                            <li key={nationality}>
                            <input
                              //onClick={handleCheckboxClick}
                              onChange={() => handleCheckboxClick('nationality', nationality.nationality)}

                              style={radioStyle}
                              className="form-check-input"
                              type="checkbox"
                              id={nationality}
                              checked={selectedNationalities.includes(nationality.nationality)}

                            />
                            <label style={labelStyle} htmlFor={nationality}>{nationality.nationality}</label>
                          </li>
                          ))}
                          
                          <h5>DRESS SIZE</h5>
                          {uniqueDressSizes.filter((dressSize) => dressSize.dressSize !== null).map((dressSize) => (
                            <li key={dressSize}>
                            <input
                              onChange={() => handleCheckboxClick('dressSize', dressSize.dressSize)}
                              onClick={handleCheckboxClick}
                              style={radioStyle}
                              className="form-check-input"
                              type="checkbox"
                              id={dressSize}
                              checked={selectedDressSizes.includes(dressSize.dressSize)}
                            />
                            <label style={labelStyle} htmlFor={dressSize}>{dressSize.dressSize}</label>
                          </li>
                          ))}
                        </ul>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-3 mt-3">
                      <div id="list2" className="dropdown-check-list2" tabIndex={100}>
                        <span className="anchor2" onClick={toggleLocationsVisibility}>Location</span>
                        {isLocationsVisible && (
                        <ul id="items2" className="items2">
                        {uniqueLocations.map((locationData) => (
                          <div key={locationData.location}>
                            <h5>{locationData.location}</h5>
                            <div>
                              {/* {locationData.sublocations.map((sublocation) => (
                                <li key={sublocation}>
                                  <input
                                  type="checkbox"
                                  className="form-check-input" 
                                  onChange={() => handleCheckboxClick('subLocation', sublocation.sublocation)}
                                  checked={selectedSubLocation.includes(sublocation.sublocation)}
                                  id={sublocation} />
                                  <label htmlFor={sublocation}>{sublocation}</label>
                                </li>
                              ))} */}

                              {locationData.sublocations.map((sublocation) => (
                                <li key={sublocation}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input" 
                                    onChange={() => handleCheckboxClick('subLocation', sublocation)}
                                    checked={selectedSubLocation.includes(sublocation)}
                                    id={sublocation} />
                                  <label htmlFor={sublocation}>{sublocation}</label>
                                </li>
                              ))}

                            </div>
                          </div>
                        ))}
                          
                        </ul>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-3 mt-3">
                      <div className="selectBox">
                        <div className="selectBox__value" onClick={toggleIncallVisibility}>price (hourly incall)</div>
                        {/* {isIncallVisible && (
                        <div className="dropdown-menu">
                        {Array.isArray(uniqueIncalls?.uniqueIncallValues) && uniqueIncalls?.uniqueIncallValues.length > 0 ? (
                          uniqueIncalls.uniqueIncallValues.map((incallData, index) => (
                            <a key={index} href="#" className="dropdown-item">
                              {`£${incallData.incall} (${incallData.model_count})`}
                            </a>
                          ))
                        ) : (
                          <p>Loading or no data available</p>
                        )}
                          
                        </div>
                        )} */}

                        {isIncallVisible && (
                          <div className="dropdown-menu">
                            {Array.isArray(uniqueIncalls?.uniqueIncallValues) && uniqueIncalls?.uniqueIncallValues.length > 0 ? (
                              uniqueIncalls.uniqueIncallValues.map((incallData, index) => (
                                <div key={index} className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`incall-${index}`}
                                    onChange={() => handleCheckboxClick('incall', incallData.incall)}
                                    checked={selectedIncalls.includes(incallData.incall)}
                                  />
                                  <label className="form-check-label" htmlFor={`incall-${index}`}>
                                    {`£${incallData.incall} (${incallData.model_count})`}
                                  </label>
                                </div>
                              ))
                            ) : (
                              <p>Loading or no data available</p>
                            )}
                          </div>
                        )}

                     


                      </div>
                    </div>
                    <div className="col-lg-3 mt-3">
                      <div className="selectBox">
                        <div className="selectBox__value" onClick={toggleOutcallVisibility}>price (hourly outcall)</div>
                        {/* {isOutcallVisible && (
                        <div className="dropdown-menu">
                        {Array.isArray(uniqueOutcalls?.uniqueOutcallValues) && uniqueOutcalls?.uniqueOutcallValues.length > 0 ? (
                          uniqueOutcalls.uniqueOutcallValues.map((outcallData, index) => (
                            <a key={index} href="#" className="dropdown-item">
                              {`£${outcallData.outcall} (${outcallData.model_count})`}
                            </a>
                          ))
                        ) : (
                          <p>Loading or no data available</p>
                        )}
                          
                        </div>
                        )} */}
                        {isOutcallVisible && (
                          <div className="dropdown-menu">
                            {Array.isArray(uniqueOutcalls?.uniqueOutcallValues) && uniqueOutcalls?.uniqueOutcallValues.length > 0 ? (
                              uniqueOutcalls.uniqueOutcallValues.map((outcallData, index) => (
                                <a key={index} href="#" className="dropdown-item" onClick={() => handleRadioChange('outcall', outcallData.outcall)}>
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    id={`outcall-${index}`}
                                    style={{border: 'none'}}
                                    checked={selectedOutcall === outcallData.outcall}
                                  />
                                  {`£${outcallData.outcall} (${outcallData.model_count})`}
                                </a>
                              ))
                            ) : (
                              <p>Loading or no data available</p>
                            )}
                          </div>
                        )}

                      </div>
                    </div>
                    <div className="text-center mt-5" onClick={handleShowGirls}>
                      <button className="btn-dark-outline py-2 px-5 "><span className="px-4">Show Girls</span></button>
                    </div>

                    {/* <div className="filter-contant col-12">
                      <h5><span>characteristics</span> ‘22’,’24’, ‘brazilian’, ‘spanish’</h5>
                      <h5><span>price (hourly outcall)</span> ‘400’</h5>
                      <h5><span>price (hourly outcall)</span> ‘400’</h5>
                      <h5><span>location</span> ‘euston’, ‘st albans’, ‘watford’, ‘westminster’, ‘uxbridge’ Girls </h5>
                      <h5 />
                    </div> */}

                    {selectedFilters.length > 0 && (
                            <div className="filter-contant col-12">
                              {selectedFilters.map((filter, index) => (
                                <h5 key={index}>{filter}</h5>
                              ))}
                            </div>
                    )}


                  </div>
                </div>
              </div>
              <div className="row px-4 gx-lg-5">
                
              {modelsData.map((model) => (
                <div className="col-lg-5-1 col-md-6" key={model.id}>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="product-card">
                        <div className="img-wraper">
                            <img className="img-fluid" src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.featuredImage}`} />
                            <div className="img-bage"><span>new girl</span></div>
                        </div>
                        <div className="product-card-body">
                            <h5>{model.name}</h5>
                            <h6>{model.location}</h6>
                            <p><span>incall £XXX</span> <span>Outcall £XXX</span></p>
                        </div>
                    </a>
                </div>
            ))}



              </div>
            </div>
          </section>
          {/* infomodal trigger modal */}
          {/* Modal */}
          <div className="modal fade infoGirl-modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header p-0">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
                </div>
                <div className="modal-body">
                  <div className="row mx-0">
                    <div className="col-lg-4">
                      <div className="product-card">
                        <div className="img-wraper">
                          <img className="img-fluid" src="assets/images/girs (5).jpg" />
                          <div className="img-bage"><span>new girl</span></div>
                        </div>
                        <div className="product-card-body">
                          <div>
                            <h5>natalie dior</h5>
                            <h6>westminster, london</h6>
                            <p><span>incall £XXX</span> <span>Outcall £XXX</span></p>
                          </div>
                          <div><a href="#">BOOK ME</a></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <h5>Rates</h5>
                      <div className="row">
                        <div className="col-4">
                          <p>duration</p>
                        </div>
                        <div className="col-4">
                          <p>incall</p>
                        </div>
                        <div className="col-4">
                          <p>outcall</p>
                        </div>
                        <div className="col-4">
                          <p>30 mins</p>
                        </div>
                        <div className="col-4">
                          <p>£150</p>
                        </div>
                        <div className="col-4">
                          <p>£250</p>
                        </div>
                        <div className="col-4">
                          <p>45 mins</p>
                        </div>
                        <div className="col-4">
                          <p>£175</p>
                        </div>
                        <div className="col-4">
                          <p>£275</p>
                        </div>
                        <div className="col-4">
                          <p>1 hour</p>
                        </div>
                        <div className="col-4">
                          <p>£200</p>
                        </div>
                        <div className="col-4">
                          <p>90 mins</p>
                        </div>
                        <div className="col-4">
                          <p>£250</p>
                        </div>
                        <div className="col-4">
                          <p>2 hours</p>
                        </div>
                        <div className="col-4">
                          <p>£250</p>
                        </div>
                        <div className="col-4">
                          <p>3 Hour</p>
                        </div>
                        <div className="col-4">
                          <p>£275</p>
                        </div>
                        <div className="col-4">
                          <p>£355</p>
                        </div>
                      </div>
                      <h5>stats</h5>
                      <div className="row">
                        <div className="col-6">
                          <p>age</p>
                        </div>
                        <div className="col-6">
                          <p>27</p>
                        </div>
                        <div className="col-6">
                          <p>nationality</p>
                        </div>
                        <div className="col-6">
                          <p>eastern european</p>
                        </div>
                        <div className="col-6">
                          <p>dress size</p>
                        </div>
                        <div className="col-6">
                          <p>9</p>
                        </div>
                        <div className="col-6">
                          <p>height</p>
                        </div>
                        <div className="col-6">
                          <p>170cms</p>
                        </div>
                        <div className="col-6">
                          <p>hair colour</p>
                        </div>
                        <div className="col-6">
                          <p>brunette</p>
                        </div>
                      </div>
                      <h5>available services</h5>
                      <div className="row">
                        <div className="col-6">
                          <p>cim</p>
                        </div>
                        <div className="col-6">
                          <p>dfk</p>
                        </div>
                        <div className="col-6">
                          <p>party girl</p>
                        </div>
                        <div className="col-6">
                          <p>gfe</p>
                        </div>
                        <div className="col-6">
                          <p>roleplay</p>
                        </div>
                        <div className="col-6">
                          <p>uniforms</p>
                        </div>
                        <div className="col-6">
                          <p>COB</p>
                        </div>
                        <div className="col-6">
                          <p>incall</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <h5>about me</h5>
                      <p>DONNA is a breathtaking, captivating, and caring Russian young lady. She has a courageous, confident, and compassionate personality with flawless, sublime, and graceful beauty. Meeting her is one experience, and listening to her energetic voice is another captivating thing you never know.</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <img className="listing-img img-fluid" src="assets/images/HOMEPAGE_BOTTOM_LEFT 1.png" />
                    </div>
                    <div className="col-lg-4">
                      <img className="listing-img img-fluid" src="assets/images/girs (1).jpg" />
                    </div>
                    <div className="col-lg-4">
                      <img className="listing-img img-fluid" src="assets/images/girs (2).jpg" />
                    </div>
                    <div className="col-lg-4">
                      <img className="listing-img img-fluid" src="assets/images/girs (3).jpg" />
                    </div>
                    <div className="col-lg-4">
                      <img className="listing-img img-fluid" src="assets/images/girs (4).jpg" />
                    </div>
                    <div className="col-lg-4">
                      <img className="listing-img img-fluid" src="assets/images/girs (5).jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
}

export default Product;