import { LitElement, html } from "lit-element";
import currencyFormatter from "../util/currencyFormatter";

class CartElement extends LitElement {
  constructor() {
    super();

    this.cart = [];
    this.cars = [];
  }
  static get properties() {
    return {
      cart: { type: Array },
      cars: { type: Array },
    };
  }
  render() {
    let cartTotal = 0;

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

        /* cart  */
        .cart_container {
          padding: 15px;
        }
        .cart_container h2 {
          margin-bottom: 20px;
        }
        .cart_container ul {
          display: flex;
          flex-direction: column;
        }

        .cart_container ul li {
          display: flex;
          padding: 0 5px;
        }
        .cart_container ul li:first-child {
          font-weight: bold;
          background: #e7b4f0;
          padding: 5px 10px;
        }

        .cart_container ul li:last-child {
          border-top: 1px solid #eee;
          margin-top: 10px;
          padding-top: 5px;
        }

        .cart_container .cart-item {
          margin-right: 5px;
          width: 20%;
        }

        .cart_container ul li .cart-item:first-child {
          width: 40%;
        }

        .cart_container .cart-total {
          border-top: 1px solid #eee;
          margin-top: 10px;
          text-align: right;
          padding-right: 90px;
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
      <div class="cart_container">
        <h2>Cart</h2>
        <ul>
          <li>
            <span class="cart-item">Car Name</span>
            <span class="cart-item">Price</span>
            <span class="cart-item">Quantity</span>
            <span class="cart-item">Total Price</span>
          </li>
          ${this.cart.map((cartItem, index) => {
            const cartItemDetails = this.cars.length
              ? this.cars.find((car) => car._id === parseInt(cartItem.carId))
              : { make: "", model: "", price: "" };

            cartTotal =
              cartTotal + parseFloat(cartItemDetails.price) * cartItem.quantity;

            return html`
              <li key="{index}">
                <span class="cart-item title">${cartItemDetails.model}</span>
                <span class="cart-item price">
                  ${currencyFormatter.format(cartItemDetails.price)}
                </span>
                <span class="cart-item quantity">${cartItem.quantity}</span>
                <span class="cart-item cart-item-totalprice">
                  ${currencyFormatter.format(
                    parseFloat(cartItemDetails.price) * cartItem.quantity
                  )}
                </span>
              </li>
            `;
          })}
          <li>
            <span class="cart-item"></span>
            <span class="cart-item"></span>
            <span class="cart-item">Total Price</span>
            <span class="cart-item">
              ${currencyFormatter.format(cartTotal)}
            </span>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define("cart-element", CartElement);
