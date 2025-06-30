import app from "./app";
import config from "./app/config";
import connectDB from "./app/utils/db";

async function bootstrap() {
  try {
    await connectDB();
    app.listen(config.port, async () => {
      console.log(`Server running on the ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}


bootstrap();
