import React, { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Select from 'react-select';


function models() {
    const router = useRouter();

    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueAges, setUniqueAges] = useState([]); // State for unique age values
    const [uniqueNationality, setUniqueNationalities] = useState([]);
    const [uniquePrices, setUniquePrices] = useState([]);
    const [uniqueLocations, setUniqueLocations] = useState([]);
    const [uniqueDressSizes, setUniqueDressSizes] = useState([]);

    // Filters (age, nationality, price, location, dressSize)
    const [age, setAge] = useState(["all"]); // Initial value is an array with "all"
    //const [age, setAge] = useState("all");
    //const [nationality, setNationality] = useState("all");
    const [nationality, setNationality] = useState(["all"]);
    const [price, setPrice] = useState(["all"]);
    
    //const [location, setLocation] = useState("all");
    const [location, setLocation] = useState(["all"]);

    const [dressSize, setDressSize] = useState("all");

    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [itemsPerPage] = useState(12); // Items per page
    

    const handleAgeChange = (event) => {
        const selectedAges = Array.from(event.target.selectedOptions, (option) => option.value);
        setAge(selectedAges);
    
        const queryParams = new URLSearchParams();
    
        // Handle "all" case for ages
        if (selectedAges.length > 0) {
            queryParams.set('age', selectedAges.join(','));
        } else {
            queryParams.delete('age');
        }
    
        // Add other parameters to queryParams
        if (nationality !== 'all') {
            queryParams.set('nationality', nationality);
        }
    
        if (price !== 'all') {
            queryParams.set('price', price);
        }
    
        if (location !== 'all') {
            queryParams.set('location', location);
        }
    
        if (dressSize !== 'all') {
            queryParams.set('dressSize', dressSize);
        }
    
        router.push(`/Models?${queryParams.toString()}`);
    };

    


    const handleNationalityChange = (event) => {
        const selectedNationalities = Array.from(event.target.selectedOptions, (option) => option.value);
        setNationality(selectedNationalities);
        const queryParams = new URLSearchParams();
        if (selectedNationalities.length > 0) {
            queryParams.set('nationality', selectedNationalities.join(','));
        } else {
            queryParams.delete('nationality');
        }
        // Add other parameters to queryParams
        // if (age.length > 0 && age[0] !== 'all') {
        //     queryParams.set('age', age.join(','));
        // }
        if (price !== 'all') {
            queryParams.set('price', price);
        }
        if (location !== 'all') {
            queryParams.set('location', location);
        }
        if (dressSize !== 'all') {
            queryParams.set('dressSize', dressSize);
        }
        router.push(`/Models?${queryParams.toString()}`);
    };
    

  

    const handlePriceChange = (event) => {
        const selectedPrices = Array.from(event.target.selectedOptions, (option) => option.value);
        setPrice(selectedPrices);
        const queryParams = new URLSearchParams();
        if(selectedPrices,length > 0) {
            queryParams.set('price', selectedPrices.join(','));
        } else {
            queryParams.delete('price');
        }
    }

    // const handleLocationChange = (event) => {
    //     const selectedLocation = event.target.value;
    //     setLocation(selectedLocation);
    //     router.push (`/Models?age=${age}&nationality=${nationality}&price=${price}&location=${selectedLocation}`);
    // }

    const handleLocationChange = (event) => {
        const selectedLocation = Array.from(event.target.selectedOptions, (option) => option.value);
        setLocation(selectedLocation);
        const queryParams = new URLSearchParams();
        if(selectedLocation,length > 0) {
            queryParams.set('location', selectedLocation.join(','));
        } else {
            queryParams.delete('location');
        }
    }

    const handleDressSizeChange = (event) => {
        const selectedDressSize = event.target.value;
        setDressSize(selectedDressSize);
        router.push(`/Models?age=${age}&nationality=${nationality}&price=${price}&location=${location}&dressSize=${selectedDressSize}`);
    };

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
    
        router.push(`/Models?${queryParams.toString()}`);
    };
    

    // const resetFilters = () => {
    //     setAge("all");
    //     setNationality("all");
    //     setPrice("all");
    //     setLocation("all");
    //     setDressSize("all");
    // };

    const resetFilters = () => {
        setAge(["all"]);
        setNationality(["all"]);
        setPrice(["all"]);
        setLocation(["all"]);
        setDressSize(["all"]);
    };
    

    // useEffect(() => {
    //     axios
    //         .get(`http://127.0.0.1:8000/api/models?age=${age}&nationality=${nationality}&price=${price}&location=${location}&dressSize=${dressSize}`)
    //         .then((response) => {
    //             setModels(response.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log("Error fetching models: ", error);
    //         });
    // }, [age, nationality, price, location, dressSize, router]);

    // useEffect(() => {
    //     const ageQueryParam = Array.isArray(age) ? age.join(",") : age;
    //     axios
    //         .get(`http://127.0.0.1:8000/api/models?age=${ageQueryParam}&nationality=${nationality}&price=${price}&location=${location}&dressSize=${dressSize}`)
    //         .then((response) => {
    //             setModels(response.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.log("Error fetching models: ", error);
    //         });
    // }, [age, nationality, price, location, dressSize, router]);

    useEffect(() => {
        const ageQueryParam = Array.isArray(age) ? age.join(",") : age;
        const nationalityQueryParam = Array.isArray(nationality) ? nationality.join(",") : nationality;
        const priceQueryParam = Array.isArray(price) ? price.join(",") : price;
        const locationQueryParam = Array.isArray(location) ? location.join(",") : location;
        
        axios
            .get(`http://127.0.0.1:8000/api/models?age=${ageQueryParam}&nationality=${nationalityQueryParam}&price=${priceQueryParam}&location=${locationQueryParam}&dressSize=${dressSize}`)
            .then((response) => {
                setModels(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching models: ", error);
            });
    }, [age, nationality, price, location, dressSize, router]);
    
    

        // this hook is rendering ages in the filters column
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/models/unique-ages`)
        .then((response) => {
            setUniqueAges(response.data);
        })
        .catch((error) => { console.log("Error fetching ages :", error) })
    },[]);

    // this hook is rendering nationalities in the filters column
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/models/unique-nationalities`)
        .then((response) => {
            setUniqueNationalities(response.data);
        })
        .catch((error) => { console.log("Error fetching nationalities :", error) })
    },[]);

    // this hook is rendering prices in the filters column
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/models/unique-prices`)
        .then((response)=>{
            setUniquePrices(response.data);
        })
        .catch((error) => { console.log("Error fetching prices :", error) })
    },[])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/models/unique-locations`)
        .then((response)=>{
            setUniqueLocations(response.data);
        })
        .catch((error) => { console.log("Error fetching locations :", error) })
    },[]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/models/unique-dress-sizes`)
        .then((response)=>{
            setUniqueDressSizes(response.data);
        })
        .catch((error) => { console.log("Error fetching locations :", error) })
    },[]);

    // Calculate the indexes of items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = models.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Layout>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-sm-2 col-md-2 col-lg-2 col-12">
                        <div className="card card-body">
                            <div className="card-title text-center">Filters</div>
                            
                            
                            {/* <div className="form-group">
                                <label className="form-label">Age Filter:</label>
                                <select className="form-control" value={age} onChange={handleAgeChange} multiple>
                                    <option value="all">All</option>
                                
                                    {uniqueAges.map((uniqueAge) => (
                                    <option key={uniqueAge} value={uniqueAge}>
                                        {uniqueAge}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Nationality Filter:</label>
                                <select className="form-control" value={nationality} onChange={handleNationalityChange} multiple>
                                    <option value="all">All</option>
                                    
                                    {uniqueNationality.map((uniqueNationality) => (
                                        <option key={uniqueNationality.nationality} value={uniqueNationality.nationality}>
                                            {uniqueNationality.nationality} ({uniqueNationality.count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Price Filter:</label>
                                <select className="form-control" value={price} onChange={handlePriceChange} multiple>
                                    <option value="all">All</option>
                                    
                                    {uniquePrices.map((uniquePrice) => (
                                        <option key={uniquePrice.price} value={uniquePrice.price}>
                                            {uniquePrice.price} ({uniquePrice.count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Location Filter:</label>
                                <select className="form-control" value={location} onChange={handleLocationChange} multiple>
                                    <option value="all">All</option>    
                                    {uniqueLocations.map((uniqueLocation) => (
                                    <option key={uniqueLocation.location} value={uniqueLocation.location}>
                                        {uniqueLocation.location} ({uniqueLocation.count})
                                    </option>
                                    ))}
                                </select>
                            </div> */}

                            {/* Age Filter */}
<div className="form-group">
    <label className="form-label">Age Filter:</label>
    <Select
        value={age.map((a) => ({ label: a, value: a }))}
        onChange={(selectedOptions) => {
            const selectedAges = selectedOptions.map((option) => option.value);
            setAge(selectedAges);
            handleFilterChange({ age: selectedAges, nationality, price, location, dressSize });
        }}
        options={uniqueAges.map((uniqueAge) => ({ label: uniqueAge, value: uniqueAge }))}
        isMulti
    />
</div>

{/* Nationality Filter */}
<div className="form-group">
    <label className="form-label">Nationality Filter:</label>
    <Select
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
</div>

{/* Price Filter */}
<div className="form-group">
    <label className="form-label">Price Filter:</label>
    <Select
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
</div>

{/* Location Filter */}
<div className="form-group">
    <label className="form-label">Location Filter:</label>
    <Select
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
</div>





                            {/* Dress Size Filter */}
                            <div className="form-group">
                                <label className="form-label">Dress Size Filter:</label>
                                <select className="form-control" value={dressSize} onChange={handleDressSizeChange}>
                                    <option value="all">All</option>
                                    {/* Add dress size options */}
                                    {uniqueDressSizes.map((uniqueDressSize) => (
                                         <option key={uniqueDressSize.dressSize} value={uniqueDressSize.dressSize}>
                                             {uniqueDressSize.dressSize} ({uniqueDressSize.count})
                                         </option>
                                    ))}
                                </select>
                            </div>
                            <button type="button" onClick={resetFilters} className="btn btn-primary my-3">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-10 col-12">
                        {loading ? (
                            <p>Loading models...</p>
                        ) : currentItems.length === 0 ? (
                            <p>No models found.</p>
                        ) : (
                            <div className="row">
                                {currentItems.map((model) => (
                                    <div className="col-sm-3 col-md-3 col-lg-3 col-12" key={model.id}>                                
                                        <div className="card  mb-3">
                                            <img
                                            src={`http://127.0.0.1:8000/storage/${model.featuredImage}`}
                                            alt="Featured Image"
                                            style={{'height':'auto', 'width': '100%'}}
                                            />
                                            <div className="card-body">   
                                                {model.title}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Pagination Controls */}
                        <div className="text-center">
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(models.length / itemsPerPage) }).map((_, index) => (
                                    <li
                                        key={index + 1}
                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
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
    );
}

export default models;
