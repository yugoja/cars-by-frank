import { LitElement, html } from "lit-element";
import currencyFormatter from "../util/currencyFormatter";

class CarList extends LitElement {
  constructor() {
    super();

    this.cars = [];
    this.searchInput = '';
  }
  static get properties() {
    return {
      cars: { type: Array },
      filterCriteria: { type: Object },
      searchInput: { type: String },
      toggleFilterPanel: { type: Boolean },
      onSearchChange: { type: Function },
      changePriceRange: { type: Function },
      handleCarMakerFilterChange: { type: Function },
      changeAgeRange: { type: Function },
      handleToggleFilterPanel: { type: Function },
      goToCarDetails: { type: Function },
    };
  }
  render() {
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

        /* cars home page */
        .cars-list_container {
          padding: 20px 0 0 10px;
          display: flex;
          margin-bottom: 20px;
        }

        /** Filtering panel **/
        .filtering-panel {
          flex: 0 0 200px;
          border-right: 1px solid #eee;
        }

        .filtering-panel h3 {
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
        }

        #toggle-filter-panel {
          display: none;
        }

        #car-maker-list {
          max-height: 200px;
          overflow: auto;
        }

        .filtering-panel .filter-title {
          margin: 15px 0 5px;
        }

        .search-panel {
          margin: 0 0 20px 0;
          line-height: 0;
        }

        .search-panel input#car-search-box {
          width: 300px;
          font-size: 12px;
          height: 25px;
          padding: 0 5px;
        }

        .cars-grid {
          padding: 0 0 0 10px;
        }
        .cars-list {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .car-card {
          width: 200px;
          margin: 0 10px 10px 0;
          padding: 10px;
          background: #f3e5f5;
        }

        .car-card:hover {
          background: #d36de4;
          cursor: pointer;
        }

        .car-card .maker-date {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .car-card .car-maker {
          font-size: 16px;
        }

        .car-card .car-model {
          font-weight: bold;
          font-size: 18px;
        }

        .car-card .car-details {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin: 18px 0 0 0;
        }

        .car-card .date-added {
          text-align: right;
          font-size: 10px;
        }

        .car-card .add-to-card_btn button {
          background: white;
          outline: none;
          border: 1px solid;
          line-height: 1.1;
        }

        @media screen and (max-width: 460px) {
          .car-details_container {
            flex-direction: column;
          }
          .cars-list_container {
            flex-direction: column;
          }

          .filtering-panel {
            margin: 0 0 15px 12px;
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

      <div class="cars-list_container">
        <div class="filtering-panel">
          <h3>
            Filters
            <button
              id="toggle-filter-panel"
              @click=${() => this.handleToggleFilterPanel()}
            >
              ${this.toggleFilterPanel ? "-" : "+"}
            </button>
          </h3>

          ${this.toggleFilterPanel
            ? html`
                <div class="filtering-panel_wrapper">
                  <h4 class="filter-title">Car Maker</h4>
                  <ul id="car-maker-list">
                    ${this.filterCriteria.carMakers.map(
                      (carMaker, index) => html`
                        <li key="{index}">
                          <label htmlFor="{carMaker.name}">
                            <input
                              type="checkbox"
                              .name="${carMaker.name}"
                              .id="${carMaker.name}"
                              ?checked="${carMaker.selected}"
                              @change="${() =>
                                this.handleCarMakerFilterChange(carMaker.id)}"
                            />
                            ${carMaker.name}
                          </label>
                        </li>
                      `
                    )}
                  </ul>

                  <h4 class="filter-title">Car Model Year</h4>
                  <div class="make-year-range">
                    <input
                      type="text"
                      placeholder="From"
                      value=${this.filterCriteria.yearFrom}
                      @input=${(evt) => this.changeAgeRange(evt, "from")}
                    />
                    <input
                      type="text"
                      placeholder="To"
                      value=${this.filterCriteria.yearTo}
                      @input=${(evt) => this.changeAgeRange(evt, "to")}
                    />
                  </div>

                  <h4 class="filter-title">Price Range</h4>
                  <div class="make-year-range">
                    <input
                      type="text"
                      placeholder="From"
                      value=${this.filterCriteria.priceFrom}
                      @input=${(evt) => this.changePriceRange(evt, "from")}
                    />
                    <input
                      type="text"
                      placeholder="To"
                      value=${this.filterCriteria.priceTo}
                      @input=${(evt) => this.changePriceRange(evt, "to")}
                    />
                  </div>
                </div>
              `
            : html``}
        </div>

        <div class="cars-grid">
          <div class="search-panel">
            <input
              id="car-search-box"
              type="text"
              placeholder="Search Car Model or Maker"
              @input=${(evt) => this.onSearchChange(evt)}
              value=${this.searchInput}
            />
          </div>

          <ul class="cars-list">
            ${this.cars.map(
              (car) => html`
                <a href="#" @click=${() => this.goToCarDetails(car._id)}>
                  <li class="car-card">
                    <div class="maker-date">
                      <div class="car-maker">${car.make}</div>
                      <div class="date-added">${car.date_added}</div>
                    </div>
                    <div class="car-model">${car.model}</div>
                    <div class="licenced">${car.licenced}</div>
                    <div class="car-details">
                      <span class="year_model">${car.year_model}</span>
                      <span class="price">
                        ${currencyFormatter.format(car.price)}
                      </span>
                    </div>
                  </li>
                </a>
              `
            )}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define("car-list", CarList);
