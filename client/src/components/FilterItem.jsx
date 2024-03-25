const FilterItem = ({ children, title }) => {
  return (
    <div className="mb-2">
      <h3 className="mb-1 font-medium">{title}</h3>

      {children}
    </div>
  );
};

export default FilterItem;
