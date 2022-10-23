const getPublicId = imageURL =>
  imageURL
    .split("/")
    .pop()
    .split(".")[0];

module.exports = {
  getPublicId
};
