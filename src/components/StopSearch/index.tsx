import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllStops } from "../../util/api";
import styles from "./StopSearch.module.css";
const StopSearch = () => {
  const { data, isLoading } = useQuery("getStops", () => getAllStops());
  const stops = isLoading ? [] : data;
  const [searchQuery, setSearchQuery] = useState("");
  const handleQuery = (e: React.KeyboardEvent) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setSearchQuery(target.value);
    console.log(target.value);
  };

  return (
    <div>
      <input placeholder="Hello" onKeyDown={handleQuery}></input>
      {/* <div className */}
    </div>
  );
};
export default StopSearch;
