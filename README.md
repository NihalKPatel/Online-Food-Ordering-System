# Online-Food-Ordering-System

# Installing Backend

- First clone the repo - `git clone https://github.com/NihalKPatel/Online-Food-Ordering-System.git`
- Move into the app folder - `cd backend`
- Install the Node dependencies - `npm install`
- Install config file - `touch app/db.config.js`
- Add the following to the config.js file

```
module.exports = {
database: "database name",
username: "username",
password: "password",
host: "host",
dialect: "mysql",
port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

```

- Start the API - `node server.js` - The API will be running on localhost:8080
