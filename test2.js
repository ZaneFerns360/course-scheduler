const fetch = require("node-fetch");

const BACKEND_URL = "http://localhost:8055";
const REFRESH_TOKEN =
  "GBBhk-eY8783dQxmvLLbbc9Xb5Cs-470oY2yEiOd6rvJBJyjUPawmnjIOECCf72E";

async function testLogout() {
  try {
    console.log("Sending logout request...");
    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: REFRESH_TOKEN }),
    });

    console.log("Response status:", response.status);


    //dn

    if (response.status === 204) {
      console.log("Logout successful");
    } else {
      const responseText = await response.text();
      console.error("Unexpected response:", response.status, responseText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

testLogout();
