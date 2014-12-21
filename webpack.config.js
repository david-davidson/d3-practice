module.exports = {
  entry: './app/app.js',
  output: {
    filename: './bundle.js'       
  },
  resolve: {
    // Tells webpack to query these directories for modules
    modulesDirectories: [
      './node_modules'
    ]
  },
};