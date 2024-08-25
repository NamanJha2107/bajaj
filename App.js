import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      JSON.parse(input);
      setError(null);

      // Call the backend API
      const result = await axios.post('http://localhost:8080/bfhl', JSON.parse(input));

      // Set response
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON or API Error');
    }
  };

  const handleSelectChange = (options) => {
    setSelectedOptions(options);
  };

  const getFilteredResponse = () => {
    if (!response) return null;

    const selectedValues = selectedOptions.map(option => option.value);
    const filtered = {};

    if (selectedValues.includes('Alphabets') && response.alphabets) {
      filtered.alphabets = response.alphabets;
    }
    if (selectedValues.includes('Numbers') && response.numbers) {
      filtered.numbers = response.numbers;
    }
    if (selectedValues.includes('Highest lowercase alphabet') && response.highest_lowercase_alphabet) {
      filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return filtered;
  };

  return (
    <div className="App">
      <h1>21BLC1501</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            options={[
              { value: 'Alphabets', label: 'Alphabets' },
              { value: 'Numbers', label: 'Numbers' },
              { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
            ]}
            onChange={handleSelectChange}
            className="react-select-container"
          />
          <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default App;
