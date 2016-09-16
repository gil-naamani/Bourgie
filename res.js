var responseObj = {

  success : function(data) {
    return {
      type : true,
      data : data
    };
  },

  failure : function(data, err){
    return {
      type : false,
      data : data,
      error : err
    };
  }
}

exports.responseObj = responseObj;
