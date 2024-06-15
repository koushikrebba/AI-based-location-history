import React, { useState } from 'react';
import YouTubeVideos from './YouTubeVideos';

const YouTubeSearch = () => {
  const [place, setPlace] = useState('');
  const [searchedPlace, setSearchedPlace] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchedPlace(place);
    setSearching(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter a place"
        />
        <button type="submit" disabled={!place || searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchedPlace && <YouTubeVideos place={searchedPlace} />}
    </div>
  );
};

export default YouTubeSearch;