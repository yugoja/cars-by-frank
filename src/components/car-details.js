import { LitElement, html } from "lit-element";

import currencyFormatter from "../util/currencyFormatter";

class CarDetails extends LitElement {
  constructor() {
    super();

    this.cars = [];
  }
  static get properties() {
    return {
      cars: { type: Array },
      addToCart: { type: Function },
      addToBookmark: { type: Function },
      goToCart: { type: Function },
    };
  }
  render() {
    const pathArray = window.location.pathname.split("/");
    const selectedCarId = pathArray[pathArray.length - 1];

    const CarDetails = this.cars.length
      ? this.cars.find((car) => car._id === parseInt(selectedCarId))
      : {
          date_added: "",
          location: { lat: "", long: "" },
          make: "",
          model: "",
          price: "",
          warehouse: "",
          year_model: "",
          _id: 0,
          licensed: false,
        };

    return html`
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        button {
          background: white;
          outline: none;
          border: 1px solid #908c8c;
          cursor: pointer;
          padding: 0px 10px;
        }
        button:hover {
          background: #f3e5f5;
          color: black;
        }
        button:disabled {
          pointer-events: none;
        }
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }

        /* Car Details */
        .car-details_container {
          display: flex;
          margin: 20px 0 0 20px;
        }
        .car-photo {
          width: 50%;
          height: 300px;
          border: 1px solid #f3e5f5;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3e5f5;
        }
        .car-details_container .car-details {
          padding: 0 15px;
        }
        .car-details_container .car-maker {
          font-weight: bold;
        }
        .car-details_container .car-model {
          font-size: 36px;
        }
        .car-details_container .label {
          width: 100px;
          display: inline-block;
        }
        .car-details_container .action-buttons {
          margin: 119px 0 0 0;
          display: flex;
          justify-content: space-between;
        }

        .car-details_container .action-buttons button {
          padding: 5px 10px;
          margin-right: 10px;
        }

        @media screen and (max-width: 460px) {
          .car-details_container {
            flex-direction: column;
          }
          .cars-list_container {
            flex-direction: column;
          }

          .filtering-panel {
            margin-bottom: 15px;
            flex: 0 0 0;
          }

          #toggle-filter-panel {
            display: block;
          }

          .search-panel input#car-search-box {
            width: 95%;
          }

          .cars-list {
            flex-direction: column;
          }

          .car-card {
            width: 95%;
          }

          .car-photo {
            width: 95%;
            margin-bottom: 15px;
          }

          .car-details {
            margin-bottom: 25px;
          }
        }
      </style>
      <div class="car-details_container">
        <div class="car-photo">Car Photo Goes Here!</div>
        <div class="car-details">
          <div class="car-maker">${CarDetails.make}</div>
          <div class="car-model">${CarDetails.model}</div>
          <div class="car-model-year">
            <span class="label">Model Year:</span>
            <b>${CarDetails.year_model}</b>
          </div>
          <div class="price">
            <span class="label">Price:</span>
            <b>${currencyFormatter.format(CarDetails.price)}</b>
          </div>
          <div class="warehouse">
            <span class="label">Location:</span> <b>${CarDetails.warehouse}</b>
          </div>
          <div class="date-added">
            <span class="label">Date Added:</span>
            <b>${CarDetails.date_added}</b>
          </div>
          <div class="action-buttons">
            <button @click=${() => this.addToBookmark(CarDetails._id)}>
              Add To Bookmark
            </button>
            <button
              ?disabled=${!CarDetails.licensed}
              @click=${() => this.addToCart(CarDetails._id)}
            >
              Add To Cart
            </button>
            <button @click=${() => this.goToCart()}>Go To Cart</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("car-details", CarDetails);
