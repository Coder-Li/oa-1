$(document).ready(function(){
  $('#date').text((new Date()).toLocaleString());
  setInterval(function(){
    var now = (new Date()).toLocaleString();
    $('#date').text(now);
  }, 1000);
})