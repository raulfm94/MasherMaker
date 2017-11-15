var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

function AddResult(episode, time, text){
  $("#OUTPUT").append('' +
  + '<br>' +
  + '<div class="row"><!-- NEW ROW -->' +
  + '<div class="col-lg-12 text-center" style="background-color: white; padding: 20px;"> ' +
  +   '<h3 style="text-align: left;" class="EPISODE">'+ episode +'</h3>' +
  +   '<h5 style="text-align: left;" class="TIME">Time:' + time +'</h5>' +
  +   '<br>' +
  +   '<h5 style="text-align: left;" class="TIME">' +
  +    text +
  +    '</h5>' +
  +  '</div>' +
  + '</div><!-- END NEW ROW -->' +
  + '');
}
