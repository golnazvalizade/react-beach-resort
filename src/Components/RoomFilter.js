import React, { useContext } from "react";
import { RoomContext } from "../context";
import Title from "./Title";

const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

const RoomFilter = () => {
  const context = useContext(RoomContext);
  //   console.log(context);
  const {
    handleChange,
    rooms,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;

  let types = getUnique(rooms, "type");

  types = ["all", ...types];

  types = types.map((type, index) => {
    return (
      <option key={index} value={type}>
        {type}
      </option>
    );
  });

  let peoples = getUnique(rooms, "capacity");
  peoples = peoples.map((people, index) => {
    return (
      <option key={index} value={people}>
        {people}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            value={type}
            onChange={handleChange}
            id="type"
            className="form-control"
          >
            {types}
          </select>
        </div>
        {/* end select type */}
        {/* guese */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            value={capacity}
            onChange={handleChange}
            id="capacity"
            className="form-control"
          >
            {peoples}
          </select>
        </div>
        {/* end guese */}
        {/* room price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            name="price"
            type="range"
            onChange={handleChange}
            value={price}
            className="form-control"
            max={maxPrice}
            min={minPrice}
            id="price"
          />
        </div>
        {/* end room price */}
        {/* size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <input
            name="minSize"
            type="text"
            onChange={handleChange}
            value={minSize}
            className="size-input"
            id="size"
          />
          <input
            name="maxSize"
            type="text"
            onChange={handleChange}
            value={maxSize}
            className="size-input"
            id="size"
          />
        </div>
        {/* end of size */}
        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
        {/* end extras */}
      </form>
    </section>
  );
};

export default RoomFilter;
