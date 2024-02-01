const {GetIdUser} = require("./unique_id");

const fs = require("fs").promises;
const file_path = "./src/JsonFile/user.json";

class FileStore {
  async create(user) {
    try {
      const data = JSON.parse(await fs.readFile(file_path, "utf-8"));
      user.id = await GetIdUser();
      data.push(user);
      await fs.writeFile(file_path, JSON.stringify(data));
    } catch {
      user.id = 1;
      await fs.writeFile(file_path, "[" + JSON.stringify(user) + "]");
    }
    return "Created in File";
  }

  async read() {
    try {
      const users = JSON.parse(await fs.readFile(file_path, "utf-8"));
      return users;
    } catch (error) {
      return error;
    }
  }

  async update(id, newvalue) {
    try {
      id = parseInt(id);
      const data = JSON.parse(await fs.readFile(file_path, "utf-8"));
      const newdata = data.map((data) => (data.id === id ? newvalue : data));
      await fs.writeFile(file_path, JSON.stringify(newdata));
      return "Updated in File";
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      const data = JSON.parse(await fs.readFile(file_path, "utf-8"));
      const newdata = data.filter((data) => data.id !== parseInt(id));
      await fs.writeFile(file_path, JSON.stringify(newdata));
      return "Delete in File";
    } catch (error) {
      return error;
    }
  }
}

class DBStore {
  constructor() {
    this.User = require("../Schema/User");
  }
  create(user) {
    return this.User.create(user)
      .then((createdUser) => {
        return "Created in DATABASE";
      })
      .catch((error) => {
        console.error("Error creating user in DATABASE:", error.message);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }
  read() {
    return this.User.find()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }
  update(id, newvalue) {
    return this.User.findByIdAndUpdate(id, { $set: newvalue }, { new: true })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  delete(id) {
    return this.User.findByIdAndDelete(id)
      .then(() => {
        return "Deleted Sucessfully from DB";
      })
      .catch((error) => {
        throw error;
      });
  }
}

const File = new FileStore();
const DB = new DBStore();

module.exports = process.env.STORE_TO === "FS" ? File : DB;
