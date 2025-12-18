import app from "./app";
import appConfig from "./config";

const start = () => {
  try {
    app.listen(appConfig.PORT, () => {
      console.log(`Server is running on port ${appConfig.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
