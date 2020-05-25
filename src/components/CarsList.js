import React from "react";
import { Link } from "react-router-dom";

import currencyFormatter from "../util/currencyFormatter";

function CarsList({
  cars,
  filterCriteria,
  searchInput,
  onSearchChange,
  handleCarMakerFilterChange,
  changePriceRange,
  changeAgeRange,
  toggleFilterPanel,
  handleToggleFilterPanel,
}) {
  return (
    <div className="cars-list_container">
      {/* Filtering Panel */}
      <div className="filtering-panel">
        <h3>
          Filters
          <button id="toggle-filter-panel" onClick={handleToggleFilterPanel}>
            {toggleFilterPanel ? "-" : "+"}
          </button>
        </h3>

        {toggleFilterPanel && (
          <div className="filtering-panel_wrapper">
            <h4 className="filter-title">Car Maker</h4>
            <ul id="car-maker-list">
              {filterCriteria.carMakers.map((carMaker, index) => (
                <li key={index}>
                  <label htmlFor={carMaker.name}>
                    <input
                      type="checkbox"
                      name={carMaker.name}
                      id={carMaker.name}
                      checked={carMaker.selected}
                      onChange={() => handleCarMakerFilterChange(carMaker.id)}
                    />
                    {carMaker.name}
                  </label>
                </li>
              ))}
            </ul>

            <h4 className="filter-title">Car Model Year</h4>
            <div className="make-year-range">
              <input
                type="text"
                placeholder="From"
                value={filterCriteria.yearFrom}
                onChange={(evt) => changeAgeRange(evt, "from")}
              />
              <input
                type="text"
                placeholder="To"
                value={filterCriteria.yearTo}
                onChange={(evt) => changeAgeRange(evt, "to")}
              />
            </div>

            <h4 className="filter-title">Price Range</h4>
            <div className="make-year-range">
              <input
                type="text"
                placeholder="From"
                value={filterCriteria.priceFrom}
                onChange={(evt) => changePriceRange(evt, "from")}
              />
              <input
                type="text"
                placeholder="To"
                value={filterCriteria.priceTo}
                onChange={(evt) => changePriceRange(evt, "to")}
              />
            </div>
          </div>
        )}
      </div>

      {/* Cars grid to display list of all cars card */}
      <div className="cars-grid">
        <div className="search-panel">
          <input
            id="car-search-box"
            type="text"
            placeholder="Search Car Model or Maker"
            onChange={onSearchChange}
            value={searchInput}
          />
        </div>

        <ul className="cars-list">
          {cars.map((car) => (
            <Link
              key={car._id}
              to={{
                pathname: `/car-details/${car._id}`,
                state: {
                  carDetails: car,
                },
              }}
            >
              <li className="car-card" key={car._id}>
                <div className="maker-date">
                  <div className="car-maker">{car.make}</div>
                  <div className="date-added">{car.date_added}</div>
                </div>
                <div className="car-model">{car.model}</div>
                <div className="licenced">{car.licenced}</div>
                <div className="car-details">
                  <span className="year_model">{car.year_model}</span>
                  <span className="price">
                    {currencyFormatter.format(car.price)}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CarsList;
