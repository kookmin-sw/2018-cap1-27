/// <reference path="./modules/chart.js/index.d.ts" />

let testdrive_json = {
    "version": "0.1",
    "items" : [
        {
            "name": "Citizen",
            "type": "data",
            "value" : [
                {
                    "title": "Seoul",
                    "value": "1000"
                },
                {
                    "title": "Suwon",
                    "value": "125"
                }
            ]
        },
        {
            "name": "Bar",
            "type": "chart",  
            "value" : {
                "type": "bar",
                "label": {
                    "dataset": "Citizen",
                    "column": "title"
                },
                "data": {
                    "dataset": "Citizen",
                    "column": "value"
                }
            }
        }
    ]
};

// Singleton Pattern from http://www.codebelt.com/typescript/typescript-singleton-pattern/
class IRMI {
    private static _instance:IRMI = new IRMI();

    constructor() {
        if (IRMI._instance) {
            throw new Error("Error: Instantiation failed: Use IRMI.getInstance() instead of new.");
        }
        IRMI._instance = this;
    }

    public static getInstance() : IRMI {
        return IRMI._instance;
    }
}





module IRMI {
    interface Datasource {

    }

    interface Controller {

    }

    interface View {

    }

    class Reader {
        hello(): void {
            // console.log("Hello IRMI");
        }
    }
}

interface Ground {
    identity: String;
    source_url: String;
}

class GroundList {
    // grounds: Ground[];
    constructor() {

    }
    addGround(ground: Ground) {
    //     this.grounds.push(ground);
    }
}

var groundList = new GroundList();

// class ImGround implements Ground {
    
//     constructor() {

//     }
// }


// 각 unit들을 조합해 구성한다
// unit은 reader(parser, time event), query(join), binding, chart, ground 등의 성격을 갖는다
// interaction event도 하나의 unit이 될 수 있다.
// unit간의 관계를 두고 최종으로 보이는 ground로 부터 chart... reader까지 역순으로 확인해 업데이트한다
// time event에 연결된 ground는 별도의 table로 관리해 binding 관계를 유지하도록 한다
// chart unit은 subclass를 사용해 확장 가능하도록 한다

function get_irmi_ground(): void {
    let ground_collection: HTMLCollection = document.getElementsByClassName("irmi-ground");
    let ground_elements = [].slice.call(ground_collection);
    
    for (let ground_element of ground_elements) {
        console.log(ground_element);
        let element: Element = ground_element;

        // console.log(element.attributes.getNamedItem("irmi-id").value);
        // console.log(element.attributes.getNamedItem("irmi-source").value);

        // irmi-ground들을 등록하는 배열에 추가한다...

        // let ground =  new ImGround(
            // identity: element.attributes.getNamedItem("irmi-id"),
            // source_url: element.attributes.getNamedItem("irmi-source")
        // );
        // groundList.addGround(ground);
        
    }
}

function show_chartjs(): void {
    /*
    let bar_chart: HTMLElement = document.getElementById("bar-chart");
    new Chart(bar_chart),{
        type: 'bar',
        data: {
            labels: ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
                label: '1981-2010 monthly average of temperature (Seoul)',
                data: [-2.4, 0.4, 5.7, 12.5, 17.8, 22.2, 24.9, 25.7, 21.2, 14.8, 7.2, 0.4],
                backgroundColor: [
                    'rgba(226, 38, 38, 0.2)',
                    'rgba(226, 116, 38, 0.2)',
                    'rgba(227, 230, 49, 0.2)',
                    'rgba(161, 230, 49, 0.2)',
                    'rgba(25, 194, 84, 0.2)',
                    'rgba(24, 224, 171, 0.2)',
                    'rgba(24, 224, 221, 0.2)',
                    'rgba(23, 167, 215, 0.2)',
                    'rgba(23, 97, 215, 0.2)',
                    'rgba(76, 30, 214, 0.2)',
                    'rgba(208, 39, 231, 0.2)',
                    'rgba(231, 39, 112, 0.2)'
                ],
                borderColor: [
                'rgba(226, 38, 38, 1)',
                    'rgba(226, 116, 38, 1)',
                    'rgba(227, 230, 49, 1)',
                    'rgba(161, 230, 49, 1)',
                    'rgba(25, 194, 84, 1)',
                    'rgba(24, 224, 171, 1)',
                    'rgba(24, 224, 221, 1)',
                    'rgba(23, 167, 215, 1)',
                    'rgba(23, 97, 215, 1)',
                    'rgba(76, 30, 214, 1)',
                    'rgba(208, 39, 231, 1)',
                    'rgba(231, 39, 112, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    */
}

function hello_irmi(...irmi_id: String[]): void {
    console.log("Hello IRMI");

    show_chartjs();

    get_irmi_ground();
    
    if (irmi_id.length > 0) {
        // 특정 irmi-id에만 업데이트
    } else {
        // 모든 irmi-id를 대상으로 업데이트
    }
}

