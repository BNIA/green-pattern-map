var baseModel = require('./base');

var BestManagementPractice = baseModel.Model.extend({
  tableName: 'bmp_types',
  visible: ['name'],
  prettyValues: ['name'],
  stormwaterRemediationSites: function() {
    return this.belongsToMany(
      'StormwaterRemediationSite'
    );
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var BestManagementPractices = baseModel.Collection.extend({
  model: BestManagementPractice
});

module.exports = {
  BestManagementPractice:
  baseModel.model('BestManagementPractice', BestManagementPractice),
  BestManagementPractices:
  baseModel.collection('BestManagementPractices', BestManagementPractices)
};
