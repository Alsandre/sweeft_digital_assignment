import { ChangeEvent, useState } from "react";
import styles from "./searchBar.module.css";

export const Serachbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <input
      type="text"
      className={styles["search-bar"]}
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Search for image. I.e: toad"
    />
  );
};
