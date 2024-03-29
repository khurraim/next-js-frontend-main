import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NewHeader from "./components/NewHeader";
import Modal from "./components/Modal";
import NewFooter from "./components/NewFooter";

import { formatDistanceToNow } from 'date-fns';


const products = () => {

    const [modelsData, setModelsData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [filtersApplied, setFiltersApplied] = useState(false);

    const [rates, setRates] = useState({});

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
  const [selectedIncalls, setSelectedIncalls] = useState();
  const [selectedOutcall, setSelectedOutcall] = useState(null);

  const [id, selectedId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10; // Number of models per page

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleLoadMore = () => {
    // Increment the current page and fetch more models
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
  // axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-filtered-models`)
  // .then((response)=>{
  //   setModelsData(response.data);
  // })
  // .catch((error)=>{console.log("Error fetching models : ",error)});
  handleShowGirls();
  
},[filtersApplied]);



useEffect(()=>{
  // Fetch services for each model
  const fetchRates = async () => {
    const ratesData = {};

    for (const record of modelsData) {
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

  if (modelsData.length > 0) {
    fetchRates();
  }
},[modelsData]);

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


  

  const resetFilters = () => {
    setSelectedAges([]);
    setSelectedDressSizes([]);
    setSelectedIncalls(null);
    setSelectedOutcall(null);
    setSelectedNationalities([]);
    setSelectedSubLocation([]);
    setFiltersApplied(false);
    
  }

  const  handleShowGirls = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-filtered-models`;

    const filters = {};

    setFiltersApplied(true);


    // Hide the dropdowns when filters applied
    setIsCharacteristicsVisible(false);
    setIsLocationsVisible(false);
    setIsIncallVisible(false);
    setIsOutcallVisible(false);

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

    if (selectedIncalls) {
      filters.incall = selectedIncalls;
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
 
     // Update the state
     setSelectedFilters(newSelectedFilters);

    console.log("Filters are : ", filters);

    // await axios.get(apiUrl, { params: filters })
    //   .then((response) => {
    //     //setModelsData(response.data);
    //     if (response.data.length === 0) {
    //       setModelsData([]); // Set to an empty array when no models are found
    //     } else {
    //       setModelsData(response.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Error fetching models:', error);
    //   });

    try {
      const response = await axios.get(apiUrl, { params: filters });
      const filteredModels = response.data;
  
      const sortedModels = filteredModels.sort((a, b) => {
        const priorityOrderMap = {
          'Top 1': 1,
          'Top 2': 2,
          'Top 3': 3,
          'Top 4': 4,
          'Top 5': 5,
          'Normal': 6,
        };
      
        const priorityA = priorityOrderMap[a.priority] || 6; // Default to 6 if not found in the map
        const priorityB = priorityOrderMap[b.priority] || 6;
      
        return priorityA - priorityB;
      });

      setModelsData(sortedModels);

  
      
    } catch (error) {
      console.log('Error fetching models:', error);
    }


  };

  const openModal = async (modelId) => {
    setShowModal(true);
    selectedId(modelId);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const isNewModel = (createdAt) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(createdAt) > oneMonthAgo;
  };


    return (


<>
<NewHeader />
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
        <div className="col-lg-8 col-md-12 mx-auto">
          <div className="row">
            <div className="col-lg-3 col-md-3 mt-3">
              <div id="list1" className="dropdown-check-list" tabIndex={100}>
                <span className="anchor" onClick={toggleCharacteristicsVisibility}>Characteristics</span>
                {isCharacteristicsVisible && (
                    <ul id="items" className="items">
                    <h5>Age</h5>
                    {uniqueAges.filter((age) => age !== null).map((age) => (
                        <li><input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={age} 
                        onChange={() => handleCheckboxClick('age', age)}
                        checked={selectedAges.includes(age)}
                        /> <label htmlFor={22}>{age}</label> </li>
                    ))}
                    <h5>Nationality</h5>
                    {uniqueNationality.filter((nationality) => nationality.nationality !== null).map((nationality) => (<>
                        <li><input
                        onChange={() => handleCheckboxClick('nationality', nationality.nationality)}
                        checked={selectedNationalities.includes(nationality.nationality)}
                        className="form-check-input" 
                        type="checkbox" id={nationality} /><label htmlFor="brazilian">{nationality.nationality} </label></li>
                    </>))}
                    {/* <li><input className="form-check-input" type="checkbox" id="brazilian" /><label htmlFor="brazilian">brazilian </label></li>
                    <li><input type="checkbox" className="form-check-input" id="eastern" /><label htmlFor="eastern">eastern european</label> </li>
                    <li><input type="checkbox" className="form-check-input" id="spanish" /><label htmlFor="spanish">spanish</label></li> */}
                    <h5>DRESS SIZE</h5>
                    {uniqueDressSizes.filter((dressSize) => dressSize.dressSize !== null).map((dressSize) => (
                        <li><input 
                        type="checkbox" 
                        className="form-check-input" 
                        id={dressSize} 
                        checked={selectedDressSizes.includes(dressSize.dressSize)}
                        onChange={() => handleCheckboxClick('dressSize', dressSize.dressSize)}
                        /><label htmlFor={dressSize}>{dressSize.dressSize} </label></li>
                    ))}
                    
                    </ul>
                )}
              </div>
            </div>
            <div className="col-lg-3 col-md-3 mt-3">
              <div id="list2" className="dropdown-check-list2" tabIndex={100}>
                <span className="anchor2"  onClick={toggleLocationsVisibility}>Location</span>
                {isLocationsVisible && (
                <ul id="items2" className="items2">
                    {uniqueLocations.map((locationData) => (
                        <>
                        <h5 >{locationData.location}</h5>
                        {locationData.sublocations.map((sublocation) => (
                            <li>
                                <input 
                                type="checkbox" 
                                className="form-check-input" 
                               
                                onChange={() => handleCheckboxClick('subLocation', sublocation)}
                                checked={selectedSubLocation.includes(sublocation)}
                                id={sublocation}
                                /> 
                                <label htmlFor={sublocation}>{sublocation}</label>
                            </li>
                            
                        ))}
                        </>
                    ))}
                  
                </ul>
                )}
              </div>
            </div>
            <div className="col-lg-3 col-md-3 mt-3">
              <div className="selectBox">
                <div className="selectBox__value" onClick={toggleIncallVisibility}>
                    {selectedIncalls ? (<>
                      £ &nbsp;{selectedIncalls}
                    </>): 'price (hourly incall)' }
                </div>
                {isIncallVisible && (
                <div className="dropdown-menu">
                    {uniqueIncalls?.uniqueIncallValues?.map((incall,index) => (
                        <a href="#" onClick={()=> {setSelectedIncalls(incall.incall); setIsIncallVisible(false); }} className="dropdown-item">£{incall.incall} ({incall.model_count})</a>
                    ))}
                </div>
                )}
              </div>
            </div>
            <div className="col-lg-3 col-md-3 mt-3">
              <div className="selectBox">
                <div className="selectBox__value"  onClick={toggleOutcallVisibility} >
                {selectedOutcall ? (<>
                  £ &nbsp; {selectedOutcall}
                    </>): 'price (hourly outcall)' }
                </div>
                {isOutcallVisible && (
                <div className="dropdown-menu">
                  {uniqueOutcalls?.uniqueOutcallValues?.map((outcall,index) => (
                        <a href="#" onClick={()=>{setSelectedOutcall(outcall.outcall); setIsOutcallVisible(false);}} className="dropdown-item">£{outcall.outcall} ({outcall.model_count})</a>
                    ))}
                  
                </div>
                )}
              </div>
            </div>

            <div className="text-center mt-lg-5 mt-4 mb-2" >
              <button onClick={handleShowGirls} className="btn-dark-outline py-2 px-5 "><span className="px-4">Show Girls</span></button>
            </div>

            {/* <div className="text-center" onClick={resetFilters}>
              <button className="btn-dark-outline py-2 px-5 "><span className="px-4">Reset Filters</span></button>
            </div> */}

            <div className="text-center mt-3">
              <a href='#'><span className="px-4"  onClick={resetFilters}>Reset Filters</span></a>
            </div>

            

            {filtersApplied && (
              <div class="filter-contant col-12">

								<h5>
                  
                {(selectedAges.length > 0 || selectedDressSizes.length > 0 || selectedNationalities.length > 0) && (
                  <span>characteristics</span> 
                )}
                

                  {selectedAges.length > 0 && (
                    <>
                      ‘{selectedAges.join(',')}’,
                    </>
                  )}
                  
                  {selectedDressSizes.length > 0 && (
                    <>
                      ‘{selectedDressSizes.join(',')}’,
                    </>
                  )}
                  

                  {selectedNationalities > 0 && (
                    <>
                      ‘{selectedNationalities.join(',')}’
                    </>
                  )}
                  
                
                </h5>
								
                {selectedIncalls && (
                  <h5><span>price (hourly incall)</span> ‘{selectedIncalls}’</h5>
								)}

                {selectedOutcall && (
                <h5><span>price (hourly outcall)</span> {selectedOutcall}</h5>
                )}

                {selectedSubLocation.length > 0 && (
                <h5><span>location</span> ‘{selectedSubLocation.join("‘,’")}’ </h5>
                )}

								<h5></h5>
						  </div>
            )}
            

          

          </div>
        </div>
      </div>
      <div className="row ">
        
        {modelsData.length === 0 ? (
            <p>No models found.</p>
          ) : (
        modelsData.slice(0, endIndex).map((model) => {
              const modelRates = rates[model.id];

            return (
            <div className="col-lg-5-1 col-md-6 col-sm-6" onClick={() => openModal(model.id)} >
            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="product-card">
              <div className="img-wraper">
                {model.featuredImage ? (
                <img className="img-fluid" src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${model.featuredImage}`} />
                ): (
                <img className="img-fluid" src="images/female.jpg"/> 
                )
                }

                {/* <div className="img-bage"><span>new girl</span></div> */}
                {isNewModel(model.created_at) && <div className="img-bage"><span>new girl</span></div>}
              </div>
              <div className="product-card-body">
                <h5>{model.title}</h5>
                <h6>{model.subLocation}, {model.location}</h6>
                
                    {/* Check if rates exist for the model */}
                    {modelRates && modelRates.length > 0 && (
                        <p>
                            <span>Incall £{modelRates[modelRates.length - 1].incall}</span>
                            <span>Outcall £{modelRates[modelRates.length - 1].outcall}</span>
                        </p>
                    )}

                    {/* <p><span>incall £XXX</span> <span>Outcall £XXX</span></p> */}
              </div>
            </a>
            </div>
          )})

          )}
      </div>

      {endIndex > modelsData.length ? ' ' : 
      <button 
      onClick={handleLoadMore} 
      style={{border: 'none'}} 
      className="d-block px-5 mt-5 py-3 mx-auto bg-dark text-white">
        Load More
      </button>
      }
      

      

    </div>
  </section>
  {/* infomodal trigger modal */}

  {showModal && 
     <Modal 
    id={id}
    onClose={closeModal} 
    />
    }
  
</main>
<NewFooter/>

</>
    )
}

export default products;