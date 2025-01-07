import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';

const Globalfeed = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch items. Please try again.');
      }
    };

    getItems();
  }, []);

  return (
    <div className="container">
      <h1>Global Feed</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={`http://localhost:5000${item.imageUrl}`} alt={item.title} style={{ width: '100%', height: 'auto' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Globalfeed;
