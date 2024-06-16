import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeVideos = ({ place }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      setLoading(true);
      try {
        // Replace with your YouTube API key
        const API_KEY = 'AIzaSyCCSsBxfh8579ib9Q_s59of4S8-lRbI1u0';

        // Replace with your search query
        const query = `${place} travel guide`; // Example query

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: API_KEY,
            part: 'snippet',
            q: query,
            maxResults: 5, // Number of videos you want to fetch
            type: 'video',
          },
        });

        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (place) {
      fetchYouTubeVideos();
    }
  }, [place]); // Fetch videos whenever 'place' changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Videos about {place}</h2>
      <div className=''>
      <div className="video-list d-flex">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item mx-auto">
            <iframe
              title="YouTube Video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h3>{video.snippet.title}</h3>
            {/* <p>{video.snippet.description}</p> */}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default YouTubeVideos;