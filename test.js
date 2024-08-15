const http = require("http");
const fetch = require("node-fetch");

const COOKIE_NAME = "auth_token";
const USERNAME = "username";

const cookies = {
  set(name, value) {
    this[name] = value;
  },
  get(name) {
    return this[name];
  },
};

const directusLogin = async (credentials) => {
  console.log(credentials.identifier);
  console.log(credentials.password);
  const res = await fetch("http://localhost:8055/auth/login/ldap", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });

  const user = await res.json();

  if (!res.ok && user) {
    throw new Error("Wrong credentials!");
  }

  const formattedData = JSON.stringify(user);
  cookies.set(COOKIE_NAME, formattedData);
  cookies.set(USERNAME, credentials.identifier);

  return user;
};

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/login") {
    const credentials = {
      identifier: "customuser",
      password: "custompassword",
    };

    try {
      const user = await directusLogin(credentials);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(user));
    } catch (error) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "text/plain");
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
