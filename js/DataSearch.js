(function(global) {

  var _getIndexedDataset = function(dataset) {
    var indexedDataset = {};
    for(var i=0; i<dataset.length; i++) {
      indexedDataset[i] = dataset[i];
    }
    return indexedDataset;
  };

  var _getSearchData = function(indexedDataset) {
    var searchData = "";

    Object.keys(indexedDataset).forEach(function(index) {
      var item = indexedDataset[index],
          values = [];

      if(_isValidSimpleType(item)) {
        values.push(item); 
      } else if(_isObject(item)) {
        values = _toFlattenArray(item);
      } else {
        throw new Error(typeof(item) + " data is not supported");
      }

      searchData += '"' + index + ' ' + values.join(" ") + '"';
    });

    return searchData;
  };

  var _isValidSimpleType = function(value) {
    return typeof value === "string" || typeof value === "number";
  };

  var _isObject = function(value) {
    return typeof value === "object";
  };

  var _toFlattenArray = function(hash) {
    return Object.keys(hash).reduce(function(memo, key) {
      var value = hash[key];
      if(_isValidSimpleType(value)) {
        memo.push(value);
        return memo;
      } else if(_isObject(value)) {
        return memo.concat(_toFlattenArray(value));
      }
    }, []);
  };


  var DataSearch = function(dataset, options) {
    this.dataset = dataset;
    this.options = options || {};
    this.indexedDataset = _getIndexedDataset(dataset);
    this.searchData = _getSearchData(this.indexedDataset);
  };

  DataSearch.prototype.search = function(query) {
    var keywords = query.split(" "), 
        lookaheadKeywordsRegex = "";

    keywords.forEach(function(keyword) {
      if(keyword !== "") {
        lookaheadKeywordsRegex += '(?=[^"]* ' + keyword + '[^"]*)';      
      } 
    });

    var searchRegex = new RegExp('"' + lookaheadKeywordsRegex + '([0-9]+)[^"]*"', 'gi');
    var resultIds = [];
    while(result = searchRegex.exec(this.searchData)) {
      resultIds.push(parseInt(result[1]));
    }

    var results = [];
    resultIds.forEach(function(id) {
      results.push(this.indexedDataset[id]);
    }.bind(this));

    return results;
  };

  if(typeof exports === 'object') {
    module.exports = DataSearch;
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return DataSearch;
    })
  } else {
    global.DataSearch = DataSearch;
  }

})(this);
