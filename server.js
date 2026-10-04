```javascript
const express = require("express");
const path = require("path");

const app = express();

const PORT =
  process.env.PORT || 3000;


// Serve website

app.use(
  express.static(
    path.join(__dirname)
  )
);


// Maximum request size

app.use(
  express.json({
    limit: "200mb"
  })
);


// Home

app.get(
  "/",
  (req, res) => {

    res.sendFile(
      path.join(
        __dirname,
        "index.html"
      )
    );

  }
);


// Start server

app.listen(
  PORT,
  () => {

    console.log(
      `xRom4 IMG TO URL running on port ${PORT}`
    );

  }
);
```
