import DataUriParser from "datauri/parser.js";
import path from "path";

// Function to convert file buffer to Data URI
const getDataUri = (file) => {
  // Create an instance of DataUriParser
  const parser = new DataUriParser();

  // Get the file's extension
  const extName = path.extname(file.originalname).toString();

  // Convert the file buffer to a Data URI using the file's extension
  return parser.format(extName, file.buffer);
};

export default getDataUri;
