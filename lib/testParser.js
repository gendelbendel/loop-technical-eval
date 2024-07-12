const fs = require("fs");
const path = require("path");

const filterJsonObjects = (keys, jsonArray) => {
  if (keys === undefined || keys.length > 0) {
    // Validate that each object contains all of the specified keys
    jsonArray.forEach((obj) => {
      const missingKeys = keys.filter((key) => !obj.hasOwnProperty(key));
      if (missingKeys.length > 0) {
        throw new Error(
          `Object ${JSON.stringify(obj)} is missing keys: ${missingKeys.join(
            ", "
          )}`
        );
      }
    });

    // Filter each object to include only the specified keys
    const filteredArray = jsonArray.map((obj) => {
      return keys.reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});
    });

    return filteredArray;
  }
  return jsonArray;
};

const getFilenameWithoutExtension = (filename) => {
  const filenameWithExt = path.basename(filename);
  const filenameWithoutExt = path.parse(filenameWithExt).name;
  return filenameWithoutExt;
};

const processFile = (keys, dataFilePath) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(dataFilePath, "utf8");
    const jsonArray = JSON.parse(data);

    // Filter the JSON objects
    const filteredData = filterJsonObjects(keys, jsonArray);
    return filteredData;
  } catch (error) {
    console.error("Error reading or processing the file:", error);
    throw error;
  }
};

/**
 * Looks for and processes a test data file corresponding to the current test name.
 *
 *
 * e.g.
 *  if the test spec file is `test.spec.js`,
 *  it will look for a data file named `test.spec.data.json` and process it
 * @param {string[]} keys the keys that must be in each object and to be filtered on.
 *  If empty or undefined, will return all keys in the json object
 * @returns
 */
const loadTestData = (keys) => {
  const callerFilePath = module.parent.filename;
  console.log(callerFilePath);
  const callerFileName = getFilenameWithoutExtension(callerFilePath);
  const dataFilePath = path.join(
    __dirname,
    `../tests/${callerFileName}.data.json`
  );

  return processFile(keys, dataFilePath);
};

module.exports = {
  loadTestData,
};
