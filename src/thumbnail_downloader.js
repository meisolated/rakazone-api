var http = require('http'),                                                
    Stream = require('stream').Transform,                                  
    fs = require('fs');                                                    

var url = 'http://www.google.com/images/srpr/logo11w.png';                    

http.request(url, function(response) {                                        
  var data = new Stream();                                                    

  response.on('data', function(chunk) {                                       
    data.push(chunk);                                                         
  });                                                                         

  response.on('end', function() {                                             
    fs.writeFileSync('image.png', data.read());                               
  });                                                                         
}).end();