import app from './app.js';
import Db from './db/db.js';

(() => {
  Db.connect(process.env.MONGODB_URL);
  app.listen(8080, () => {
    console.log('Server Running');
  });
})();
