import React from "react";

const Filtering = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
    allItems,
  } = props;
  return (
    <ul className="list-group">
      <li className="list-group-item" onClick={() => allItems}>
        All Genres
      </li>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filtering.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default Filtering;
