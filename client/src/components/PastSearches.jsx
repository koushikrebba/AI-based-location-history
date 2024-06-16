import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

function PastSearches() {
    const [searches, setSearches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({}); // State to manage expanded items

    // Retrieve user email from localStorage
    const email = localStorage.getItem('user');

    useEffect(() => {
        if (!email) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const fetchSearches = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/past-search/${email}`);
                if (isMounted) {
                    setSearches(response.data);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Failed to fetch past searches:', error);
                    setError('Failed to fetch past searches. Please try again later.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchSearches();

        return () => {
            isMounted = false; // Cleanup function
        };
    }, [email]);

    const toggleExpand = (index) => {
        setExpanded(prevState => ({ ...prevState, [index]: !prevState[index] }));
    };

    if (loading) {
        return <p>Loading user data...</p>; // Display a loading message while fetching data
    }

    if (error) {
        return <p>{error}</p>; // Display error message if there was an issue fetching data
    }

    return (
        <div>
            <Navbar />
            {searches.length > 0 ? (
                <div className='p-5 bg-dark text-white mt-5 ms-2 me-2 rounded-3 mb-5'>
                    <ul className="list-group">
                        {searches.slice().reverse().map((search, index) => (
                            <li key={index} className="list-group-item mb-3">
                                <div><strong>City:</strong> {search.city}</div>
                                <div>
                                    {expanded[index] ? (
                                        <>
                                            <strong>History:</strong>
                                            <ul className="list-group">
                                                {search.history.split('\n\n').map((item, idx) => (
                                                    <li key={idx} className="list-group-item">{item}</li>
                                                ))}
                                            </ul>
                                            <strong>Events:</strong>
                                            <ul className="list-group">
                                                {search.events.split('\n').map((item, idx) => (
                                                    <li key={idx} className="list-group-item">{item}</li>
                                                ))}
                                            </ul>
                                            <strong>Importance:</strong>
                                            <ul className="list-group">
                                                {search.importance.split('**').map((item, idx) => (
                                                    <li key={idx} className="list-group-item">{item}</li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <>
                                            <strong>History:</strong>
                                            <ul className="list-group">
                                                <li className="list-group-item">{search.history.split('\n\n')[0]}</li>
                                            </ul>
                                        </>
                                    )}
                                    <button className="btn btn-link" onClick={() => toggleExpand(index)}>
                                        {expanded[index] ? 'Read Less' : 'Read More'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className='text-center text-3xl' style={{paddingBottom:"300px",paddingTop:"300px"}}>No past searches found.</p>
            )}
            <Footer />
        </div>
    );
}

export default PastSearches;
