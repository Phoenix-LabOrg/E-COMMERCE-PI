module.exports = (function () {
  
  var path  = require("path"),
      fs    = require("fs");
  
  return {
    
    find : function (url, callBack) {
      fs.readdir(path.dirname(url), function (err, files) {
        var name;
        callBack(err, files.some(function (file) {
          return path.basename(url).toLowerCase() === ((name = file).toLowerCase());
        }) ? name : null);
      });
    },
    
    findSync : function (url) {
      try {
        var name;
        return fs.readdirSync(path.dirname(url)).some(function (file) {
          return path.basename(url).toLowerCase() === ((name = file).toLowerCase());
        }) ? name : null;
      } catch (ex) {
        throw new TypeError(ex.message); 
      }
    },
    
    findAll : function (url, callBack) {
      fs.readdir(path.dirname(url), function (err, files) {
        callBack(err, files.filter(function (file) {
          return path.basename(url).toLowerCase() === file.toLowerCase();
        }));
      });
    },
    
    findAllSync : function (url) {
      try {
        return fs.readdirSync(path.dirname(url)).filter(function (file) {
          return path.basename(url).toLowerCase() === file.toLowerCase();
        });
      } catch (ex) {
        throw new TypeError(ex.message); 
      }
    },
    
    exists : function (url, callBack) {
      fs.readdir(path.dirname(url), function (err, files) {
        callBack(err, files.some(function (file) {
          return path.basename(url) === file;
        }));
      });
    },
    
    existsSync : function (url) {
      return fs.readdirSync(path.dirname(url)).some(function (file) {
        return path.basename(url) === file;
      });
    },
    
    /* @todo look for files/dirs names using regex */
  }
  
})();