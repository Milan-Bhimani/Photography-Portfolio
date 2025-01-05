import React, { useState, useEffect } from 'react';
import { createItem, fetchItems, deleteItem } from '../services/api';

const PersonalData = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    getItems();
  }, []);

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
    <div className="container">
      <h1>Personal Data</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload Photo</button>
      </form>
      {error && <p className="error">{error}</p>}
      <h2>Your Uploaded Photos</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={`http://localhost:5000${item.imageUrl}`} alt={item.title} style={{ width: '100%', height: 'auto' }} />
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalData;
