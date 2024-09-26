const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dbConnect = require("./config/dbConnect");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const empresaRouter = require("./routes/empresaRoutes");
const funcionarioRouter = require("./routes/funcionarioRoutes");
const projetoRouter = require("./routes/projetoRoutes");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const cors = require("cors");
dbConnect();

app.use(morgan("dev"));
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/empresa", empresaRouter);
app.use("/api/funcionario", funcionarioRouter);
app.use("/api/projeto", projetoRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
