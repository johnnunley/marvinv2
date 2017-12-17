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

var wikidot = require('wikidot');
wikidot.site = 'scp-wiki.wikidot.com';

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

    console.log(results);

    if (results.length === 0) return 'No Reply';
    
    var reply = '';

    var i;
    for (i = 0; i < results.length; i++) {
      var item = results[i];
      console.log('Item #: ' + item);
      if (item.length === 3 || item.length === 4) {
         console.log('Using item ' + item);
         wikidot.getPage('scp-' + item, function(error,value) {
           console.log(error);
           if (error.length < 5) { 
             reply += '**[SCP-' + item + '](https:/' + wikidot.site + '/' + 'scp-' + item + ')**';
             reply += '&nbsp;';
             reply += ' Written by ' + value.created_by + ' on ' + value.created_at + '&nbsp;';
             reply += 'Rating: ' + value.rating + '&nbsp;';
           }
         });
      }
    }
   
    if (reply === '') reply = 'No Reply';
    return reply;
  }
};
