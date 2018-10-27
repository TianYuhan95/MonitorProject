window.onload = function () {
	firstAJAX(firstUpdate);
    updateECharts();
    updateHTML();
    updateEvent();
}

// 获取所有迁转信息与当前迁转标识
function firstAJAX(callback) {
    $.ajax(
	    {
	    	async : false,
	        type : "post",
	        url : server_url + "/index/allInformation",
	        dataType : "json",
	        success : function (data)
	        {
				console.log("迁转 : ");
	        	console.log(data);
	        	trans_data = data;
	        	callback();
	        },
	        error : function (e)
	        {
	            alert("总数据获取失败");
	        }
	    }
    );
    trans_id = $("#version").text();
}

function firstUpdate() {
	// 更新大标题菜单
	var w = $(".monitor-dropdown > button").css("width");
	console.log("haha : " + w);
	$(".monitor-dropdown-menu").css("width", w);
	
	// for (var i = 0; i < trans_data.length; i++) {
	// 	var newItem = "<a class='dropdown-item'>" + trans_data[i]["trans_name"] + "</a>";
	// 	console.log("增加" + trans_data[i]["trans_name"] + "菜单项");
	// 	$(".monitor-dropdown-menu").append(newItem);
	// }
	
	for (var i = 0; i < trans_data.length; i++) {
		var newItem = "<form action='index' method='post'><input type='text' name='version_control' value='"
						+ trans_data[i]["version_control"] + "'/><input type='submit' value='"
						+ trans_data[i]["trans_name"] + "' /></form>";
		console.log("增加" + trans_data[i]["trans_name"] + "菜单项");
		$(".monitor-dropdown-menu").append(newItem);
	}
}

var server_url = 'http://localhost:8080';
var trans_id;

var orderChart;
var tradeChart;
var myChart2;
var myChart3;
var myChart5;

//X轴数据
var xData = [];

//Y轴数据 实时话费 
var yData1 = [];
for (var i =0; i < 4; i++){
	yData1[i] = new Array();
};	
//缴费记录
var yData2 = [];
for (var i =0; i < 4; i++){
	yData2[i] = new Array();
};
//业务受理	
var yData3 = [];
for (var i =0; i < 4; i++){
	yData3[i] = new Array();
};		
//信控停机
var yData4 = [];	
for (var i =0; i < 4; i++){
	yData4[i] = new Array();
};

var order_data = {
	"order_sum" : 6666,
	"order_wait" : 2222,
	"order_exec" : 3333,
	"order_fail" : 4444,
	"order_success" : 5555
};
var trans_data;
var user_data;
var fee_data;
var paylog_data;
var trade_data;
var stop_data;

function updateHTML() {
	if (fee_data == undefined || paylog_data == undefined || stop_data == undefined) {
		var newRow = "<tr><td>木有数据"
		+ "</td>╮（╯＿╰）╭<td></td><td></td><td></td></tr>";
		$('#monitor-real-info > tbody').append(newRow);
		return;
	}

	// 更新实时监控统计表
	var latest_fee = [ fee_data[fee_data.length - 1], fee_data[fee_data.length - 2],
						fee_data[fee_data.length - 3], fee_data[fee_data.length - 4] ];
	var latest_paylog = [ paylog_data[paylog_data.length - 1], paylog_data[paylog_data.length - 2],
						paylog_data[paylog_data.length - 3], paylog_data[paylog_data.length - 4] ];
	var latest_stop = [ stop_data[stop_data.length - 1], stop_data[stop_data.length - 2],
						stop_data[stop_data.length - 3], stop_data[stop_data.length - 4] ];

	var net_type = [ "移网GSM用户", "宽固用户", "移网OCS用户", "APN用户" ];
	var latest_info = {};

	for (var i = 0; i < net_type.length; i++) {
		var data_array = [];
		for (var j = 0; j < latest_fee.length; j++) {
			if (latest_fee[j]['net_type_code'] == net_type[i]) {
				data_array.push(latest_fee[j]['sum_fee']);
				break;
			}
		}
		for (var j = 0; j < latest_paylog.length; j++) {
			if (latest_paylog[j]['net_type_code'] == net_type[i]) {
				data_array.push(latest_paylog[j]['sum_num']);
				break;
			}
		}
		for (var j = 0; j < latest_stop.length; j++) {
			if (latest_stop[j]['net_type_code'] == net_type[i]) {
				data_array.push(latest_stop[j]['sum_num']);
				break;
			}
		}
		latest_info[net_type[i]] = data_array;
	}

	for (var i = 0; i < net_type.length; i++) {
		var newRow = "<tr><td>" + net_type[i]
		+ "</td><td>" + latest_info[net_type[i]][0]
		+ "</td><td>" + latest_info[net_type[i]][1]
		+ "</td><td>" + latest_info[net_type[i]][2]
		+ "</td></tr>";
		$('#monitor-real-info > tbody').append(newRow);
	}
}

// 绑定各种事件
function updateEvent() {
	// $(".monitor-dropdown-menu").on('click', 'a', function () {
	// 	var id;
	// 	for (var i = 0; i < trans_data.length; i++) {
	// 		if (trans_data[i]["trans_name"] == $(this).text()) {
	// 			id = trans_data[i]["version_control"];
	// 			console.log("迁转id : ------ " + id);
	// 			$.ajax({
	// 		        type : "post",
	// 		        url : server_url + "/index",
	// 		        data : {
	// 		        	"version" : id
	// 		        },
	// 		        dataType : "json",
	// 		        success : function (data) {
	// 		        	window.location.reload();
	// 		        },
	// 		        error : function (e) {}
	// 			});
	// 			break;
	// 		}
	// 	}
	// });

    $("#pills-trade-tab").click(function () {
        updateTradeChart(tradeChart, trade_data);
        var trade = document.getElementById('trade');
        var tabcontent = document.getElementById('pills-tabContent');
        var width = tabcontent.offsetWidth;
        var height = tabcontent.offsetHeight;
        trade.style.width = width + 'px';
        trade.style.height = height + 'px';
        tradeChart.resize();
    });
}

function updateECharts() {

    orderChart = echarts.init(document.getElementById("order"));
    tradeChart = echarts.init(document.getElementById("trade"));
    myChart2 = echarts.init(document.getElementById("part5"));
    myChart3 = echarts.init(document.getElementById("part6"));
    myChart5 = echarts.init(document.getElementById("part8"));

	window.onresize = function () {
	    orderChart.resize();
	    tradeChart.resize();
	    myChart2.resize();
	    myChart3.resize();
	    myChart5.resize();
	}
	// 获取各种数据
	getOrderData(updateOrderChart);
	getTradeData(updateTradeChart);
	getFeeData(drawPolyline);
	getPaylogData(drawPolyline);
	getStopData(drawPolyline);
}

// 获取指令执行数据
function getOrderData(callback) {
    $.ajax(
	    {
	    	async : false,
	        type : "post",
	        url : server_url + "/index/order",
	        data : {
	        	"version" : trans_id
	        },
	        dataType : "json",
	        success : function (data)
	        {
	        	console.log("指令数据 : ");
	        	console.log(data);
	        	order_data = data;
	        	callback(orderChart, order_data)
	        },
	        error : function (e)  
	        {
	            alert("指令执行数据获取失败");
	        }
	    }
    );
}

// 获取业务受理数据
function getTradeData(callback) {
    $.ajax(
	    {
	    	async : false,
	        type : "post",
	        url : server_url + "/index/trade",
	        data : {
	        	"version" : trans_id
	        },
	        dataType : "json",
	        success : function (data)
	        {
	        	console.log("业务数据 : ");
	        	console.log(data);
	        	trade_data = data;
	        	callback(tradeChart, trade_data)
	        },
	        error : function (e)  
	        {
	            alert("业务受理数据获取失败");
	        }
	    }
    );
}

// 获取实时话费数据
function getFeeData(callback) {
    $.ajax(
	    {
	    	async : false,
	        type : "post",
	        url : server_url + "/index/leave_real_fee",
	        data : {
	        	"version" : trans_id
	        },
	        dataType : "json",
	        success : function (data)
	        {
	        	console.log("实时话费数据 : ");
	        	console.log(data);
	        	if(data){
		        	fee_data = data;
		        	for(var i = 0; i < fee_data.length; i++){
		        		//x轴数据
		        		// var date1 = new Date(fee_data[i]['record_time']);
		        		// var time = date1.getHours()+':'+ date1.getMinutes();
		        		var date = fee_data[i]['record_time'];
		        		var time = date.substring(11);
		        		xData.push(time);
		        		// y轴数据;
		        		switch(fee_data[i]['net_type_code']){
		        			case '移网GSM用户': yData1[0].push(fee_data[i]['sum_fee']); break;
		        			case '宽固用户':    yData1[1].push(fee_data[i]['sum_fee']);	break;
		        			case '移网OCS用户':  yData1[2].push(fee_data[i]['sum_fee']); break;
		        			case 'APN用户': yData1[3].push(fee_data[i]['sum_fee']);	break;
		        			default: break;
		        		}
		        	}
		        	callback(myChart2, yData1);	        		
	        	}else{
	        		alert("实时话费数据获取为空");
	        	}
	        },
	        error : function (e)  
	        {
	            alert("实时话费数据获取失败");
	        }
	    }
    );
}

// 获取缴费记录数据
function getPaylogData(callback) {
    $.ajax(
	    {
	    	async : false,
	        type : "post",
	        url : server_url + "/index/paylog",
	        data : {
	        	"version" : trans_id
	        },
	        dataType : "json",
	        success : function (data)
	        {
	        	console.log("缴费记录数据 : ");
	        	console.log(data);
	        	if(data){
		        	paylog_data = data;
		        	for(var i = 0; i < paylog_data.length; i++){
		        		switch(paylog_data[i]['net_type_code']){
		        			case '移网GSM用户': yData2[0].push(paylog_data[i]['sum_num']); break;
		        			case '宽固用户':    yData2[1].push(paylog_data[i]['sum_num']);	break;
		        			case '移网OCS用户':  yData2[2].push(paylog_data[i]['sum_num']); break;
		        			case 'APN用户': yData2[3].push(paylog_data[i]['sum_num']);	break;
		        			default: break;
		        		}
		        	};
		        	callback(myChart3, yData2);  	        		
	        	}else{
	            	alert("缴费记录数据获取为空");
	        	}
      		        	
	        },
	        error : function (e)  
	        {
	            alert("缴费记录数据获取失败");
	        }
	    }
    );
}

// 获取信控停机数据
function getStopData(callback) {
    $.ajax(
	    {
	    	async : false,
	        type : "post",
	        url : server_url + "/index/stop_sum",
	        data : {
	        	"version" : trans_id
	        },
	        dataType : "json",
	        success : function (data)
	        {
	        	console.log("信控停机数据 : ");
	        	console.log(data);
	        	if(data){
		        	stop_data = data;
		        	for(var i = 0; i < stop_data.length; i++){
		        		switch(stop_data[i]['net_type_code']){
		        			case '移网GSM用户': yData4[0].push(stop_data[i]['sum_num']); break;
		        			case '宽固用户':    yData4[1].push(stop_data[i]['sum_num']);	break;
		        			case '移网OCS用户':  yData4[2].push(stop_data[i]['sum_num']); break;
		        			case 'APN用户': yData4[3].push(stop_data[i]['sum_num']);	break;
		        			default: return;
		        		}
		        	};	
		        	callback(myChart5, yData4); 	        		
	        	}else{
	            	alert("信控停机数据获取为空");
	        	}    		        		        	
	        },
	        error : function (e)  
	        {
	            alert("信控停机数据获取失败");
	        }
	    }
    );
}

function orderLegend(name) {
	if (name == '执行失败') {
    	return ['{a|' + order_data['order_fail'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '正在执行') {
    	return ['{a|' + order_data['order_exec'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '等待执行') {
    	return ['{a|' + order_data['order_wait'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '已经执行') {
    	return ['{a|' + order_data['order_success'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '移网GSM用户'){
		return ['{a|' + user_data[0]['GSM_num'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '宽固用户'){
		return ['{a|' + user_data[0]['Broadband_num'] + '}',
	            '{d|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '移网OCS用户'){
		return ['{a|' + user_data[0]['OCS_num'] + '}',
	            '{e|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == 'APN用户'){
	  	return ['{a|' + user_data[0]['APN_num'] + '}',
	            '{f|} {b|' + name + '}'
	        ].join('\n');  		
	} else if (name == '业务失败') {
    	return ['{a|' + trade_data['trade_fail'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '业务执行') {
    	return ['{a|' + trade_data['trade_exec'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '业务等待') {
    	return ['{a|' + trade_data['trade_wait'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	} else if (name == '业务成功') {
    	return ['{a|' + trade_data['trade_success'] + '}',
	            '{c|} {b|' + name + '}'
	        ].join('\n');
	}
}

function updateOrderChart(chartName, data) {
	var orderInfo = data;

	var margin = {
		normal: {
			color: '#494553'
		},
		emphasis: {
			color: '#494553'
		}
	};

    chartName.setOption(
    {
	    tooltip: {
	        trigger: 'none'
	    },
	    legend: [
		    {
		    	selectedMode: 'single',
		    	selected: {
		    		'执行失败': false
		    	},
		        orient: 'vertical',
		        right: '30%',
		        top: '25%',
		        data:[
		        	{
		        		name: '执行失败',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/fail.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    },
		    {
		    	selectedMode: 'single',
		        orient: 'vertical',
		        right: '10%',
		        top: '25%',
		        data:[
		        	{
		        		name: '等待执行',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/wait.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    },
		    {
		    	selectedMode: 'single',
		        orient: 'vertical',
		        right: '30%',
		        top: '55%',
		        data:[
		        	{
		        		name: '正在执行',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/exec.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    },
		    {
		    	selectedMode: 'single',
		        orient: 'vertical',
		        right: '10%',
		        top: '55%',
		        data:[
		        	{
		        		name: '已经执行',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/success.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    }
	    ],
	    series: [
	        {
	            name:'指令执行1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['75%', '79%'],
	            center: ['25%', '50%'],
	            avoidLabelOverlap: false,
	            legendHoverLink: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'执行失败1',
	                	value: orderInfo['order_fail'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("grey"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: orderInfo['order_sum'] - orderInfo['order_fail'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name:'指令执行1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['82%', '86%'],
	            center: ['25%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'等待执行1',
	                	value: orderInfo['order_wait'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("yellow"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: orderInfo['order_sum'] - orderInfo['order_wait'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name:'指令执行1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['89%', '93%'],
	            center: ['25%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'正在执行1',
	                	value: orderInfo['order_exec'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("red"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: orderInfo['order_sum'] - orderInfo['order_exec'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name:'指令执行1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['96%', '100%'],
	            center: ['25%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'已经执行1',
	                	value: orderInfo['order_success'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("blue"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: orderInfo['order_sum'] - orderInfo['order_success'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name: '指令执行',
	            type: 'pie',
	            hoverAnimation: false,
	            silence: true,
	            radius: ['0%', '0%'],
	            center: ['25%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    position: 'center',
	                    formatter: '{c|{c}}\n  {b|{b}HLR指令}  ',
	                    backgroundColor: '#494553',
	                    rich: {
	                        b: {
	                        	color: '#C6CDD7',
	                            fontSize: 16,
	                            lineHeight: 33
	                        },
	                        c: {
	                            color: '#F0F0F0',
	                        	fontSize: 36,
	                        	lineHeight: 50,
	                        }
	                    }
	                }
	            },
	            labelLine: {
	                show: false
	            },
	            data:[
	                {
		                name:'执行失败',
	                	value: orderInfo['order_fail'],
		            },
	                {
		                name:'等待执行',
	                	value: orderInfo['order_wait'],
		            },
	                {
		                name:'正在执行',
	                	value: orderInfo['order_exec'],
		            },
	                {
		                name:'已经执行',
	                	value: orderInfo['order_success'],
		            },
	            ]
	        }
	    ]
    }
    );
}

function updateTradeChart(chartName, data) {
	var tradeInfo = data;

	var margin = {
		normal: {
			color: '#494553'
		},
		emphasis: {
			color: '#494553'
		}
	};

    chartName.setOption(
    {
	    tooltip: {
	        trigger: 'none'
	    },
	    legend: [
		    {
		    	selectedMode: 'single',
		    	selected: {
		    		'业务失败': false
		    	},
		        orient: 'vertical',
		        right: '30%',
		        top: '25%',
		        data:[
		        	{
		        		name: '业务失败',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/fail.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    },
		    {
		    	selectedMode: 'single',
		    	selected: {
		    		'业务等待': false
		    	},
		        orient: 'vertical',
		        right: '10%',
		        top: '25%',
		        data:[
		        	{
		        		name: '业务等待',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/wait.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    },
		    {
		    	selectedMode: 'single',
		    	selected: {
		    		'业务执行': false
		    	},
		        orient: 'vertical',
		        right: '30%',
		        top: '55%',
		        data:[
		        	{
		        		name: '业务执行',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/exec.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    },
		    {
		    	selectedMode: 'single',
		    	selected: {
		    		'业务成功': false
		    	},
		        orient: 'vertical',
		        right: '10%',
		        top: '55%',
		        data:[
		        	{
		        		name: '业务成功',
		        		icon: 'none'
		        	}
		        ],
	            formatter: function(name) {
	            	return orderLegend(name);
	            },
	            textStyle: {
	                rich: {
	                    a: {
	                    	fontFamily: 'Helvetica-Light',
	                    	fontSize: 28,
	                    	lineHeight: 34,
	                        color: 'white'
	                    },
	                    b: {
	                    	fontSize: 14,
	                    	lineHeight: 20,
	                        color: '#C6CDD7'
	                    },
	                    c: {
	                    	backgroundColor: {
				                image: '../static/image/success.png'
				            },
				            width: 26,
				            height: 4
	                    }
	                }
	            },
		    }
	    ],
	    series: [
	        {
	            name:'业务受理1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['75%', '79%'],
	            center: ['30%', '50%'],
	            avoidLabelOverlap: false,
	            legendHoverLink: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'业务失败1',
	                	value: tradeInfo['trade_fail'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("grey"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: tradeInfo['trade_sum'] - tradeInfo['trade_fail'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name:'业务受理1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['82%', '86%'],
	            center: ['30%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'业务等待1',
	                	value: tradeInfo['trade_wait'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("yellow"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: tradeInfo['trade_sum'] - tradeInfo['trade_wait'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name:'业务受理1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['89%', '93%'],
	            center: ['30%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'业务执行1',
	                	value: tradeInfo['trade_exec'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("red"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: tradeInfo['trade_sum'] - tradeInfo['trade_exec'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name:'业务受理1',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['96%', '100%'],
	            center: ['30%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {
		                name:'业务成功1',
	                	value: tradeInfo['trade_success'],
	                	itemStyle: {
	                		normal: {
	                			color: {
	                				image: document.getElementById("blue"),
	                				repeat: 'no-repeat'
	                			}
	                		},
	                	}
		            },
	                {
	                	value: tradeInfo['trade_sum'] - tradeInfo['trade_success'],
	                	cursor: 'normal',
	                	itemStyle: margin
		            }
	            ]
	        },
	        {
	            name:'业务受理',
	            type:'pie',
	            hoverAnimation:false,
	            silence: true,
	            radius: ['0%', '0%'],
	            center: ['25%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    position: 'center',
	                    formatter: '{c|{c}}\n    {b|{b}}  ',
	                    backgroundColor: '#494553',
	                    rich: {
	                        b: {
	                        	color: '#C6CDD7',
	                            fontSize: 16,
	                            lineHeight: 33
	                        },
	                        c: {
	                            color: '#F0F0F0',
	                        	fontSize: 36,
	                        	lineHeight: 50,
	                        }
	                    }
	                }
	            },
	            labelLine: {
	            	show: false
	            },
	            data:[
	                {
		                name:'业务失败',
	                	value: tradeInfo['trade_fail'],
		            },
	                {
		                name:'业务等待',
	                	value: tradeInfo['trade_wait'],
		            },
	                {
		                name:'业务执行',
	                	value: tradeInfo['trade_exec'],
		            },
	                {
		                name:'业务成功',
	                	value: tradeInfo['trade_success'],
		            },
	            ]
	        }
	    ]
    }
    );
}

function drawPolyline(myChart2, yData) {
	user_data = [
		{
			'GSM_num' : $("#trans_gsm_num").text(),
			'Broadband_num' :  $("#trans_adsl_num").text(),
			'OCS_num' :  $("#trans_ocs_num").text(),
			'APN_num' :  $("#trans_apn_num").text(),
		}
	];
	option = {
		tooltip: {
		    trigger: 'axis',
		    axisPointer:{
		    	type:'cross',
		    },
		    formatter: function(params){
		    	var time = params[0].name;
				var res = '<div><p>时间：'+ time +'</p></div>';
				for(var i = 0; i < params.length; i++){
						res += '<p>'+params[i].seriesName+'：'+params[i].value+'</p>';
				}
				return res;      	
		    }
		},	
		legend: {
		    data:[
		        {
		            name: '移网GSM用户',
		            icon:'none'
		        },{
		           name:'宽固用户',
		           icon:'none'
		            
		        },{
		            name:'移网OCS用户',
		            icon:'none'
		        },{
		            name:'APN用户',
		            icon:'none'
		        }
		        ],
		    itemGap:120,
		    top:'bottom',
		    formatter:function (name){
				return orderLegend(name);
		   	},
		     textStyle: {
		        rich: {
		            a: {
		            	fontFamily: 'Helvetica-Light',
		            	fontSize: 18,
		            	lineHeight: 18,
		                color: 'white'
		            },
		            b: {
		            	fontSize: 14,
		            	lineHeight: 20,
		                color: '#C6CDD7'
		            },
		            c: {
		            	backgroundColor: {
			                image: '../static/image/gsm.png'
			            },
			            width: 26,
			            height: 4
		            },
		             d: {
		            	backgroundColor: {
			                image: '../static/image/adsl.png'
			            },
			            width: 26,
			            height: 4
		            },
		            e: {
		            	backgroundColor: {
			                image: '../static/image/ocs.png'
			            },
			            width: 26,
			            height: 4
		            }, 
		             f: {
		            	backgroundColor: {
			                image: '../static/image/apn.png'
			            },
			            width: 26,
			            height: 4
		            }                                
		        }
		    },	      
		},
		grid: {
		    left: '3%',
		    right: '2%',
		    bottom: '15%',
		    top: '2%',	
		    containLabel: true
		},
		xAxis: {
		    type: 'category',
		    boundaryGap: false,
		    data: xData,
		    axisLabel: {
		        show: true,
		        textStyle: {
		            color: '#ffffff'
		        }
		    },
		    axisLine: {show: false},  
		    axisTick: {
				show: false
			}          
		},
		yAxis: {
			name: '(元)',
		    type: 'value',
		    axisLabel: {
		        show: true,
		        textStyle: {
		            color: '#ffffff'
		        }
		    },
		    axisLine: {show: false},  
		    axisTick: {
				show: false
			}          
		},
		series: [
		    {
		        name:'移网GSM用户',
		        type:'line',
		        smooth:true,
		        symbol:'none',            
		        data:yData[0],
			    itemStyle : {
			        normal : {
			            lineStyle:{
			                width:2,//折线宽度
			                color:"#28E5E6"//折线颜色
			            }
			        }
			    },
	            areaStyle: {
	            	normal:{
		                color: {
		                    type: 'linear',
		                    x: 0,
		                    y: 0,
		                    x2:0,
		                    y2:1,
		                    colorStops: [{
		                        offset: 0, color: '#28E5E6' // 0% 处的颜色

		                    }, {
		                        offset: 1, color: '#494553' // 100% 处的颜色
		                    }],
		                    globalCoord: false // 缺省为 false
		                },		            		
	            	}
	            },		    	         
		    },
		    {
		        name:'宽固用户',
		        type:'line',
		        smooth:true,
		        symbol:'none',            
		        data:yData[1],
		        itemStyle : {
		            normal : {
		                lineStyle:{
		                    width:2,//折线宽度
		                    color:"#FB4C72"//折线颜色
		                }
		            }
		        },	
	            areaStyle: {
	            	normal:{
		                color: {
		                    type: 'linear',
		                    x: 0,
		                    y: 0,
		                    x2:0,
		                    y2:1,
		                    colorStops: [{
		                        offset: 0, color: '#FB4C72' // 0% 处的颜色
		                    }, {
		                        offset: 0.5, color: '#494553' // 100% 处的颜色
		                    }],
		                    globalCoord: false // 缺省为 false
		                },
		              	// opacity:0.3	            		
	            	}
	            },		                 
		    },
		    {
		        name:'移网OCS用户',
		        type:'line',
		        smooth:true,
		        symbol:'none',
		        data:yData[2],
		        itemStyle : {
		            normal : {
		                lineStyle:{
		                    width:2,//折线宽度
		                    color:"#FDBA44"//折线颜色
		                }
		            }
		        },
	            areaStyle: {
	            	normal:{
		                color: {
		                    type: 'linear',
		                    x: 0,
		                    y: 0,
		                    x2:0,
		                    y2:1,
		                    colorStops: [{
		                        offset: 0, color: '#FDBA44' // 0% 处的颜色
		                    }, {
		                        offset: 0.5, color: '#494553' // 100% 处的颜色
		                    }, 
		                    ],
		                    globalCoord: false // 缺省为 false
		                },
	            	},
	                opacity:0.3
	            },			        	                  
		    },
		    {
		        name:'APN用户',
		        type:'line',
		        smooth:true,
		        symbol:'none',            
		        data:yData[3],
		        itemStyle : {
		            normal : {
		                lineStyle:{
		                    width:2,//折线宽度
		                    color:"#DC32FB"//折线颜色
		                }
		            }
		        },
	            areaStyle: {
	            	normal:{
		                color: {
		                    type: 'linear',
		                    x: 0,
		                    y: 0,
		                    x2: 0,
		                    y2: 1,
		                    colorStops: [{
		                        offset: 0, color: '#DC32FB' // 0% 处的颜色
		                    }, {
		                        offset: 0.5, color: '#494553' // 100% 处的颜色
		                    }],
		                    globalCoord: false // 缺省为 false
		                },
	            	}
	            },			        
		    },
		]
	};
	myChart2.setOption(option);
}

//点击事件交互（由于隐藏标签获取不了DIV的大小，导致画图区域不正确，交互触发设置画图区域大小）
//实时话费
function paylog(){
	for(var i = 0; i < yData1.length; i++){
		if(yData1[i].length > 0){
			drawPolyline(myChart2,yData1);
		    var chart2div=document.getElementById('part5');
		    var tabcontent = document.getElementById('pills-tabContent1');
		    var width=tabcontent.offsetWidth;
		    var height=tabcontent.offsetHeight;
		    chart2div.style.width=width+'px';
		    chart2div.style.height=height+'px';
		    myChart2.resize();
		    return;			
		}
	}
	alert("实时话费数据为空！！");
}

function payRecord(){
	for(var i = 0; i < yData2.length; i++){
		if(yData2[i].length > 0){
			drawPolyline(myChart3,yData2);
		    var chart2div=document.getElementById('part6');
		    var tabcontent = document.getElementById('pills-tabContent1');
		    var width=tabcontent.offsetWidth;
		    var height=tabcontent.offsetHeight;
		    chart2div.style.width=width+'px';
		    chart2div.style.height=height+'px';
		    myChart3.resize();
		    return;			
		}
	}
	alert("缴费记录数据为空!!!");
}

function creditStop() {
	for(var i = 0; i < yData4.length; i++){
		if(yData4[i].length > 0){
			drawPolyline(myChart5,yData4);
		    var chart2div=document.getElementById('part8');
		    var tabcontent = document.getElementById('pills-tabContent1');
		    var width=tabcontent.offsetWidth ;
		    var height=tabcontent.offsetHeight;
		    chart2div.style.width=width+'px';
		    chart2div.style.height=height+'px';
		    myChart5.resize();
		    return;
		}
	}
	alert("信控停机数据为空！！");
}
