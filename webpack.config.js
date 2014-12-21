module.exports = {
  entry: './app/app.js',
  output: {
    filename: './app/dist/bundle.js'       
  },
  resolve: {
    // Tells webpack to query these directories for modules
    modulesDirectories: [
      './node_modules'
    ]
  },
};