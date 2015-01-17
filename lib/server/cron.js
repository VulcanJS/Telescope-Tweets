Meteor.startup(function () {
  // do not run job locally to avoid going over API quota
  if (Meteor.absoluteUrl().indexOf('localhost') == -1) {
    SyncedCron.add({
      name: 'Get article shares',
      schedule: function(parser) {
        return parser.text('every 10 minutes');
      }, 
      job: function() {
        getPostsTweetCount(50);
      }
    });
  }
});