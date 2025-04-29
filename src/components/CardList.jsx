// components/CardList.jsx
import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 9; // products per page
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data);

  // Handle Search by tag
  const filterTags = (searchTerm) => {
    const filtered = data.filter(product =>
      product.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setProducts(filtered);
    setOffset(0); // Reset to first page after search
  };

  // Pagination functions
  const handlePrevious = () => {
    if (offset >= limit) setOffset(offset - limit);
  };

  const handleNext = () => {
    if (offset + limit < products.length) setOffset(offset + limit);
  };

  // Slice the products array to show current page
  const getPaginatedProducts = () => {
    return products.slice(offset, offset + limit);
  };

  return (
    <div className="pa3">
      {/* Search */}
      <Search handleSearch={filterTags} />

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center">
        {getPaginatedProducts().map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center mt4">
        <Button text="Previous" handleClick={handlePrevious} />
        <span className="mh3">Page {Math.floor(offset / limit) + 1}</span>
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;