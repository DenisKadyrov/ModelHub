import app from './server';
import { config } from './config/config'

const port = config.PORT;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
