import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';

const GlobalFeed = () => {
  const [items, setItems] = useState([]);

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

  return (
    <div className="container">
      <h1>Global Feed</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalFeed;
