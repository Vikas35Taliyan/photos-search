import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const InputSearch = () => {
  // State variables 
  const [searchTerm, setSearchTerm] = useState(''); //input search term
  const [photos, setPhotos] = useState([]); // stored fetched photos
  const [page, setPage] = useState(1); //current result 
  const [hasMore, setHasMore] = useState(true); // indicate if there are more photos to fetch
  const [loading, setLoading] = useState(false); //Flag to indicate if photos are currently being fetched


  //fetch photos from Flicker api
  const fetchPhotos = async () => {
    try {
      const apiKey ='47f2f41afb83f32c6b18e1bc1105c12b';
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${searchTerm}&page=${page}`
      );
      // console.log('Response:', response);
      const data = response.data; //api response data
      // console.log('Data:', data);
      const fetchedPhotos = data.photos.photo; // fetched photos
      // console.log('Fetched Photos:', fetchedPhotos);

      // Update state with fetched photos
      setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  // Handle search button click
  const handleSearch = () => {
    setPage(1);
    setPhotos([]);
    if (searchTerm !== '') {
      fetchPhotos();
    }
  };
   // Handle "Load More" button click
  const handleLoadMore = () => {
    setLoading(true);
    fetchPhotos();
  };
  // photo fetching when search term changes
  useEffect(() => {
    if (searchTerm !== '') {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="bg-gray-900 flex items-center py-10">
        <header className="max-w-md mx-auto w-full">
          <h2 className="text-white text-center text-3xl font-bold mb-5">Photo Search</h2>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for photos"
              className="bg-white-500 border-red-900 text-sm w-full indent-2 p-2.5 outline-none focus:border-red-500 focus:ring-2 rounded-tl rounded-bl"
            />
            <button onClick={handleSearch} className="bg-red-500 px-6 py-2.5 rounded-tr rounded-br">
              Search
            </button>
          </div>
        </header>
      </div>
      <InfiniteScroll
        dataLength={photos.length}
        next={handleLoadMore}
        hasMore={hasMore}
        // loader={<h4>Loading...</h4>}
        endMessage={<p>No more photos to load.</p>}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-10 mx-2">
        {photos.map((photo, index) => (
        <img
        key={`${photo.id}_${index}`}
        src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        alt={photo.title}
        />
       ))}
        </div>
      </InfiniteScroll>
      {loading && <p>Loading more photos...</p>}
    </div>
  );
};

export default InputSearch;