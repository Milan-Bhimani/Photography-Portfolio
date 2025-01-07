import React, { useState, useEffect } from 'react';
import { createItem, fetchUserItems, deleteItem } from '../services/api';

const Personaldata = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [view, setView] = useState(''); // Initially no view selected

  useEffect(() => {
    const getUserItems = async () => {
      try {
        const { data } = await fetchUserItems();
        setItems(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch items. Please try again.');
      }
    };

    if (view === 'uploaded') {
      getUserItems(); // Only fetch items if 'Uploaded' view is selected
    }
  }, [view]); // Fetch items when the view changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const { data } = await createItem(formData);
      setItems([...items, data]);
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error(error);
      setError('Failed to upload the photo. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
      setError('Failed to delete the photo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-teal-400 mb-8">Personal Data</h1>

        {/* Show Options: Upload or Uploaded */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setView(view === 'upload' ? '' : 'upload')} // Toggle upload form visibility
            className={`px-6 py-3 mr-4 rounded-lg font-semibold text-lg transition duration-300 ease-in-out ${view === 'upload' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-200'} hover:bg-teal-700`}
          >
            Upload
          </button>
          <button
            onClick={() => setView(view === 'uploaded' ? '' : 'uploaded')} // Toggle uploaded items view
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 ease-in-out ${view === 'uploaded' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-200'} hover:bg-teal-700`}
          >
            Uploaded
          </button>
        </div>

        {/* Render Upload Form or Uploaded Photos Based on View */}
        {view === 'upload' && (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="w-full p-4 bg-teal-600 rounded-lg text-white font-semibold text-lg transition duration-300 ease-in-out hover:bg-teal-700"
            >
              Upload Photo
            </button>
          </form>
        )}

        {view === 'uploaded' && (
          <div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Your Uploaded Photos</h2>
            <ul>
              {items.map((item) => (
                <li key={item._id} className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                  <img
                    src={`http://localhost:5000${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-auto mt-4 rounded-lg"
                  />
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-4 px-6 py-3 bg-red-600 rounded-lg text-white text-lg font-semibold transition duration-300 ease-in-out hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personaldata;
