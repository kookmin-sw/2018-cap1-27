var now = new Date();
var yi = now.getFullYear();
var mi = now.getMonth() + 1;
var di = now.getDate();
var hi = now.getHours();
var letter = (10000*yi) + (100*mi) + (1*di);

var yy = yi;
var mm = mi;
var dd = di;

var ys = 0;
var ms = 0;
var ds = 0;

// yearbox
    var select = '<center><select id="year" onchange="yearFunc()">';
    select += '<option id="yearInit" value="0">년</option>';
    for(var i = 0; i <11; i++){

      select += '<option id="y'+(2018-i)+'" value="'+(2018-i)+'"';

      // if(2018-i == 2017)
      if(yy == 2018 - i)
      {
        select += ' selected'
      }

      select += '>'+(2018-i)+'년</option>'
    }

    select += '</select>'

 // monthbox
     select += '　<select id="month" onchange="monthFunc()">';
     select += '<option id="monthInit" value="0">월</option>';
     for(var i = 0; i <12; i++){
       select += '<option id="m'+(i+1)+'" value="'+(i+1)+'"';

      //  if(i+1 == 1)
       if(mm == i + 1)
       {
         select += ' selected'
       }

       select += '>'+(i+1)+'월</option>'
     }

     select += '</select>'

  // datebox
         select += '　<select id="date" onchange="dateFunc()">';
         select += '<option id="dateInit" value="0">일</option>';
         for(var i = 0; i <31; i++){
           select += '<option id="d'+(i+1)+'" value="'+(i+1)+'"';

          //  if(i+1 == 2)
           if(dd == i + 1)
           {
             select += ' selected';
           }

           select += '>'+(i+1)+'일</option>';
         }

         select += '</select>';

         // selectbox 초기화
         //select += '<button onclick="goInit()">초기화</button>';
         //select += '<button onclick="goToday()">오늘날짜로</button>';
  select += '</center>';
   $('#timepicker').append(select);
  // document.getElementById("result_tPicker").innerHTML += select;

  function goInit(){
    document.getElementById("yearInit").selected = "true";
    document.getElementById("monthInit").selected = "true";
    document.getElementById("dateInit").selected = "true";

    yy = 0;
    mm = 0;
    dd = 0;

    ys = 0;
    ms = 0;
    ds = 0;

    letter = (10000*yy) + (100*mm) + (1*dd);
    // document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
    document.getElementById("result_timepicker").innerHTML = "";
    document.getElementById("result_data").innerHTML = "";

  }
  function goToday(){
    document.getElementById("y"+yi).selected = "true";
    document.getElementById("m"+mi).selected = "true";
    document.getElementById("d"+di).selected = "true";

    letter = (10000*yi) + (100*mi) + (1*di);

    yy = yi;
    mm = mi;
    dd = di;

    ys = 1;
    ms = 1;
    ds = 1;

    // document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
    document.getElementById("result_timepicker").innerHTML = "";
    document.getElementById("result_data").innerHTML = "";
  }


   function yearFunc() {
       var y = parseInt(document.getElementById("year").value);
       // document.getElementById("result_letter").innerHTML = "You selected the year: " + y + "<br/>";
       if(ys + ms + ds == 0)
       {
         letter += (10000*(y-yy));
         yy = y; ys++;
         document.getElementById("monthInit").selected = "true";
         document.getElementById("dateInit").selected = "true";
         letter -= (100*mm);
         mm = 0;
         letter += (100*mm);

         letter -= (1*dd);
         dd = 0;
         letter += (1*dd);
       }
       else {
         letter += (10000*(y-yy));
         yy = y; ys++;
       }
      //  document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
       document.getElementById("result_timepicker").innerHTML = "";
       document.getElementById("result_data").innerHTML = "";
       importData_Init(letter+'_org');
   }

   function monthFunc() {
       var m = parseInt(document.getElementById("month").value);
       // document.getElementById("result_letter").innerHTML = "You selected the month: " + m + "<br/>";
       if(ys + ms + ds == 0)
       {
         letter += (100*(m-mm));
         mm = m; ms++;
         document.getElementById("yearInit").selected = "true";
         document.getElementById("dateInit").selected = "true";

         letter -= (10000*yy);
         yy = 0;
         letter += (10000*yy);

         letter -= (1*dd);
         dd = 0;
         letter += (1*dd);
       }
       else {
         letter += (100*(m-mm));
         mm = m; ms++;
       }

      //  document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
       document.getElementById("result_timepicker").innerHTML = "";
       document.getElementById("result_data").innerHTML = "";
       importData_Init(letter+'_org');
   }

   function dateFunc() {
       var d = parseInt(document.getElementById("date").value);
       // document.getElementById("result_letter").innerHTML = "You selected the date: " + d + "<br/>";
       if(ys == 0)
       {
         letter -= (10000*yy);
         yy = yi; ys++;
         letter += (10000*yy);
         document.getElementById("y"+yy).selected = "true";
       }
       if(ms == 0)
       {
         letter -= (100*mm);
         mm = mi; ms++;
         letter += (100*mm);
         document.getElementById("m"+mm).selected = "true";
       }

       letter += (1*(d-dd));
       dd = d; ds++;

      //  document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
       document.getElementById("result_timepicker").innerHTML = "";
       document.getElementById("result_data").innerHTML = "";
       importData_Init(letter+'_org');
   }

//////////////날짜 참조!!
// var d = new Date();
// 날짜 = d.getDate()
// 요일 = d.getDay()
// 월 = d.getMonth()
// 연도 = d.getFullYear()
// 시간 = d.getHours()