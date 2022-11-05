import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMap } from "../../constants/map";
import { Stop } from "../../types/Stop";
import { getAllStops } from "../../util/api";
import styles from "./StopSearch.module.css";
interface StopSearchProps {
  stopState: [Stop, React.Dispatch<React.SetStateAction<Stop>>];
}
const StopSearch = ({ stopState }: StopSearchProps) => {
  const { data, isLoading } = useQuery("getStops", () => getAllStops());
  const stops = isLoading ? [] : (data as Stop[]);
  const [selectedStop, setSelectedStop] = stopState;
  const [searchQuery, setSearchQuery] = useState("");
  const handleQuery = (e: React.KeyboardEvent) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setSearchQuery(target.value);
    console.log("SETTING VALUE", target.value);
  };
  const [searchResults, setSearchResults] = useState([] as Stop[]);
  useEffect(() => {
    setSearchResults(
      searchQuery === ""
        ? []
        : stops
            ?.filter((el) => el.name.toLowerCase().includes(searchQuery))
            .slice(0, 10)
    );
  }, [searchQuery]);

  const handleResultClick = useCallback(
    (e: React.MouseEvent) => {
      const map = getMap();
      if (!map) return;
      const target = e.target as HTMLDivElement;
      const index = parseInt(target.getAttribute("search-index") as string);
      const stop = searchResults[index];
      console.log(map);
      map.setCenter(stop.location);
      map.setZoom(18);
      setSelectedStop(stop);
    },
    [searchResults]
  );

  console.log("RESULTS", searchResults);
  return (
    <div className={styles["SearchContainer"]}>
      <input placeholder="Enter a stop" onKeyUp={handleQuery}></input>
      <div className={styles["SearchResults"]}>
        {searchResults?.map((stop, i) => {
          return (
            <div
              onClick={handleResultClick}
              search-index={i}
              className={styles["SearchResult"]}
            >
              {stop.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StopSearch;
