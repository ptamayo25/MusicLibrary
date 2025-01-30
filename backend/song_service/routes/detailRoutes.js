const express = require("express");
const { detailRoutes } = require("./routes/detailRoutes");

const app = exprss();
const PORT = 5000; //Just for testing purposes for now

app.use(express.json());
app.use("/api", detailRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
