var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/layer_filter_types.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seed layer_fiter_type');
  console.log(data);
  return knex('layer_filter_types').del().return(data)
    .map(row => {
      return knex('layer_filter_types').insert({
        name: row.name
      });
    });
};
