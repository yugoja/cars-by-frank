import React from "react";

import { Route, Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h2 className="logo">Cars By Frank</h2>
      </Link>

      <div className="header-button">
        <Route path="/(cart|car-details)/">
          <Link to="/">
            <button>Home</button>
          </Link>
        </Route>
        <Route path="/">
          <Link to="/cart">
            <button>Cart</button>
          </Link>
        </Route>
      </div>
    </header>
  );
}
