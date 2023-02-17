import mongoose from 'mongoose';

class Db {
  static connect(url) {
    mongoose.set('strictQuery', true);

    mongoose
      .connect(url)
      .then(() => console.log('Database Connected'))
      .catch((error) => console.log(error));
  }
}

export default Db;
