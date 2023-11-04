import React, { useState } from 'react';
import './Styles.css'

const SearchBar: React.FC<{ onSearch: (category: string,text:string) => void }> = ({ onSearch }) => {
  const [category, setCategory] = useState('Name');
  const [text,setText] = useState('');

  const handleSearch = () => {
    onSearch(category,text);
  };

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target
    setCategory(value)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by category"
        onChange={(e) => setText(e.target.value)}
      />
      <select className='select' id='category' name='category'  onChange={handleChange}>
          <option value='Name'>Name</option>
          <option value='Specialty'>Specialty</option>
          <option value='Location'>Location</option>
      </select>
      <button onClick={handleSearch}>Search</button>

    </div>
  );
};

export default SearchBar;
