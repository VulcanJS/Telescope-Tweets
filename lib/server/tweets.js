getPostsTweetCount = function (limit) {

  var posts = Posts.find({}, {sort: {postedAt: -1}, limit: limit});
  console.log('// Getting tweet counts for '+posts.fetch().length+' posts…')

  // define a function to do the updating and rate-limit it
  var updatePost = function (post) {

    var url = post.url;
    var apiUrl = "http://cdn.api.twitter.com/1/urls/count.json?url="+url;
    
    try {

      var result = HTTP.get(apiUrl);
      var tweetCount = parseInt(result.data.count);
      console.log("// " + url + " (" + tweetCount + ")");

      Posts.update(post._id, {$set: {tweetCount: tweetCount}});

    } catch (error) {
      console.log(error);
    }
  
  }

  var updatePostLimited = rateLimit(updatePost, 4000); 
  posts.forEach(updatePostLimited);

}

Meteor.methods({
  getPostsTweetCount: function (limit) {
    if (isAdmin(Meteor.user()))
      getPostsTweetCount(limit);
  }
});