var geoCoordMap = {
    "郑州": [113.686033, 34.761507],
    "尼日利亚": [-4.388361, 11.186148],
    "美国洛杉矶": [-118.24311, 34.052713],
    "美国芝加哥": [-87.801833, 41.870975],
    "英国曼彻斯特": [-1.657222, 51.886863],
    "德国汉堡": [10.01959, 54.38474],
    "俄罗斯伊尔库茨克": [89.116876, 67.757906],
    "巴西": [-48.678945, -10.493623],
    "埃及达米埃塔": [31.815593, 31.418032],
    "西班牙巴塞罗纳": [2.175129, 41.385064],
    "柬埔寨金边": [104.88659, 11.545469],
    "意大利米兰": [9.189948, 45.46623],
    "阿联酋迪拜": [55.269441, 25.204514],
    "匈牙利布达佩斯": [17.108519, 48.179162],
    "澳大利亚悉尼": [150.993137, -33.675509],
    "美国加州": [-121.910642, 41.38028],
    "澳大利亚墨尔本": [144.999416, -37.781726],
    "墨西哥": [-99.094092, 19.365711],
    "加拿大温哥华": [-123.023921, 49.311753],
    "亚美尼亚": [44.31, 40.10],
    "澳大利亚": [149.08, -35.15],
    "白俄罗斯": [27.30, 53.52],
    "巴西": [-47.55, -15.47],
    "柬埔寨": [104.55, 11.33],
    "加拿大": [-75.42, 45.27],
    "中非共和国": [18.35, 4.23],
    "法国": [2.20, 48.50],
    "德国": [13.25, 52.30],
    "希腊": [23.46, 37.58],
    "格陵兰": [-51.35, 64.10],
    "匈牙利": [19.05, 47.29],
    "冰岛": [-21.57, 64.10],
    "印度": [77.13, 28.37],
    "印度尼西亚": [106.49, -6.09],
    "伊朗": [51.30, 35.44],
    "伊拉克": [44.30, 33.20],
    "爱尔兰": [-6.15, 53.21],
    "以色列": [35.12, 31.47],
    "意大利": [12.29, 41.54],
    "墨西哥": [-99.10, 19.20],
    "荷兰": [4.54, 52.23],
    "挪威": [10.45, 59.55],
    "巴基斯坦": [73.10, 33.40],
    "菲律宾": [121.03, 14.40],
    "波兰": [21.00, 52.13],
    "葡萄牙": [-9.10, 38.42],
    "韩国": [126.58, 37.31],
    "俄罗斯": [37.35, 55.45],
    "西班牙": [-3.45, 40.25],
    "瑞士": [7.28, 46.57],
    "土耳其": [32.54, 39.57],
    "阿联酋": [54.22, 24.28],
    "英国": [-0.05, 51.36],
    "美国": [-77.02, 39.91],
    "越南": [105.55, 21.05],
};
var moveLines = [];
var citys = [];
var target = "郑州";

for (let key in geoCoordMap) {
    var size = 1 + parseInt(Math.random() * 3)
    citys.push({
        itemStyle: {
            normal:
                { color: '#F58158' },
        },
        name: key,
        symbolSize: size,
        value: [...geoCoordMap[key], size]
    })
    if (key == target) { continue }
    moveLines.push({
        "fromName": key,
        "toName": target,
        "coords": [geoCoordMap[key], geoCoordMap[target]]
    })
}

var option = {
    backgroundColor: '#404a59',
    title: {
        text: '',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    legend: {
        show: false,
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: ['地点', '线路'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'world',
        label: {
            emphasis: {
                show: false
            }
        },
        // roam: true,
        zoom: 1.2,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [{
        name: '地点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            emphasis: {
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: 2,
        showEffectOn: 'render',
        itemStyle: {
            normal: {
                color: '#46bee9'
            }
        },
        data: citys
    }, {
        name: '线路',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        large: true,
        effect: {
            show: true,
            constantSpeed: 30,
            symbol: 'pin',
            symbolSize: 3,
            trailLength: 0,
        },
        lineStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#58B3CC'
                }, {
                    offset: 1, color: '#F58158'
                }], false),
                width: 1,
                opacity: 0.2,
                curveness: 0.1
            }
        },
        data: moveLines
    }]
};

var myChart = echarts.init(document.getElementById('main'));
myChart.setOption(option);