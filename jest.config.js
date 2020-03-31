module.exports = {
    roots: ["<rootDir>/src"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "node",
    globals: {
      "ts-jest": {
        diagnostics: {
          warnOnly: true
        }
      },
      "window": {}
    },
  
    // Setup Enzyme
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: ["<rootDir>/src/setupEnzyme.ts"]
  };