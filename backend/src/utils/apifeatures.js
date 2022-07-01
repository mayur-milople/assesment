class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const username = this.queryStr.username
      ? {
          username: {
            $regex: this.queryStr.username,
            $options: "i",
            // i -> case insensitive
          },
        } 
      : {};

    // console.log(username);

    const email = this.queryStr.email
      ? {
          email: {
            $regex: this.queryStr.email,
          },
        }
      : {};

    // console.log(email);

    this.query = this.query.find({ ...username, ...email });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);

    //   Removing some fields for category
    const removeFields = ["username", "email"];

    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);

    // replace with regex
    queryStr = queryStr.replace(/^[0-9]{10}$/g, (key) => `$${key}`);

    // with uses phone filter string to convert object
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
}

module.exports = ApiFeatures;
