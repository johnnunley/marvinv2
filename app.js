/*
 
This file is part of MarvinV2.

MarvinV2 is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

MarvinV2 is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with MarvinV2.  If not, see <http://www.gnu.org/licenses/>.

*/

require('dotenv').config();

var Snoowrap = require('snoowrap');
var Snoostorm = require('snoostorm');
var Respond = require('./respond');

var r = new Snoowrap({
    userAgent: 'reddit-bot-marvin-v2',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
var client = new Snoostorm(r);

var streamOpts = {
    subreddit: 'scp',
    results: 25
};

var comments = client.CommentStream(streamOpts);

comments.on('comment', (comment) => {
  Respond.respond(comment);
});

var submissionStream = client.SubmissionStream({
  "subreddit": "scp",
  "results": 5            
})

submissionStream.on("submission", function(post) {
  Respond.respond(post);
});
