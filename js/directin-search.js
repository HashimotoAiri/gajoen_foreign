//  ========================================================
//  directin-search.js ---- Direct In �\�񌟍��^�O�N���X
//  Copyright 2011 Dynatech.inc <hotel-story@dyn.co.jp>
//  2011/02/08 - �X�^�[�g�o�[�W����
//  ========================================================




// �����ݒ�

var hcod1  = "72280"
var hcod2  = "001"

// �y���Ӂz���l��ύX���Ȃ��ł�������


// form ���w��
// form ��name��ύX����ꍇ�͕ύX���邱��
// index.html�ɂ�����̂œ��l�ɏC�����邱��

var objfrm =  document.frmplanseek

// �ʃE�B���h�E�\���ؑ�
var modeChange =  "false"; // on�F�ʃE�B���h�E �Ȃ��F���̂܂ܑJ��

(function (DYNns, $, undefined) {
	DYNns.$ = $;
}(window.DYNns = window.DYNns || {}, $.noConflict(true)));

	// �J�����_�[��\��������
		var cal = new JKL.Calendar("calid","frmplanseek","hidSELECTARRYMD");

		// �J�����_�[��̓��t�� ������܂Ŕ͈͎w�肷��
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

		var Futuredate = computeDate(Todayyear, Todaymonth, Todaydate, 364);	// 364������t�w��

		Futureyear  = Futuredate.getFullYear();
		Futuremonth = Futuredate.getMonth() + 1;
		Futuredate  = Futuredate.getDate();

		Future = Futureyear + "/" + Futuremonth + "/" + Futuredate;	// ���t�u��

		Future = new Date(Futureyear, Futuremonth, Futuredate);	// ���t�擾

		cal.min_date = Today;	// �X�^�[�g���t�w��
		cal.max_date = Future;	// ���X�g�����w��

		// ���X�g�����w����폜����ƁA�X�^�[�g���t�w��ȑO�̉ߋ����I�����ł��Ȃ��d�l�ɑւ��܂�


	// �����{�^�����N���b�N������
	function btnSeekSubmit(btnName) {

		if (isNaN(objfrm.cmbARRY.value) == true) {
			alert('���h�����́y���p�����z�ł����͂�������');
			return false;
		}

		if (isNaN(objfrm.cmbARRM.value) == true) {
			alert('���h�����́y���p�����z�ł����͂�������');
			return false;
		}

		if (isNaN(objfrm.cmbARRD.value) == true) {
			alert('���h�����́y���p�����z�ł����͂�������');
			return false;
		}


		// ���t�̍č\�z
		tmpText = objfrm.cmbARRY.value + '/' + objfrm.cmbARRM.value + '/' + objfrm.cmbARRD.value;
		objfrm.hidSELECTARRYMD.value = tmpText;

		// ��������̐؂蕪��
		if(objfrm.chkymd.checked == true) {
			objfrm.hidchkymd.value = "1";
		}else{
			objfrm.hidchkymd.value = "0";
		}

		// �l������̐؂蕪��
		if(objfrm.chkpsn.checked == true) {
			objfrm.hidchkpsn.value = "1";
		}else{
			objfrm.hidchkpsn.value = "0";
		}

		// �\�����e�ؑւ̐؂蕪��
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


		// �ʃE�C���h�E�ŕ\������
		// ��������͂�����ƂȂ�܂�

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

 	   	// ���̂܂܃y�[�W�J�ڂ���

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

	// ���\��̊m�F�E�L�����Z���{�^�����N���b�N�����Ƃ�
	function btnSeekSubmitCancel(btnName) {

		// �ʃE�C���h�E�ŕ\������

	if (modeChange == "on"){

		try{
			window.open(pageTracker._getLinkerUrl('https://asp.hotel-story.ne.jp/ver3d/ASPY0300.asp?cod1=' + hcod1 + '&cod2=' + hcod2 + ''),'cencel','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
		} catch (e) {
			window.open('https://asp.hotel-story.ne.jp/ver3d/ASPY0300.asp?cod1=' + hcod1 + '&cod2=' + hcod2 + '','cencel','width=1000,Height=600,resizable=yes,scrollbars=yes,status=yes');
		}


		// ���̂܂܃y�[�W�J�ڂ���

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


	//���t������N���b�N�����Ƃ�
	function cngchkymd(){
		var bochkymd = objfrm.chkymd.checked;
		objfrm.cmbARRY.disabled = bochkymd;
		objfrm.cmbARRM.disabled = bochkymd;
		objfrm.cmbARRD.disabled = bochkymd;
		objfrm.hidROOM.disabled = bochkymd;
		objfrm.hidSELECTHAKSU.disabled = bochkymd;
	}


	//�l��������N���b�N�����Ƃ�
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

