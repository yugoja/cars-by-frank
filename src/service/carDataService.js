/* Takes list of carMakers and prepares alphabetically ordered
list of carMakersobjects to be used in the filter panel */

function prepareCarMakersData(carMakers) {
  let carMakerIdCounter = 0;

  return carMakers
    .sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((carMaker) => ({
      name: carMaker,
      selected: true,
      id: carMakerIdCounter++,
    }));
}

/* formats inventory based car data returned by the API into an flattened array which
contains list of cars with each car is updated with warehouse and location information */

function formatCarsData(carsData) {
  const cars = [];
  const carMakersList = [];

  carsData.forEach((inventory) => {
    inventory.cars.vehicles.forEach((car) => {
      car.warehouse = inventory.name;
      car.location = inventory.location;

      if (carMakersList.indexOf(car.make) === -1) {
        carMakersList.push(car.make);
      }
    });

    cars.push(...inventory.cars.vehicles);
  });

  const carMakers = prepareCarMakersData(carMakersList);

  return { cars, carMakers };
}

/* an asyc function which calls the API, formats the data and
returns the promise based result for component to consume */

export default async function carDataService() {
  const data = await fetch("https://api.jsonbin.io/b/5ebe673947a2266b1478d892");
  const carsData = await data.json();
  return formatCarsData(carsData);
}
