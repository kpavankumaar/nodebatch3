/**
 * create and export configuration variables 
 */

 // container for all environments 

 var environments = {}

 // staging (default) environment

 environments.staging = {
     'httpPort': 3000,
     'httpsPort': 3001,
     'envName': 'staging'
 }

 environments.production = {
     'httpPort': 5000,
     'httpsPort':5001,
     'envName': 'production'
 }

 // Determine which enviroment was passed as a command line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check the current environments is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;