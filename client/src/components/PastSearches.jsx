import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

function PastSearches() {
    const [searches, setSearches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve user email from localStorage
    const email = localStorage.getItem('user');

    useEffect(() => {
        if (!email) {
            setLoading(false);
            return; // Exit early if no email is found
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

    if (loading) {
        return <p>Loading user data...</p>; // Display a loading message while fetching data
    }

    if (error) {
        return <p>{error}</p>; // Display error message if there was an issue fetching data
    }

    return (
        <div>
            <Navbar/>
            {searches.length > 0 ? (
                <ul>
                    {searches.map((search, index) => (
                        <li key={index}>
                            <div><strong>City:</strong> {search.city}</div>
                            <div>
                                <strong>History:</strong>
                                <ul>
                                    {search.history.split('\n\n').map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <strong>Events:</strong>
                                <ul>
                                    {search.events.split('\n').map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <strong>Importance:</strong>
                                <ul>
                                    {search.importance.split('**').map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center text-3xl' style={{paddingBottom:"300px",paddingTop:"300px"}}>No past searches found.</p>
            )}
            <Footer/>
        </div>
    );
}

export default PastSearches;
