// ==UserScript==
// @name         赛事星——青大微纳 近代史版
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  只有 青大 近代史题库，其他题库可联系
// @author       define9
// @match        *://saishi.cnki.net/exam/ExamRd/Answer/*
// @grant        none
// ==/UserScript==

(function() {
	var UItxt = '<div class="g-mn" id="UItest" style="width:880px;height:300px">test!!!!!!!!!</div>';
	var box = document.getElementsByClassName("g-mn")[0];
	box.innerHTML += UItxt;

	function addUI(txt){
		var where = document.getElementById('UItest');
		where.innerHTML += txt;

		//$('#UItest').innerHTML += txt;
	}
	function UI(txt){
		var where = document.getElementById('UItest');
		where.innerHTML = '生活不易<br>';
		where.innerHTML += txt;

		//$('#UItest').innerHTML += txt;
	}
	'use strict';//_ = 1591413534834;
	$.ajaxSettings.async = false;//取消异步执行
	var localUrl = window.location.href;
	var examId = localUrl.split('/')[6];//试题ID
	//http://saishi.cnki.net/api/ExamineRd/GetExamineePaperForTest?examineepaperguid=kj5981f13e-ba9b-4101-a430-cda054b9b199&_=1591420753246
	var Url = 'http://saishi.cnki.net/api/ExamineRd/GetExamineePaperForTest';
	var quIds = [];
	var answer = [];
	//alert(url);
	//alert(examId);//1

	$.ajax({//抓题
		url:Url,
		header:'application/json; charset=utf-8',
		//contentType:'JSON',
		dataType:'JSON',
		data:{
			examineepaperguid:examId,
			_:0
		},
		success:function(data){
			for(var i=0;i<100;i++){
				quIds[i] = data.data.Questions[i].Question;
			}
		},
		error:function(){
			console.log("获取试题出错");
		}
	});
	//alert(quIds[0]);//2
	var innter = '';
	$.ajax({//http://175.24.34.228:8081/2333.php
		url:'http://175.24.34.228:8081',
		type:'POST',
		dataType:'JSON',
		data:{
			quIDs:quIds
		},
		success:function(data){
			//alert(data[11]);//3
			for(var i=0;i<100;i++){
				innter = (i + 1) + '.  ';
				innter += data[i];
				answer[i] = innter;
				//alert(innter);
				//addUI(innter);
				//addUI('<br>');
			}
		}
	});
	var numWhere = document.getElementsByClassName('num')[0];
	var num = parseInt(numWhere.innerHTML);
	setInterval(function(){
		num = parseInt(numWhere.innerHTML);
		//alert(answer[num]);
		UI(answer[num-1]);
	},'800');//0.8s
})();
