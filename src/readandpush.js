/*
 * pebble-js-app.js
 * Sends the sample message once it is initialized.
 */
//var ajax = require('ajax');

var spotify_access_token = 'BQCKUvucqvemRLFNtDfa1RwotmmShikrsG4IgIszPmiZCPpnjSgimZ99GZ7hIGC-t_JB_JtcUZ_R6bV94UvnsHiFFHHdZ0I4ngumawRmHLKTM426X__NxkEmixiKJAb20V714471tfwr9yN4osvY8yVZftNmncvVarErX6UrpZegYlISj-rPCWW8BOqdYJAE9bzWRrt6lQttedp5v8U-7qiMVUi9sn6-dhSt4VE46WmB7BjxEGuG4CW6uc4J-jvA9aIknHzYhVnZkE3j1Nk92VxgxxxlzOWxEH7--oplgVUlZ1y9fnMcjQ';
var spotify_refresh_token = 'AQABFcj_juvXxkEqy60aBBR9e047jdUkeqxXr4ZSYRLYybqIas_4Eb-HsyZNn1dcP8xbG3KsgxGBIrZPBSb9q2X7k7bFp82LMdGGZWav0XF7SoEwT-tGglucRNhbyeYAJ9M';

Pebble.addEventListener('ready', function(e) {
  console.log('PebbleKit JS Ready!');

  // Send a string to Pebble
  
});

Pebble.addEventListener('appmessage',function(e){
  var dict = e.payload;
  var req = new XMLHttpRequest();
  var reqdos = new XMLHttpRequest();
  var params = dict['KEY_DATA'];
  /*
  
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });
        
        var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });

  */
  reqdos.open('POST', 'https://accounts.spotify.com/api/token');
  reqdos.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//  reqdos.setRequestHeader("Content-length", refreshForm.length);
 // reqdos.setRequestHeader("Connection", "close");
 reqdos.setRequestHeader('Authorization','Basic '+ 'ZTE4YjBkYWNjNTAzNDY0NjkwNTY0Mjc5NjhjMThmYjE6NjIyNTI1MDEyNGRhNGI4MDgyMjZhZDcxODYzYTQ4ZjI=');
 //  reqdos.send({grant_type:'refresh_token', refresh_token:spotify_refresh_token});
  reqdos.send('grant_type=refresh_token&refresh_token='+spotify_refresh_token);
  reqdos.onreadystatechange = function() {
    console.log(reqdos.responseText); console.log(reqdos.status); console.log(reqdos.getAllResponseHeaders());
    spotify_access_token = JSON.parse(reqdos.responseText).access_token;
    req.open('GET', 'https://api.spotify.com/v1/search?q='+params+'&type=track');
//  req.open('POST', 'https://ftc3415.slack.com/services/hooks/slackbot?token=nCDNx8ziFmcnsc4oPylR7dvD&channel=%23testarea', true);
//  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //req.setRequestHeader("Content-length", params.length);
//  req.setRequestHeader("Connection", "close");
//    spotify:user:12164402804:playlist:0zQiD95mgCQzAUc2OxSyk4
 // req.setRequestHeader('Authorization', 'Bearer '+spotify_access_token);
  req.send(); console.log("sent");
 /* while(req.readyState!=4){
    console.log("Not successful");
  } */
 
  
  
  req.onreadystatechange  = function()
{ 
    var xhrdata = "";
     if(req.readyState  == 4)
     {
          if(req.status  == 200) 
             xhrdata = req.responseText; 
          else 
             xhrdata = req.status;
       var song = JSON.parse(xhrdata).tracks.items[0].uri;
       console.log(song+" is my uri");
       var reqTres = new XMLHttpRequest();
       //reqTres.open('DELETE', 'https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks');
       //https://open.spotify.com/user/12164402804/playlist/0zQiD95mgCQzAUc2OxSyk4
       reqTres.open('POST', 'https://api.spotify.com/v1/users/12164402804/playlists/0zQiD95mgCQzAUc2OxSyk4/tracks?uris='+song);
        reqTres.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       reqTres.setRequestHeader("Connection","close");
       reqTres.setRequestHeader("Authorization", "Bearer "+spotify_access_token);
       reqTres.setRequestHeader("Accept","application/json");
       reqTres.send();
       console.log("Sent track post");
       reqTres.onreadystatechange = function () {
         if(reqTres.status==200){
           console.log(reqTres.responseText);
         }
         else console.log(reqTres.status);
       };
     }
}; 
  };
});