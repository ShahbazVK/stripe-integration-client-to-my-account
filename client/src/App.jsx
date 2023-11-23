import React from "react";

const App = () => {
  return (
    <div>
      <form
        action="http://localhost:5000/create-checkout-session"
        method="POST"
      >
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default App;
