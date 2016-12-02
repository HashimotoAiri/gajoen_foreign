//  ========================================================
//  directin-search.js ---- Direct In 予約検索タグクラス
//  Copyright 2011 Dynatech.inc <hotel-story@dyn.co.jp>
//  2011/02/08 - スタートバージョン
//  ========================================================




// 初期設定

var hcod1  = "72280"
var hcod2  = "001"

// 【注意】数値を変更しないでください


// form 名指定
// form のnameを変更する場合は変更すること
// index.htmlにもあるので同様に修正すること

var objfrm =  document.frmplanseek

// 別ウィンドウ表示切替
var modeChange =  "false"; // on：別ウィンドウ なし：そのまま遷移

(function (DYNns, $, undefined) {
	DYNns.$ = $;
}(window.DYNns = window.DYNns || {}, $.noConflict(true)));

	// カレンダーを表示させる
		var cal = new JKL.Calendar("calid","frmplanseek","hidSELECTARRYMD");

		// カレンダー上の日付を ○日後まで範囲指定する
		function computeDate(year, month, day, addDays) {
			var dt = new Date(year, month - 1, day);
			var baseSec = dt.getTime();
			var addSec = addDays * 86400000;
			var targetSec = baseSec + addSec;
			dt.setTime(targetSec);
			return dt;
		}

		Today      = new Date();
		Todayyear  = Today.getFullYear();
		Todaymonth = Today.getMonth();
		Todaydate  = Today.getDate();

		var Futuredate = computeDate(Todayyear, Todaymonth, Todaydate, 364);	// 364日後日付指定

		Futureyear  = Futuredate.getFullYear();
		Futuremonth = Futuredate.getMonth() + 1;
		Futuredate  = Futuredate.getDate();

		Future = Futureyear + "/" + Futuremonth + "/" + Futuredate;	// 日付置換

		Future = new Date(Futureyear, Futuremonth, Futuredate);	// 日付取得

		cal.min_date = Today;	// スタート日付指定
		cal.max_date = Future;	// ラスト日時指定

		// ラスト日時指定を削除すると、スタート日付指定以前の過去日選択ができない仕様に替わります


	// 検索ボタンをクリックした時
	function btnSeekSubmit(btnName) {

		if (isNaN(objfrm.cmbARRY.value) == true) {
			alert('ご宿泊日は【半角数字】でご入力ください');
			return false;
		}

		if (isNaN(objfrm.cmbARRM.value) == true) {
			alert('ご宿泊日は【半角数字】でご入力ください');
			return false;
		}

		if (isNaN(objfrm.cmbARRD.value) == true) {
			alert('ご宿泊日は【半角数字】でご入力ください');
			return false;
		}


		// 日付の再構築
		tmpText = objfrm.cmbARRY.value + '/' + objfrm.cmbARRM.value + '/' + objfrm.cmbARRD.value;
		objfrm.hidSELECTARRYMD.value = tmpText;

		// 日程未定の切り分け
		if(objfrm.chkymd.checked == true) {
			objfrm.hidchkymd.value = "1";
		}else{
			objfrm.hidchkymd.value = "0";
		}

		// 人数未定の切り分け
		if(objfrm.chkpsn.checked == true) {
			objfrm.hidchkpsn.value = "1";
		}else{
			objfrm.hidchkpsn.value = "0";
		}

		// 表示内容切替の切り分け
		var i;

		if (objfrm.hiddispunit.length) {
			for (i = 0; i < objfrm.hiddispunit.length; i++) {
				if (objfrm.hiddispunit[i].checked) {
					objfrm.Dispunit.value = objfrm.hiddispunit[i].value;
				}
			}
		} else {
			if (objfrm.hiddispunit.checked) {
				objfrm.Dispunit.value = objfrm.hiddispunit.value;
			}
		}


		// 別ウインドウで表示する
		// 初期動作はこちらとなります

	if (modeChange == "on"){

		if (objfrm.hidchkymd.value == "1"){
			if (objfrm.hidchkpsn.value == "1"){
				try{
					window.open(pageTracker._getLinkerUrl('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value),'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				} catch (e) {
					window.open('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value,'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				}
			}
			if (objfrm.hidchkpsn.value == "0"){
				try{
					window.open(pageTracker._getLinkerUrl('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTadult='
 + objfrm.cmbADULT.value 
+ '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
+ '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
+ '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
+ '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
+ '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
+ '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
+ '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
+ '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
+ '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
+ '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
+ '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value),'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				} catch (e) {
					window.open('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTadult=' + objfrm.cmbADULT.value
 + '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
 + '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
 + '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
 + '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
 + '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
 + '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
 + '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
 + '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
 + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value,'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				}
			}
		}
		if (objfrm.hidchkymd.value == "0"){
			if (objfrm.hidchkpsn.value == "1"){
				try{
					window.open(pageTracker._getLinkerUrl('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value),'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				} catch (e) {
					window.open('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value,'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				}
			}
			if (objfrm.hidchkpsn.value == "0"){
				try{
					window.open(pageTracker._getLinkerUrl('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTadult=' + objfrm.cmbADULT.value
 + '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
 + '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
 + '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
 + '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
 + '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
 + '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
 + '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
 + '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
 + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value),'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				} catch (e) {
					window.open('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTadult=' + objfrm.cmbADULT.value 
 + '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
 + '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
 + '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
 + '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
 + '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
 + '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
 + '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
 + '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
 + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value,'planlist','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
				}
			}
		}

 	   	// そのままページ遷移する

	}else{
		if (objfrm.hidchkymd.value == "1"){
			if (objfrm.hidchkpsn.value == "1"){
				try{
					pageTracker._link('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value) ;
				} catch (e) {
					objfrm.action = 'https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value ;
					objfrm.method = 'POST';
					objfrm.submit();
				}
			}
			if (objfrm.hidchkpsn.value == "0"){
				try{
					pageTracker._link('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTadult=' + objfrm.cmbADULT.value
 + '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
 + '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
 + '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
 + '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
 + '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
 + '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
 + '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
 + '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
 + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value) ;
				} catch (e) {
					objfrm.action = 'https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTadult=' + objfrm.cmbADULT.value
 + '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
 + '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
 + '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
 + '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
 + '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
 + '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
 + '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
 + '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
 + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value ;
					objfrm.method = 'POST';
					objfrm.submit();
				}
			}
		}
		if (objfrm.hidchkymd.value == "0"){
			if (objfrm.hidchkpsn.value == "1"){
				try{
					pageTracker._link('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value) ;
				} catch (e) {
					objfrm.action = 'https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value ;
					objfrm.method = 'POST';
					objfrm.submit();
				}
			}
			if (objfrm.hidchkpsn.value == "0"){
				try{
					pageTracker._link('https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTadult=' + objfrm.cmbADULT.value
 + '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
 + '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
 + '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
 + '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
 + '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
 + '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
 + '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
 + '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
 + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value) ;
				} catch (e) {
					objfrm.action = 'https://asp.hotel-story.ne.jp/ver3d/planlist.asp?hcod1=' + hcod1 + '&hcod2=' + hcod2 + '&hidmode=select&mode=seek&hidSELECTARRYMD='+ objfrm.hidSELECTARRYMD.value + '&hidSELECTHAKSU='+ objfrm.hidSELECTHAKSU.value + '&room='+ objfrm.hidROOM.value + '&hidSELECTadult=' + objfrm.cmbADULT.value
 + '&hidSELECTchilda=' + objfrm.cmbCHILDa.value
 + '&hidSELECTchildb=' + objfrm.cmbCHILDb.value
 + '&hidSELECTchildc=' + objfrm.cmbCHILDc.value
 + '&hidSELECTchildd=' + objfrm.cmbCHILDd.value
 + '&hidSELECTchilde=' + objfrm.cmbCHILDe.value
 + '&hidSELECTchildf=' + objfrm.cmbCHILDf.value
 + '&hidSELECTchildg=' + objfrm.cmbCHILDg.value
 + '&hidSELECTchildh=' + objfrm.cmbCHILDh.value
 + '&hidSELECTchildi=' + objfrm.cmbCHILDi.value
 + '&hidSELECTchildj=' + objfrm.cmbCHILDj.value
 + '&hidSELECTminPrice=' + objfrm.minPrice.value + '&hidSELECTmaxPrice=' + objfrm.maxPrice.value + '&Dispunit=' + objfrm.Dispunit.value + '&chkymd=' + objfrm.hidchkymd.value + '&chkpsn=' + objfrm.hidchkpsn.value ;
					objfrm.method = 'POST';
					objfrm.submit();
				}
			}
		}

	} // END modeChange

	}

	// ご予約の確認・キャンセルボタンをクリックしたとき
	function btnSeekSubmitCancel(btnName) {

		// 別ウインドウで表示する

	if (modeChange == "on"){

		try{
			window.open(pageTracker._getLinkerUrl('https://asp.hotel-story.ne.jp/ver3d/ASPY0300.asp?cod1=' + hcod1 + '&cod2=' + hcod2 + ''),'cencel','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
		} catch (e) {
			window.open('https://asp.hotel-story.ne.jp/ver3d/ASPY0300.asp?cod1=' + hcod1 + '&cod2=' + hcod2 + '','cencel','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
		}


		// そのままページ遷移する

	}else{

		try{
			pageTracker._link('https://asp.hotel-story.ne.jp/ver3d/ASPY0300.asp?cod1=' + hcod1 + '&cod2=' + hcod2) ;
		} catch (e) {
			objfrm.action = 'https://asp.hotel-story.ne.jp/ver3d/ASPY0300.asp?cod1=' + hcod1 + '&cod2=' + hcod2 ;
			objfrm.method = 'POST';
			objfrm.submit();
		}

	} // END modeChange

	}


	//日付未定をクリックしたとき
	function cngchkymd(){
		var bochkymd = objfrm.chkymd.checked;
		objfrm.cmbARRY.disabled = bochkymd;
		objfrm.cmbARRM.disabled = bochkymd;
		objfrm.cmbARRD.disabled = bochkymd;
		objfrm.hidROOM.disabled = bochkymd;
		objfrm.hidSELECTHAKSU.disabled = bochkymd;
	}


	//人数未定をクリックしたとき
	function cngchkpsn(){
		var bochkymd = objfrm.chkpsn.checked;
		objfrm.cmbADULT.disabled  = bochkymd;
		objfrm.cmbCHILDa.disabled = bochkymd;
		objfrm.cmbCHILDb.disabled = bochkymd;
		objfrm.cmbCHILDc.disabled = bochkymd;
		objfrm.cmbCHILDd.disabled = bochkymd;
		objfrm.cmbCHILDe.disabled = bochkymd;
		objfrm.cmbCHILDf.disabled = bochkymd;
		objfrm.cmbCHILDg.disabled = bochkymd;
		objfrm.cmbCHILDh.disabled = bochkymd;
		objfrm.cmbCHILDi.disabled = bochkymd;
		objfrm.cmbCHILDj.disabled = bochkymd;
	}

