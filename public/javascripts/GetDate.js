$(document).ready(function(){
  setInterval(function(){
    var now = (new Date()).toLocaleString();
    $('#date').text(now);
  }, 1000);
})