import React, { createContext, useState, useContext } from "react";

// Create the context
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [prod , setProd] = useState([]);
  const [camp, setCamp] = useState([]);
  const [selectedProd, setSelectedProd] = useState([]);
  const [order, setOrder] = useState([]);



  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults ,prod, setProd, camp, setCamp , selectedProd, setSelectedProd, order, setOrder}}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the context in any component
export const useSearch = () => useContext(SearchContext);