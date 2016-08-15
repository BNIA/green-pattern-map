import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';

export default class BoundariesService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/vital-signs';
    this._indicatorsUrl = '/api/vital-signs/indicators';
    this._boundaryUrl = '/api/vital-signs/boundary';
  }

  getSections() {
    return this.$http.get(this._indicatorsUrl)
      .then(this._extractSectionsData)
      .catch(this._handleError);
  }

  getBoundary(indicator) {
    var id = this._preprocessIndicator(indicator);
    var query = {
      id: JSON.stringify(id)
    };
    return this.$http.post(this._boundaryUrl, query)
      .then(this._extractBoundaryData)
      .catch(this._handleError);
  }

  getBoundaryDetail(boundaryData) {
    var query = JSON.stringify({id: boundaryData.Id});
    return this.$http.post(this._boundaryDetailUrl, query)
      .then(this._extractBoundaryDetailData)
      .catch(this._handleError);
  }

  getDownload(boundaryData, fileType) {
    var query = JSON.stringify({
      type: fileType,
      ids: this._preprocessBoundaryIds(boundaryData)
    });
    return this.$http.post(this._downloadBoundariesUrl, query)
      .then(this._extractDownloadData)
      .catch(this._handleError);
  }

  _extractSectionsData(indicatorsData) {
    indicatorsData = indicatorsData.data || {};
    var bySection = groupBy(indicatorsData, 'Vital Signs Section.Name');
    bySection = mapValues(bySection, values => {
      return {
        class: 'Vital Signs Section',
        data: map(values, v => {
          v.class = 'Vital Signs Indicator';
          return v;
        })
      };
    });
    bySection.selected = null;
    console.log(bySection);
    return bySection;
  }

  _extractBoundaryData(data) {
    data = data.data || {};
    data = {
      data: data,
      style: function(feature) {
        var fillColor = get(
          feature,
          'properties.vitalSignsDataBreak.vitalSignsColor.value',
          'rgba(0,0,0,0)'
      );

        return {
          fillColor: fillColor,
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      }
    };
    console.log(data);
    return data;
  }

  _preprocessIndicator(indicator) {
    return indicator.Id || null;
  }

  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

BoundariesService.$inject = ["$http"];