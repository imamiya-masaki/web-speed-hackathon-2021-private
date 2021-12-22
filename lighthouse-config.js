
module.exports = {
    extends: 'lighthouse:default',
    settings: {
        logLevel: 'error',
        output: 'json',
        onlyCategories: ['performance'],
        onlyAudits: [
          'first-contentful-paint',
          'speed-index',
          'largest-contentful-paint',
          'interactive',
          'total-blocking-time',
          'cumulative-layout-shift',
        ]
    }
}