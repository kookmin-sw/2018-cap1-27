var x,y,z;  // 각 역명은 숫자로 표기되어 있음.
var a,b,c,d;
var sum_on,sum_off;
var timeLoop;
var n_on, n_off;
var e,f,g,h;
var playtLoop;
var playtLoop2;

var now = new Date();
var hi = now.getHours();
var currentSelected_t;
var maxHeight;
var maxHeight2;
var maxHeight3;

var wph_tLoop, wph_pLine, wph_station;
var height_tLoop, height_pLine, height_station;
var width_tLoop, width_pLine, width_station;
var svgStation;

function importData_Init(fname) {

var fname;

c= Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
d= Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
sum_on = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
sum_off = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
sum_onoff = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
timeLoop = Array.apply(null, new Array(4)).map(Number.prototype.valueOf,0);
n_on = 0;
n_off = 0;
e = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
f = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
g = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
h = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
maxHeight = 0;
maxHeight1 = 0;
maxHeight2 = 0;
maxHeight3 = 0;

// step 0. stationIDList 가져오기
$.ajax({
    url: 'stationIDList.csv',
    async:false,
    dataType: 'text',
    success:function(response){
      x = response;
    }
  }).done();

  y = successFunction(x,0);
  z = successFunction(x,1);


// step 1. csv 파일 데이터 가져오기
$.ajax({
    url: 'data/'+fname+'.csv',
    async:false,
    dataType: 'text',
    success:function(response){
      a = response;
    }
  }).done().fail(function(){a= Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
      document.getElementById("result_data").innerHTML = "<h1>"+fname+".csv이 존재하지 않아 파일 로드에 실패</h1>";});

  //// step 2. 가져온 데이터(b) 정리하기
    b = successFunction(a,0);
  //// step 3. on끼리(c) 더하기 / off끼리(d) 더하기
  sortOn(b,c);
  sortOff(b,d);
  //// step 4. c와 d의 average 구하기
  n_on = figureOutAverage_Init(c,sum_on,n_on);
  n_off = figureOutAverage_Init(d,sum_off,n_off);
  //// step 5. 역사별 승차인원, 하차인원 나타내기 e,f 더하는함수만들기

for(var j=5; j<25; j++)
{
  getOnOffperStation_Init(e,y,c,d,j);

  for(var i = 0; i<y.length; i++)
  {
  if(maxHeight3 < e[i][1] + e[i][2]){
    maxHeight3 = e[i][1] + e[i][2];
  }    
  }
}

maxHeight3 = (maxHeight3 / (sum_on[25]+sum_off[25]));

set_t(hi); 
currentSelected_t = hi;
clearInterval(playtLoop2);
playtLoop2 = setInterval(function(){
  if(currentSelected_t == 24 || currentSelected_t == 25){
    currentSelected_t = 5;
  }
  else{
    (currentSelected_t)++;
  }
  set_t(currentSelected_t);
}, 900);
  pushPlayButton();
  } 

function playtLoop(){
  playtLoop2 = setInterval(function(){
    if(currentSelected_t == 24 || currentSelected_t == 25){
      currentSelected_t = 5;
    }
    else{
      (currentSelected_t)++;
    }
    set_t(currentSelected_t);
  }, 900);
  pushPlayButton(/*일시정지 버튼*/);
}

function stoptLoop(){
  clearInterval(playtLoop2);
  pushStopButton(/*재생 버튼*/);

}

function pushPlayButton(/*일시정지 버튼*/){ 
  var button = '<img src="img/stop_button.png" height="33" onclick="stoptLoop()">';
  document.getElementById("result_player").innerHTML = "";
  document.getElementById("result_player").innerHTML = button;
  document.getElementById("result_player").innerHTML += "　<img src='img/total-time.png' height='33' onclick='selectHour(25)'>";
}
function pushStopButton(/*재생버튼*/){ 
  var button = '<img src="img/play_button.png" height="33" onclick="playtLoop()">';
  document.getElementById("result_player").innerHTML = "";
  document.getElementById("result_player").innerHTML = button;
  document.getElementById("result_player").innerHTML += "　<img src='img/total-time.png' height='33' onclick='selectHour(25)'>";
}

function set_t(t){
    
    if(t>=0 && t<5) {
      t = 24;
    }
      getOnOffperStation_Init(e,y,c,d,t);
    percentageofLines(g,e);
    maxHeight2 = 0;
    for(var i = 0; i<y.length; i++)
    {
    if(maxHeight2 < e[i][1] + e[i][2]){
      maxHeight2 = e[i][1] + e[i][2];
    }    
    }
    maxHeight2 = (maxHeight2 / (sum_on[25]+sum_off[25]));

    if(t == 25){
      maxHeight = maxHeight2;
    }
    else {
      maxHeight = maxHeight3;
    }
    setSize();
    set_tLoop();
    set_Station();
    set_pLine();

    for(var i=5; i<25; i++)
    {
      document.getElementById("tLoop"+i).setAttribute("style", "fill:#374565;");
    }
    if(t != 25){
    document.getElementById("tLoop"+t).setAttribute("style", "fill:#C7CBCD;");
    }
    
    else {
      for(var i=5; i<25; i++)
    {
      document.getElementById("tLoop"+i).setAttribute("style", "fill:#C7CBCD;");
    }
    }

    currentSelected_t = t;

    var div_test;
    div_test = '<div id="testtest">';
    div_test +='<span class="before"><center>선택 시각<br/>'+(sum_on[t]+sum_off[t]).toLocaleString()+' 명<br/><br/>하루 누적<br/>'+(sum_on[25]+sum_off[25]).toLocaleString()+' 명</center></span>';
    div_test += '</div>';
    document.getElementById("result_timeLoop_3").innerHTML = div_test;

}

function set_t_prev(){
  if(currentSelected_t == 5 || currentSelected_t == 25){
    currentSelected_t = 24;
  }
  else{
    (currentSelected_t)--;
  }
  stoptLoop();
  set_t(currentSelected_t);
}

function set_t_next(){
  if(currentSelected_t == 24 || currentSelected_t == 25){
    currentSelected_t = 5;
  }
  else{
    (currentSelected_t)++;
  }
  stoptLoop();
  set_t(currentSelected_t);
}


  function setSize(){
    wph_tLoop = 1600/250;
    wph_pLine = 900/100;
    wph_station = 600/600;
  
    height_tLoop = 66;
    height_pLine = 70;
    height_station = 720;
  
    width_tLoop = wph_tLoop * height_tLoop;
    width_pLine = wph_pLine * height_pLine;
    width_station = wph_station * height_station;
  
    document.getElementById("svgTimeLoop").setAttribute("width", 1600*(width_tLoop / 1600));
    document.getElementById("svgTimeLoop").setAttribute("height", 250*(height_tLoop / 250));
  
      for(var i=5; i<25; i++)
      {
        document.getElementById("tLoop"+i).setAttribute("x", (20+(79*(i-5)))*(width_tLoop / 1600));
        document.getElementById("tLoop"+i).setAttribute("width", 59*(width_tLoop / 1600));
      }
  
      for(var i=1; i<6; i++)
      {
        document.getElementById("pLine_line_x_"+i).setAttribute("y1", 25*(i-1)*(height_pLine/100));
        document.getElementById("pLine_line_x_"+i).setAttribute("x2", 900*(width_pLine/900));
        document.getElementById("pLine_line_x_"+i).setAttribute("y2", 25*(i-1)*(height_pLine/100));
  
      }
  
      
      document.getElementById("svgPofLines").setAttribute("width", 900*(width_pLine/900));
      document.getElementById("svgPofLines").setAttribute("height", 100*(height_pLine/100));
      document.getElementById("pLine_line_x_1").setAttribute("y1", 1*(height_pLine/100));
      document.getElementById("pLine_line_x_1").setAttribute("y2", 1*(height_pLine/100));
      document.getElementById("pLine_line_x_5").setAttribute("y1", 99*(height_pLine/100));
      document.getElementById("pLine_line_x_5").setAttribute("y2", 99*(height_pLine/100));
      for(var i=1; i<9; i++)
      {
        document.getElementById("pLine"+i).setAttribute("cx", 100*i*(width_pLine/900));
        document.getElementById("pLine"+i).setAttribute("cy", 100*(height_pLine/100));
      }
  
  }

  function selectHour(t)
  {
      set_t(t);
      clearInterval(playtLoop2);
      pushStopButton();
  }
  function set_on(){
    tLoop_on();
    station_on();
  }
  function set_off(){
    tLoop_off();
    station_off();
  }
  function set_onoff(){
    set_tLoop();
    set_Station();
  }

  function tLoop_on(){
    var maxHeight1 = 0;
    for(var i = 5; i<25; i++)
    {
      if(maxHeight1 < sum_on[i]){
        maxHeight1 = sum_on[i];
      }    
    }
    maxHeight1 = (maxHeight1 / (sum_on[25]));
 
    for(var i = 5; i<25; i++)
    {
      var height = height_tLoop * ((sum_on[i])/(sum_on[25])) * (1/maxHeight1);
      document.getElementById("tLoop"+i).setAttribute("y", height_tLoop-height);      
      document.getElementById("tLoop"+i).setAttribute("height", height);
    }
  }
  function tLoop_off(){
    var maxHeight1 = 0;
    for(var i = 5; i<25; i++)
    {
      if(maxHeight1 < sum_off[i]){
        maxHeight1 = sum_off[i];
      }    
    }
    maxHeight1 = (maxHeight1 / (sum_off[25]));
 
    for(var i = 5; i<25; i++)
    {
      var height = height_tLoop * ((sum_off[i])/(sum_off[25])) * (1/maxHeight1);
      document.getElementById("tLoop"+i).setAttribute("y", height_tLoop-height);      
      document.getElementById("tLoop"+i).setAttribute("height", height);
    }
  }

  function set_tLoop(){
     var maxHeight1 = 0;
     for(var i = 5; i<25; i++)
     {
       if(maxHeight1 < sum_on[i] + sum_off[i]){
         maxHeight1 = sum_on[i] + sum_off[i];
       }    
     }
     maxHeight1 = (maxHeight1 / (sum_on[25] + sum_off[25]));
  
     for(var i = 5; i<25; i++)
     {
       var height = height_tLoop * ((sum_on[i] + sum_off[i])/(sum_on[25]+sum_off[25])) * (1/maxHeight1);
       document.getElementById("tLoop"+i).setAttribute("y", height_tLoop-height);      
       document.getElementById("tLoop"+i).setAttribute("height", height);
     }
  }

  var mouseOverLock = 0;

  function clearStation(){
    mouseOverLock = 0;
    playtLoop();
  }

  var currentSelected_StationIndex;

  function mouseOver(ind){
    if(mouseOverLock == 0){
    currentSelected_StationIndex = ind;
    }
  }

  function mouseOut(){
    if(mouseOverLock == 1){
      mouseOverLock = 0;
      selectHour(currentSelected_t);
    }

  }

  function mouseOnclick(ind){
    mouseOverLock = 1;
    selectHour(currentSelected_t);
    set_Station_selected(ind);
  }

  function set_Station_prev(){
    if(currentSelected_StationIndex == 0){
      currentSelected_StationIndex = (y.length-1);
      mouseOnclick(currentSelected_StationIndex);
    }
    else{
    currentSelected_StationIndex--;
    mouseOnclick(currentSelected_StationIndex);
    }
  }
  function set_Station_next(){
    if(currentSelected_StationIndex == (y.length-1)){
      currentSelected_StationIndex = 0;
      mouseOnclick(currentSelected_StationIndex);
    }
    else{
    currentSelected_StationIndex++;
    mouseOnclick(currentSelected_StationIndex);
    }
  }
  
  function set_Station_selected(ind){
    var divno;
    if(y[ind][0] > 2000){
      divno = y[ind][0]-2000;
    }
    else divno = y[ind][0];

    var div_test;
    div_test = '<div id="testtest">';
    div_test +='<span class="after"><center><div id="test_station"><div id="test_stN" style="position:relative"><svg width="30" height="30"><circle id="abc" cx="15" cy="15" r="15" style="fill:'+colorofLine2[y[ind][1]]+'"/><text x="3" y="19" style="font-size:10pt; fill:#ffffff">'+divno+'</text></svg></div><div id="test_stName">'+z[ind][2]+'</div></div><div id="test_on"><font color="#5e7ab5" size="2">승차인원</font><br/>'+(e[ind][1].toLocaleString())+'명</div><div id="test_off"><font color="#5e7ab5" size="2">하차인원</font><br/>'+(e[ind][2].toLocaleString())+'명</div></center></span>';

    document.getElementById("result_timeLoop_3").innerHTML = div_test;

    currentSelected_StationIndex = ind;
    for(var i = 0; i<y.length; i++)
    {
      document.getElementById("stNon"+e[i][0]+"_2").setAttribute("style", "fill:rgb(25,24,34);");
      document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("style", "fill:rgb(50,51,58);");      
    }

    for(var i = 1; i < 9; i++)
    {
      document.getElementById("lineNonoff"+i).setAttribute("style", "fill:rgb(19,18,26); stroke:rgb(58,55,58);");

      if(parseInt(e[ind][0] / 100) == i){
        document.getElementById("lineNonoff"+i).setAttribute("style", "fill:rgb(19,18,26); stroke-width:4; stroke:rgb("+colorofLine[i]+");");
      }

      if(parseInt(e[ind][0] / 100) == (20+i)){

        document.getElementById("lineNonoff"+i).setAttribute("style", "fill:rgb(19,18,26); stroke-width:4; stroke:rgb("+colorofLine[i]+");");
      }
    }

    document.getElementById("stNon"+e[ind][0]+"_2").setAttribute("style", "fill:#6581C0;");
    document.getElementById("stNoff"+e[ind][0]+"_2").setAttribute("style", "fill:#87CDCD;");
    document.getElementById("stNonoff"+e[ind][0]+"_line").setAttribute("style", "stroke:white; stroke-width:0.3");
    document.getElementById("stNonoff"+e[ind][0]+"_lcircle").setAttribute("r", 1);
    document.getElementById("stNonoff"+e[ind][0]+"_lcircle").setAttribute("style", "fill:white;");
  }

  var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
  var colorofLine2 = ['#ffffff','#0d3692','#33a23d','#fe5d10','#00a2d1','#8b50a4','#c55c1d','#54640d','#f14c82'];

  function set_Station(){
  
    var lineN = 1;

    var st_theta;
    var st_theta_rad;

    var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
    st_ind[8] =y.length-1;

    for(var i = 0; i<(y.length-1); i++)
    {
      if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
      
        st_ind[lineN]=i;
        lineN++;
      }
      
    }

    var st_x;
    var st_r = (width_station/6)-5.7;


  svgStation = '<center><svg id="svgStation_onoff" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'">';
  svgStation += '<rect x="0" y="0" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'" onmouseover="mouseOut()" style="fill:rgb(19,18,26);"/>';
  svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(height_station*1.2/2)+')"><circle id="stNonoff_line_x" cx="0" cy="0" r="'+(width_station/2)+'" style="fill:rgb(19,18,26); stroke:rgb(51,53,84);stroke-width:1"/>';
  
  for(var i = 1; i < 9; i++){

    st_theta = (360/y.length) * (st_ind[i] - st_ind[i-1]);
    st_theta_rad = st_theta * (Math.PI/180);
    st_x = 2*st_r*(Math.sin(st_theta_rad/2));
      svgStation += '<g transform="rotate('+((360/y.length)*(st_ind[i-1])+(st_theta/2)-180)+')">';
        svgStation += '<path id="lineNonoff'+i+'" d="M'+((-1)*st_r*(Math.sin(st_theta_rad/2)))+','+(st_r*(Math.cos(st_theta_rad/2)))+' a'+st_r+','+st_r+' 0 0,0  '+st_x+',0" style="fill:rgb(19,18,26); stroke:rgb('+colorofLine[i]+');stroke-width:1.7" />';
      svgStation += '</g>';
  }
  
  svgStation += '</g>';





  for(var i = 0; i<y.length; i++){    
     
      svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(width_station*1.2/2)+')" onmouseover="mouseOnclick('+i+')" onmouseout="mouseOut()">';
        svgStation += '<g transform="rotate('+((i*(360/y.length))-90)+')">';
          svgStation += '<line id="stNonoff'+e[i][0]+'_line" x1="'+(width_station/6)+'" y1="0" x2="'+(width_station/2)+'" y2="0" style="stroke:rgb(41,42,67);stroke-width:0.5"/>'; ///축만들기
          svgStation += '<rect id="stNon'+e[i][0]+'_2" x="'+(width_station/6)+'" y="-1" width="'+(width_station/6)+'" height="1.5" style="fill:'; ///승차 막대그래프 그리기
          svgStation += '#6581C0;" />'; //승차
          svgStation += '<rect id="stNoff'+e[i][0]+'_2" x="'+(width_station/3)+'" y="-1" width="'+(width_station/6)+'" height="1.5" style="fill:'; ///하차 막대그래프 그리기
          svgStation += '#87CDCD;" />'; //하차
          svgStation += '<circle id="stNonoff'+e[i][0]+'_lcircle" cx="'+(width_station/2)+'" cy="0" r="0" style=""/>';
        svgStation += '</g>';
      svgStation += '</g>';
    }
  svgStation += '</svg></center>';
  document.getElementById("result_timepicker").innerHTML = svgStation;
  

  for(var i = 0; i<y.length; i++)
  {
    var height = (width_station/3) * ((e[i][1]+e[i][2])/(sum_on[25]+sum_off[25])) * (1/maxHeight);
    var h_a = e[i][1] / (e[i][1]+e[i][2]);
    var h_b = e[i][2] / (e[i][1]+e[i][2]);
  
    document.getElementById("stNon"+e[i][0]+"_2").setAttribute("width", height*h_a);
    document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("x", (width_station/6)+(height*h_a));      
    document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("width", height*h_b);
  }

  } 

      function station_off(){
        var lineN = 1;

        var st_theta;
        var st_theta_rad;
    
        var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
        var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
        st_ind[8] =y.length-1;
    
        for(var i = 0; i<(y.length-1); i++)
        {
          if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
            st_ind[lineN]=i;
            lineN++; 
          }
        }
    
        var st_x;
        var st_r = (width_station/6)-3;

    svgStation = '<center><svg id="svgStation_off" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'">';
    svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(height_station*1.2/2)+')"><circle id="stNoff_line_x" cx="0" cy="0" r="'+(width_station/2)+'" style="stroke:#37385A;stroke-width:1"/>';

    for(var i = 1; i < 9; i++){

      st_theta = (360/y.length) * (st_ind[i] - st_ind[i-1]);
      st_theta_rad = st_theta * (Math.PI/180);
      st_x = 2*st_r*(Math.sin(st_theta_rad/2));
        svgStation += '<g transform="rotate('+((360/y.length)*(st_ind[i-1])+(st_theta/2)-180)+')">';
          svgStation += '<path id="lineNoff'+i+'" d="M'+((-1)*st_r*(Math.sin(st_theta_rad/2)))+','+(st_r*(Math.cos(st_theta_rad/2)))+' a'+st_r+','+st_r+' 0 0,0  '+st_x+',0" style="stroke:rgb('+colorofLine[i]+');stroke-width:2" />';
        svgStation += '</g>';
    }
    
    svgStation += '</g>';
    
    for(var i = 0; i<y.length; i++){    
        svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(width_station*1.2/2)+')">';
          svgStation += '<g transform="rotate('+((i*(360/y.length))-90)+')">';
            svgStation += '<line id="stNoff'+e[i][0]+'_line" x1="'+(width_station/6)+'" y1="0" x2="'+(width_station/2)+'" y2="0" style="stroke:#37385A;stroke-width:0.5"/>'; ///축만들기
            svgStation += '<rect id="stNoff'+e[i][0]+'" x="'+(width_station/6)+'" y="-1" width="'+(width_station/3)+'" height="1.5" style="fill:'; ///승차 막대그래프 그리기
            svgStation += '#87CDCD;" />'; //하차
          svgStation += '</g>';
        svgStation += '</g>';
      }
    svgStation += '</svg></center>';
    document.getElementById("result_timepicker").innerHTML = svgStation;
    
    var maxHeight2 = 0;
    for(var i = 0; i<y.length; i++)
    {
    if(maxHeight2 < e[i][2]){
      maxHeight2 = e[i][2];
    }    
    }
    maxHeight2 = (maxHeight2 / sum_off[25]);
    
    for(var i = 0; i<y.length; i++)
    {
    var height = (width_station/3) * (e[i][2]/sum_off[25]) * (1/maxHeight2);      
    document.getElementById("stNoff"+e[i][0]).setAttribute("width", height);
    }
   
       }
       function station_on(){
    var lineN = 1;

    var st_theta;
    var st_theta_rad;

    var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
    var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
    st_ind[8] =y.length-1;

    for(var i = 0; i<(y.length-1); i++)
    {
      if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
        st_ind[lineN]=i;
        lineN++;
      }
      
    }

    var st_x;
    var st_r = (width_station/6)-3;

        svgStation = '<center><svg id="svgStation" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'">';
        svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(height_station*1.2/2)+')"><circle id="stNon_line_x" cx="0" cy="0" r="'+(width_station/2)+'" style="stroke:#37385A;stroke-width:1"/>';

        for(var i = 1; i < 9; i++){

          st_theta = (360/y.length) * (st_ind[i] - st_ind[i-1]);
          st_theta_rad = st_theta * (Math.PI/180);
          st_x = 2*st_r*(Math.sin(st_theta_rad/2));
            svgStation += '<g transform="rotate('+((360/y.length)*(st_ind[i-1])+(st_theta/2)-180)+')">';
              svgStation += '<path id="lineNon'+i+'" d="M'+((-1)*st_r*(Math.sin(st_theta_rad/2)))+','+(st_r*(Math.cos(st_theta_rad/2)))+' a'+st_r+','+st_r+' 0 0,0  '+st_x+',0" style="stroke:rgb('+colorofLine[i]+');stroke-width:2" />';
            svgStation += '</g>';
        }
        
        svgStation += '</g>';

        for(var i = 0; i<y.length; i++){    
            svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(width_station*1.2/2)+')">';
              svgStation += '<g transform="rotate('+((i*(360/y.length))-90)+')">';
                svgStation += '<line id="stNon'+e[i][0]+'_line" x1="'+(width_station/6)+'" y1="0" x2="'+(width_station/2)+'" y2="0" style="stroke:#37385A;stroke-width:0.5"/>'; ///축만들기
                svgStation += '<rect id="stN'+e[i][0]+'" x="'+(width_station/6)+'" y="-1" width="'+(width_station/3)+'" height="1.5" style="fill:'; ///승차 막대그래프 그리기
                svgStation += '#6581C0;" />'; //승차
              svgStation += '</g>';
            svgStation += '</g>';
          }
        svgStation += '</svg></center>';
        document.getElementById("result_timepicker").innerHTML = svgStation;
        
      var maxHeight2 = 0;
      for(var i = 0; i<y.length; i++)
      {
        if(maxHeight2 < e[i][1]){
          maxHeight2 = e[i][1];
        }    
      }
      maxHeight2 = (maxHeight2 / sum_on[25]);
    
      for(var i = 0; i<y.length; i++)
      {
        var height = (width_station/3) * (e[i][1]/sum_on[25]) * (1/maxHeight2);
        document.getElementById("stN"+e[i][0]).setAttribute("width", height);
      }
       }
  function set_pLine(){
       var maxRadius = 0;
       for(var i = 1 ; i < 9; i++)
       {
         if(maxRadius < g[i][4] )
         {
           maxRadius = g[i][4];
         }
   
       }
       maxRadius = (maxRadius / g[9][4]);
       for(var i = 1; i < 9; i++)
       {
         var radius = (height_pLine/2) * 1.5 * (g[i][4]/g[9][4]) * (1/maxRadius);
         document.getElementById("pLine"+i).setAttribute("r", radius);
       }    
      
   }

function sortOn(b,c){
  var n = 0;
  for(var i = 0; i<b.length; i++)
  {
    if(b[i][4] == 1){
          c[n] = b[i];
          n++;
    }
  }
}

function sortOff(b,d){
  n = 0;
  for(var i = 0; i<b.length; i++)
  {
    if(b[i][4] == 0){
          d[n] = b[i];
          n++;
    }
  }
}

function figureOutAverage_Init(c, sum_on, n_on){
  var avg_on = [];
  n_on = c.length;

  for(var j = 0; j<26; j++)
  {
    sum_on[j] = 0;
    avg_on[j] = 0;
  }

  for(var i = 0; i<c.length; i++)
  {
    for(var j = 0; j<26; j++)
    {
      sum_on[j] += c[i][j];
    }
  }

  return n_on;
}

function getOnOffperStation_Init(e,y,c,d,t){
  var t;
  for(var i = 0; i < y.length; i++)
  {
    e[i] = Array.apply(null, new Array(3)).map(Number.prototype.valueOf,0);
    e[i][0] = y[i][0];
  }

  for(var i = 0; i < c.length; i++)
  {
    for(var j= 0; j<e.length; j++)
    {
      if(e[j][0] == c[i][3])
      {
        e[j][1] += c[i][t];
      }
    }
  }

  for(var i = 0; i < d.length; i++)
  {
    for(var j= 0; j<e.length; j++)
    {
      if(e[j][0] == d[i][3])
      {
        e[j][2] += d[i][t];
      }
    }
  }

}

function percentageofLines(g,e){
  for(var i = 0 ; i < 9; i++)
  {
    g[i] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0);
    g[i][0] = i;

    for(var j = 0; j<e.length; j++)
    {
       
        if(parseInt(e[j][0] / 100) == i){
          g[i][1] += e[j][1];
          g[i][2] += e[j][2];
        }

        if(parseInt(e[j][0] / 100) == (20+i)){
          g[i][1] += e[j][1];
          g[i][2] += e[j][2];
        }
    }
    g[i][3] = g[i][1] + g[i][2];
  }

    g[9] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0);
    g[9][0] = "sum";
    for(var i = 0; i<9; i++)
    {
      g[9][1] += g[i][1];
      g[9][2] += g[i][2];
      g[9][3] += g[i][3];
    }

    for(var i = 0; i<=9; i++)
    {
      g[i][4] = (100 * (g[i][3]/ g[9][3]));
    }

}
  function successFunction(data, string) {
    var result = data.split(/\r?\n|\r/);
    var i, j;
    if(string == 1){
      for (i = 0; i < result.length; i++) {

        result[i] = result[i].split(',');
  
      }
    }

    else {
      for (i = 0; i < result.length; i++) {

        result[i] = result[i].split(',');
        var sum = result[i].length;
        result[i][sum] = 0;
  
        for (j = 0; j < result[i].length; j++) {
          result[i][j] = parseInt(result[i][j]); 
            if (j > 4 && j <25){
              result[i][sum] += (result[i][j]);
            }
        } 
  
      }
    }

      return result;
  }

  function makeTable(data,where) {
    var table = '<table>';
    var i, j;
  for (i = 0; i < data.length; i++) {
      if (i === 0) {
        table += '<thead>';
        table += '<tr>';
      } else {
        table += '<tr>';
      }

      for (j = 0; j < data[i].length; j++) {

        if (i === 0) {
          table += '<th>';
          table += data[i][j];
          table += '</th>';
        } else {
          table += '<td>';
          table += data[i][j];
          table += '</td>';
        }
      } 
      if (i === 0) {
        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
      } else {
        table += '</tr>';
      }
    }
    table += '</tbody>';
    table += '</table>';
  document.getElementById(where).innerHTML += table;
  }