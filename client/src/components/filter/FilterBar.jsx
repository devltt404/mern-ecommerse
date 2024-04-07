import { useState } from "react";
import { MdFilterListAlt } from "react-icons/md";
import Sidebar from "../sidebar/Sidebar.jsx";
import FilterMenu from "./FilterMenu.jsx";

const FilterBar = ({ setFilterOptions, filterOptions }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          ToggleButton={
            <button
              type="button"
              className="glow fixed bottom-10 right-12 z-10 flex items-center gap-1 rounded-md border-2 bg-black px-4 py-2 text-white transition hover:scale-110 hover:shadow-xl md:right-4"
            >
              <MdFilterListAlt size={25} />
              <span>Filter Products</span>
            </button>
          }
        >
          <div className="px-6 py-8">
            <FilterMenu
              filterOptions={filterOptions}
              setShowSidebar={setShowSidebar}
              setFilterOptions={setFilterOptions}
            />
          </div>
        </Sidebar>
      </div>

      <div className="hidden w-60 min-lg:block">
        <FilterMenu
          filterOptions={filterOptions}
          setShowSidebar={setShowSidebar}
          setFilterOptions={setFilterOptions}
        />
      </div>
    </>
  );
};

export default FilterBar;
