// custom "tweetCount" property
var tweetCountProperty = {
  propertyName: 'tweetCount',
  propertySchema: {
    type: Number,                      // property type
    label: 'tweetCount',                   // key string used for internationalization
    optional: true,                    // make this property optional
    autoform: {
      editable: false,                 // make this property editable by users
      omit: true                       // set to true to omit field from form entirely
    }
  }
}
addToPostSchema.push(tweetCountProperty);

// custom templates overrides
templates["postInfo"] = "customPostInfo";

// override single day view to rank by shares instead of score
viewParameters.singleday = function (terms) {
  return {
    find: {
      postedAt: {
        $gte: terms.after, 
        $lt: terms.before
      }
    },
    options: {
      sort: {sticky: -1, tweetCount: -1}
    }
  };
}

// remove upvote post module
postModules = _.reject(postModules, function (item){
  return item.template == "postUpvote";
});