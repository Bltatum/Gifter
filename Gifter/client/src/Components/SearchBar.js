import React, { useRef } from "react";

export const SearchBar = ({ setTerms }) => {
  const { terms } = useRef();

  return (
    
      <div className="row justify-content-center" >
        <input
          onKeyUp={(e) => setTerms(e.target.value)}
          type="text"
          id="searchTerms"
          ref={terms}
          required
          autoFocus
          placeholder="Search Post"
          className="form-control"
        />
      </div>
    
  );
};