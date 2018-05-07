1.개요

현재 데이터 시각화를 위한 여러가지 방법이 존재하지만, 각각의 방법마다 한계가 있다. 따라서 이를 보완하기 위한 데이터 시각화용 자바스크립트 프레임워크(IRMI.js) 개발에  도움이 될 수 있도록, 기존에 있는 여러 데이터 시각화 방법들을 이용하여 여러 차트들을 만들어보고, 그 경험을 통해 비교,분석을 위한 보고서를 작성한다.

  A. 기존의 데이터 시각화 
    i. JavaScript
    ii. Google Charts
    iii. Chart.js
    iv. D3.js
    v. 그 외 기타 등.. (Chartist.js, Dc.js, Plotly.js, TechanJS, Cola.js, VivaGraph 등 여러 종류가 있다.)
    
    
 2. 기존의 데이터 시각화 방법 비교,분석
 - 기본적으로 데이터 시각화를 하는 과정에서는 데이터를 차트로 표현하는 경우가 대부분이다. 순수 자바스크립트만 사용하여 차트를 구현하려면 코드가 굉장히 길어지기 때문에, 이를 도와주기 위한 여러 라이브러리가 존재한다. 기본적으로 자바스크립트 라이브러리는 SVG 태그를 이용하는 것과 CANVAS 태그를 이용하는 것으로 나뉜다.
 
| SVG | CANVAS
------------ | -------------
장점 | Content from cell 1 | Content from cell 2
단점 | Content in the first column | Content in the second column
