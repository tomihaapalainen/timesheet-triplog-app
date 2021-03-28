export const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://api.pulikka.fi";

export const stripeApiKey =
  process.env.NODE_ENV === "development"
    ? "pk_test_51IX4o7HmRBOzJv0KL0clVyTOefbelOSU7c0UkupDAGPZeC2un9LJkdPn2aSEZ5ey0TghS8MKY0Rr9idazzc3z8po006QlBtwhr"
    : "pk_test_51IX4o7HmRBOzJv0KL0clVyTOefbelOSU7c0UkupDAGPZeC2un9LJkdPn2aSEZ5ey0TghS8MKY0Rr9idazzc3z8po006QlBtwhr";
