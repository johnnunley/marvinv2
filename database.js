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

var fs = require('fs');
var fetch = require('node-fetch');

var existing = [];

exports.url_base = 'http://scp-wiki.net/scp-';

exports.exists = function(item,callback) {
  if (existing.indexOf(item) !== -1) {
    callback();
  }
  else {
    fetch(exports.url_base + item).then((res) => {
      if (res.ok) {
        existing.push(item);
        callback();
      }
    });
  } 
};

exports.save = function(file) {
  fs.writeFile(file,existing,function(err) {
    if (err) {
      return console.log(err);
    } 
  });
};

exports.load = function(file) {
  existing = [];
  var jsonContent = JSON.parse(fs.readFileSync(file));
  for (var i = 0; i < jsonContent.length; i++) {
    if (typeof jsonContent[i] == "string") {
      existing.push(jsonContent[i]);
    }
  }
};
