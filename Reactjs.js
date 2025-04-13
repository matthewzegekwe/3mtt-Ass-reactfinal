import React, { useState, useEffect } from 'react';

// Reusable List Component
const ListComponent = ({ items, renderItem }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

// Parent Component
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>API Data List</h1>
      <ListComponent 
        items={data} 
        renderItem={(item) => (
          <div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        )}
      />
    </div>
  );
};

export default App;
