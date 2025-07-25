const staticFileGenerator = (allImage) => {
  const allImageWithPath = allImage.map((image) => {
    return `${process.env.DOMAIN_NAME}/${image.filename}`;
  });
  return allImageWithPath;
};

module.exports = { staticFileGenerator };
