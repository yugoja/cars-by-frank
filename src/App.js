import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import CarsList from "./components/CarsList";
import CarDetails from "./components/CarDetails";
import Cart from "./components/Cart";

import applySortingAndFiltering from "./util/applySortingAndFiltering";
import carDataService from "./service/carDataService";

class App extends React.Component {
  state = {
    cars: [],
    searchInput: "",
    filterCriteria: {
      carMakers: [],
      yearFrom: "",
      yearTo: "",
      priceFrom: "",
      priceTo: "",
    },
    cart: [],
    toggleFilterPanel: true,
  };

  /* On app load, calls the carDataService to get the formatted cars data */
  componentDidMount() {
    carDataService().then((carData) => {
      this.setState({
        ...this.state,
        cars: carData.cars,
        filterCriteria: {
          ...this.state.filterCriteria,
          carMakers: carData.carMakers,
        },
      });
    });
  }

  /* Change hanlder for search box on home page */
  onSearchChange = (evt) => {
    this.setState({
      ...this.state,
      searchInput: evt.target.value,
    });
  };

  /* Change handler for car maker filter in filter panel on home page */
  handleCarMakerFilterChange = (carMakerId) => {
    this.setState({
      ...this.state,
      filterCriteria: {
        ...this.state.filterCriteria,
        carMakers: [
          ...this.state.filterCriteria.carMakers.slice(0, carMakerId),
          {
            ...this.state.filterCriteria.carMakers[carMakerId],
            selected: !this.state.filterCriteria.carMakers[carMakerId].selected,
          },
          ...this.state.filterCriteria.carMakers.slice(carMakerId + 1),
        ],
      },
    });
  };

  /* Change handler for price range filter on home page */
  changePriceRange = (evt, rangeType) => {
    if (rangeType === "from") {
      this.setState({
        ...this.state,
        filterCriteria: {
          ...this.state.filterCriteria,
          priceFrom: evt.target.value,
        },
      });
    } else {
      this.setState({
        ...this.state,
        filterCriteria: {
          ...this.state.filterCriteria,
          priceTo: evt.target.value,
        },
      });
    }
  };

  /* Change handler for model year filter on home page */
  changeAgeRange = (evt, ageType) => {
    if (ageType === "from") {
      this.setState({
        ...this.state,
        filterCriteria: {
          ...this.state.filterCriteria,
          yearFrom: evt.target.value,
        },
      });
    } else {
      this.setState({
        ...this.state,
        filterCriteria: {
          ...this.state.filterCriteria,
          yearTo: evt.target.value,
        },
      });
    }
  };

  /* accepts the carId and returns the corresponding car object */
  getCarDetails = (carId) => {
    return this.state.cars.find((car) => car._id === carId);
  };

  /* Add to cart action handler on car details page */
  addToCart = (carId) => {
    const carIndex = this.state.cart.findIndex((car) => car.carId === carId);

    if (carIndex !== -1) {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart.slice(0, carIndex),
          { carId, quantity: this.state.cart[carIndex].quantity + 1 },
          ...this.state.cart.slice(carIndex + 1),
        ],
      });
    } else {
      const carToAdd = {
        carId,
        quantity: 1,
      };
      this.setState({
        ...this.state,
        cart: [...this.state.cart, carToAdd],
      });
    }
  };


  /* Add to bookmarks action handler on car details page */
  addToBookmark = (carId) => {
    const car = this.getCarDetails(carId);
    const bookmarks =
      localStorage.getItem("bookmarks") === null
        ? []
        : JSON.parse(localStorage.getItem("bookmarks"));

    bookmarks.push(car);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  /* Toggles filter panel in mobile view */
  handleToggleFilterPanel = () =>
    this.setState({
      ...this.state,
      toggleFilterPanel: !this.state.toggleFilterPanel,
    });

  render() {
    const cars = applySortingAndFiltering(this.state);
    return (
      <div className="App">
        <Header />
        <Switch>
          {/* Home page displaying cars grid with search and filtering panel */}
          <Route exact path="/">
            <CarsList
              cars={cars}
              filterCriteria={this.state.filterCriteria}
              searchInput={this.state.searchInput}
              onSearchChange={this.onSearchChange}
              changePriceRange={this.changePriceRange}
              handleCarMakerFilterChange={this.handleCarMakerFilterChange}
              changeAgeRange={this.changeAgeRange}
              handleToggleFilterPanel={this.handleToggleFilterPanel}
              toggleFilterPanel={this.state.toggleFilterPanel}
            />
          </Route>

          {/* Car details page displayed when cliked on any othe cars on the home page.
          It displays car details and some actions like bookmark, add to cart and go to cart */}
          <Route
            exact
            path="/car-details/:carId"
            children={
              <CarDetails
                cars={this.state.cars}
                addToCart={this.addToCart}
                addToBookmark={this.addToBookmark}
              />
            }
          ></Route>

          {/* Cart page showing list of cars in the cart and total cost */}
          <Route
            exact
            path="/cart"
            children={
              <Cart
                cars={this.state.cars}
                cart={this.state.cart}
                getCarDetails={this.getCarDetails}
              />
            }
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
