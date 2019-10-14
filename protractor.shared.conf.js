'use strict';
const argv = require('yargs').argv;
const fs = require('fs-extra');
const path = require('path');

argv.tags = argv.tags || process.env.INKSOFT_TAGS;

exports.config = {
  /**
   * Protractor specific
   */
  allScriptsTimeout: 11000,
  disableChecks: true,

  beforeLaunch: () => {
    console.log(`\n==========================================================================`);
    console.log(`\nThe directory './tmp', which holds reports / screenshots is being removed.\n`);
    console.log(`==========================================================================\n`);
    fs.removeSync('./.tmp');
  },

  /**
   * CucumberJS specific
   */
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    require: [
      './e2e/krios/features/step_definitions/common.steps.js',
      './e2e/krios/features/step_definitions/*.steps.ts',
      path.resolve(process.cwd(), './e2e/krios/helpers/after.scenario.ts'),
      path.resolve(process.cwd(), './e2e/krios/helpers/cucumber.config.ts')
    ],
    format: 'json:.tmp/results.json',
    strict: true
  },

  params: {
    pageObjects: require('./e2e/krios/page_objects/index.ts'), // path to your page object file
    customTimeout: 60000
  },
  specs: getFeatureFiles(),


  /**
   * From `protractor-cucumber-framework`, allows cucumber to handle the 199
   * exceptio\n and record it appropriately
   */
  ignoreUncaughtExceptions: true,

  /**
   * The new reporting plugin
   */
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile: true
    }
  }],

  onPrepare() {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().maximize();
    browser.driver.manage().timeouts().implicitlyWait(10000);
  }
};

if (argv.tags) {
  exports.config.cucumberOpts.tags = argv.tags;
}

/**
 * Get the featurefiles that need to be run based on an command line flag that is passed, if nothing is passed all the
 * featurefiles are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 feature
 *     npm run e2e -- --feature=playground
 *
 *     // For multiple features
 *     npm run e2e -- --feature=playground,dashboard,...
 *
 *     // Else
 *     npm run e2e
 * </pre>
 */
function getFeatureFiles() {
  // Execute the specific project
  // Eg: --project=CRM
  // Note: Project name should be case sensitive
  // Available projects: Krios
  let projects = ['Krios'];

  if (argv.project && !(projects.indexOf(argv.project) > -1)) {
    console.log('Project name should be one of the following values.');
    console.log('1. Krios');
    process.exit(0);
  }

  if (argv.project) {
    // Returns specific project features
    return [`${process.cwd()}/e2e/krios/features/**/${argv.project}/**/*.feature`];
  }

  if (argv.project && argv.feature) {
    // Returns specific feature files in specific project
    return argv.feature.split(',').map(feature => {
      return `${process.cwd()}/e2e/krios/features/${argv.project}/${feature}.feature`;
    });
  }

  if (argv.feature) {
    // Returns specific feature files
    return argv.feature.split(',').map(feature => {
      return `${process.cwd()}/e2e/krios/features/**/${feature}.feature`;
    });
  }

  // Returns all features
  return [`${process.cwd()}/e2e/krios/features/**/*.feature`];
}