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

//var wikidot = require('wikidot');
//wikidot.site = 'scp-wiki.wikidot.com';
var https = require('https');
https.globalAgent.maxSockets = 100;

module.exports = {
  respond : function(comment) {
    var text = comment;
    var r = /\d+/g;
    var s = text;
    var m;
    var results = [];
    while ((m = r.exec(s)) != null) {
      results.push(m[0]);
    }

    if (results.length === 0) return 'No Reply';
    
    var reply = '';

    var i;
    var count = 0;  
    for (i = 0; i < results.length; i++) {
      var item = results[i];
      if (item.length === 3 || item.length === 4) {
         var url = 'https://scp-wiki.net/scp-' + item;
         
         var request = {
           hostname: 'scp-wiki.wikidot.com',
           path: '/scp-' + item,
           method: 'GET',
           agent: false
         };
         https.request(request,function(res) {
           console.log('URL: ' + url + ', Error Code: ' + res.statusCode);
           if (res.statusCode === 200) {
             reply += '**[SCP-' + item + '](' + url + ')**\n&nbsp;';
           }
           res.on('data', function() { });
           count += 1;
         }).on('error',function(e) {
           console.log(e);
         });
      }
    }
   
    while (count != results.length) { }
    if (reply === '') reply = 'No Reply';
    return reply;
  }
};
