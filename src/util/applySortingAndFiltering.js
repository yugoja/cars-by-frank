function isCarMakerSelected(carMakers, selectedCarMaker) {
  return (
    carMakers.filter(
      (carMaker) => carMaker.name === selectedCarMaker && carMaker.selected
    ).length > 0
  );
}

/* Takes cars data, filter criteria applied in the filter panel and search box input.
Sorts the cars data in ascending order by date_added field. Filters out the data based
various filter criteria */

export default function applySortingAndFiltering({
  cars,
  searchInput,
  filterCriteria,
}) {
  cars.sort(function (a, b) {
    return new Date(a.date_added) - new Date(b.date_added);
  });

  /* Keep cars whose car maker is seleted in filter panel */
  let filteredCars = cars.filter((car) =>
    isCarMakerSelected(filterCriteria.carMakers, car.make)
  );

  if (filterCriteria.yearFrom.length) {
    filteredCars = filteredCars.filter((car) => {
      return car.year_model >= filterCriteria.yearFrom;
    });
  }

  if (filterCriteria.yearTo.length) {
    filteredCars = filteredCars.filter((car) => {
      return car.year_model <= filterCriteria.yearTo;
    });
  }

  if (filterCriteria.priceFrom.length) {
    filteredCars = filteredCars.filter((car) => {
      return car.price >= filterCriteria.priceFrom;
    });
  }

  if (filterCriteria.priceTo.length) {
    filteredCars = filteredCars.filter((car) => {
      return car.price <= filterCriteria.priceTo;
    });
  }

  if (searchInput.length) {
    return filteredCars.filter(
      (car) =>
        car.make.toLowerCase().includes(searchInput.toLowerCase()) ||
        car.model.toLowerCase().includes(searchInput.toLowerCase())
    );
  } else {
    return filteredCars;
  }
}
