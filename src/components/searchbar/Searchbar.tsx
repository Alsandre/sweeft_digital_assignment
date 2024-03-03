import { ChangeEvent, useEffect, useState } from "react";
import styles from "./searchBar.module.css";
import { TSearchBarProps } from "../../types";

export const Serachbar: React.FC<TSearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 900);
    return () => clearTimeout(timeout);
  }, [searchTerm]);
  return (
    <input
      type="text"
      className={styles["search-bar"]}
      value={searchTerm}
      name="search"
      onChange={handleInputChange}
      placeholder="Search for image. I.e: toad"
    />
  );
};
