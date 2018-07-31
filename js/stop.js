$(function() {
  var value = {
    "date" : null,
    "work_title" : "sample",
    "start": null,
    "stop" : null
  };
  var start = false;
  var btn_start = $("#botton-start");
  var btn_stop  = $("#botton-stop");

  var count;
  var h = 0;
  var min = 0;
  var sec = 0;

  btn_start.on('click',function(){
    var now   = new Date();
    value.date  = now.getMonth()+"/"+now.getDate();
    value.start = now.toISOString();
    var msg = "開始時刻 ： " + now.getHours() + "." + now.getMinutes() + "." + now.getSeconds()+"\n";
    document.getElementById('timer').innerHTML = msg;
    count = setInterval(counter,1000);
    btn_start.prop("disabled",true);
    btn_stop.prop("disabled",false);
  });

  btn_stop.on('click',function(){
    var now   = new Date();
    value.stop = now.toISOString();
    var msg = "終了時刻 ： " + now.getHours() + "." + now.getMinutes() + "." + now.getSeconds()+"\n";
    document.getElementById('time_end').innerHTML = msg;
    clearInterval(count);
    btn_stop.prop("disabled",true);
    btn_start.prop("disabled", false);
    var vv = [];
    vv.push(value);
    alert(JSON.stringify(vv, null, ' '));
    $.ajax({
      type: 'post',
      url: "http://localhost:8080/update",
      data: JSON.stringify(vv,null,' '),
      contentType: false,
      processData: false,
      dataType: 'json',
      scriptCharset: 'utf-8',
      success: function (data) {
        // Success
        alert("success");
        alert(JSON.stringify(data));
      }
    });
  });

  function counter() {
    sec ++;
    if(sec >= 60){
      sec = 0;
      min ++;
    }
    if(min >= 60){
      min = 0;
      h ++;
    }
    var msg = "経過時間 ： "+("0"+h).slice(-2)+"."+("0"+min).slice(-2)+"."+("0"+sec).slice(-2)+"\n";
    document.getElementById('time').innerHTML = msg;
  }
});
