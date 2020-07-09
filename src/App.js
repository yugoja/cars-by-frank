import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./components/Header";


import applySortingAndFiltering from "./util/applySortingAndFiltering";
import carDataService from "./service/carDataService";

import "./components/car-list.js";
import "./components/cart-element.js";
import "./components/car-details.js";

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

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.props = props;
  }

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

  componentDidUpdate() {
    if (this.props.location.pathname === "/") {
      this.myRef.current.cars = applySortingAndFiltering(this.state);;
      this.myRef.current.filterCriteria = this.state.filterCriteria;
      this.myRef.current.searchInput = this.state.searchInput;
      this.myRef.current.toggleFilterPanel = this.state.toggleFilterPanel;
      this.myRef.current.onSearchChange = this.onSearchChange;
      this.myRef.current.changePriceRange = this.changePriceRange;
      this.myRef.current.handleCarMakerFilterChange = this.handleCarMakerFilterChange;
      this.myRef.current.changeAgeRange = this.changeAgeRange;
      this.myRef.current.handleToggleFilterPanel = this.handleToggleFilterPanel;
      this.myRef.current.goToCarDetails = this.goToCarDetails;
    }

    if (this.props.location.pathname === "/cart") {
      this.myRef.current.cars = this.state.cars;
      this.myRef.current.cart = this.state.cart;
    }

    if (this.props.location.pathname.includes("/car-details")) {
      this.myRef.current.cars = this.state.cars;
      this.myRef.current.addToCart = this.addToCart;
      this.myRef.current.addToBookmark = this.addToBookmark;
      this.myRef.current.goToCart = this.goToCart;
    }
  }

  goToCart = () => {
    this.props.history.push("/cart");
  };

  goToCarDetails = (carId) => {
    this.props.history.push(`/car-details/${carId}`);
  };

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
            <car-list ref={this.myRef}></car-list>
          </Route>

          {/* Car details page displayed when cliked on any othe cars on the home page.
          It displays car details and some actions like bookmark, add to cart and go to cart */}
          <Route
            exact
            path="/car-details/:carId"
            children={<car-details ref={this.myRef}></car-details>}
          ></Route>

          {/* Cart page showing list of cars in the cart and total cost */}
          <Route
            exact
            path="/cart"
            children={<cart-element ref={this.myRef}></cart-element>}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
