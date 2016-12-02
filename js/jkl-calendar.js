//  ========================================================
//  jkl-calendar.js ---- �|�b�v�A�b�v�J�����_�[�\���N���X
//  Copyright 2005-2006 Kawasaki Yusuke <u-suke [at] kawa.net>
//  2005/04/06 - �ŏ��̃o�[�W����
//  2005/04/10 - �O���X�^�C���V�[�g���g�p���Ȃ��AJKL.Opacity �̓I�v�V����
//  2006/10/22 - typo�C���Aspliter/min_date/max_date�v���p�e�B�A�~�{�^���ǉ�
//  2006/10/23 - prototype.js���p���́AEvent.observe()�ŃC�x���g�o�^
//  2006/10/24 - max_date �͈̓o�O�C��
//  2006/10/25 - �t�H�[���ɏ����l������΁A�J�����_�[�̏����l�ɍ̗p����
//  2006/11/15 - MOM Update �T�̏��߂̗j����ύX�ł���悤�ɏC��
//  2006/11/23 - MOM Update �������t�̕����F���w��ł���悤�ɏC���A���Ƙg�����`�悵�Ă݂�
//               �ז���<select>�ւ̉��}���u�������Ă݂�
//  2006/11/27 - MOM Update �ז���<select>�ւ̉��}���u���C���A�`��̈�̍������擾����
//  2006/11/30 - MOM Update �I���\�ȗj�����v���p�e�B�ɒǉ��A�������t�ƑI��s�\�ȓ��t�̔w�i�F���X�^�C���ɒǉ�
//               �J�����_�[��z-index���v���p�e�B�ɒǉ�
//  2006/12/04 - ksuzu Update �I���\�����Ȃ����ɂ͈ړ��ł��Ȃ��悤�ɕύX
//               �J�����_�[�̕\�������N���b�N����ƌ��݂̌��Ɉړ��ł���悤�ύX
//               ����{�^���ɂăJ�����_�[������Ƃ��A�J�����_�[�̏����\����߂��悤�ύX
//  2006/12/30 - MOM IFRAME��SRC������dummy.html��}��
//  2007/02/04 - MOM setDateYMD�̃o�O���C��
//               TD�^�O�̃X�^�C���ɔw�i�F���w�肷��悤�C��
//  2013/10/18 - DYN �j���𕶎��F��ύX����悤�ɏC��
//
//  ========================================================

// �e�N���X

if ( typeof(JKL) == 'undefined' ) JKL = function() {};

// JKL.Calendar �R���X�g���N�^�̒�`

JKL.Calendar = function ( eid, fid, valname ) {
    // 2013.10.18 DYN �j�� �֐��ݒ�
    this.initHoliday();

    this.eid = eid;
    this.formid = fid;
    this.valname = valname;
    this.__dispelem = null;  // �J�����_�[�\�����G�������g
    this.__textelem = null;  // �e�L�X�g���͗��G�������g
    this.__opaciobj = null;  // JKL.Opacity �I�u�W�F�N�g
    this.style = new JKL.Calendar.Style();
    return this;
};

// �o�[�W�����ԍ�

JKL.Calendar.VERSION = "0.13";

// �f�t�H���g�̃v���p�e�B

JKL.Calendar.prototype.spliter = "/";
JKL.Calendar.prototype.date = null;
JKL.Calendar.prototype.min_date = null;
JKL.Calendar.prototype.max_date = null;

// 2006.11.15 MOM �\���J�n�j�����v���p�e�B�ɒǉ�(�f�t�H���g�͓��j��=0)
JKL.Calendar.prototype.start_day = 0;

// 2006.11.23 MOM �J�����_�[���̓��t��g���ŋ�؂邩�ǂ����̃v���p�e�B(�f�t�H���g��true)
JKL.Calendar.prototype.draw_border = true;

// 2006.11.30 MOM �e�j���̑I���ۂ��v���p�e�B�ɒǉ�(�f�t�H���g�͑S��true)
// �z��̓Y�����ŗj�����w��(0�`6 = ���j�`�y�j)�A�I���ۂ�boolean�l�ő������A�Ƃ����g����
JKL.Calendar.prototype.selectable_days = new Array(true,true,true,true,true,true,true);

// 2006.11.30 MOM �J�����_�[��z-index���v���p�e�B�ɒǉ�
JKL.Calendar.prototype.zindex = 10;

// 2013.10.18 DYN �j���v���p�e�B�ǉ�
JKL.Calendar.prototype.holiday = null;

// JKL.Calendar.Style
JKL.Calendar.Style = function() {
    return this;
};

// �f�t�H���g�̃X�^�C��

JKL.Calendar.Style.prototype.frame_width        = "220px";      // �t���[������
JKL.Calendar.Style.prototype.frame_color        = "#CCCCCC";    // �t���[���g�̐F
JKL.Calendar.Style.prototype.font_size          = "12px";       // �����T�C�Y
JKL.Calendar.Style.prototype.day_bgcolor        = "#FFFFFF";    // �J�����_�[�̔w�i�F
JKL.Calendar.Style.prototype.month_color        = "#333333";    // ���N���������̔w�i�F
JKL.Calendar.Style.prototype.month_hover_color  = "#333333";    // ���̃}�E�X�I�[�o�[���́�╶���F
JKL.Calendar.Style.prototype.month_hover_bgcolor= "#DDDDDD";    // ���̃}�E�X�I�[�o�[���́��w�i�F
JKL.Calendar.Style.prototype.weekday_color      = "#404040";    // ���j�`���j���Z���̕����F
JKL.Calendar.Style.prototype.saturday_color     = "#0040D0";    // �y�j���Z���̕����F
JKL.Calendar.Style.prototype.sunday_color       = "#D00000";    // ���j���Z���̕����F
JKL.Calendar.Style.prototype.others_color       = "#AAAAAA";    // ���̌��̓��Z���̕����F
JKL.Calendar.Style.prototype.day_hover_bgcolor  = "#FEB797";    // ���t�̃}�E�X�I�[�o�[���̓��Z���̔w�i
JKL.Calendar.Style.prototype.cursor             = "pointer";    // ���t�̃}�E�X�I�[�o�[���̃J�[�\���`��

// 2006.11.23 MOM �������t�̕����F���v���p�e�B�ɒǉ�
JKL.Calendar.Style.prototype.today_color        = "#666666";    // �������t�Z���̕����F

// 2006.11.23 MOM �g�������Ă݂�
JKL.Calendar.Style.prototype.today_border_color = "#666666";    // �������t�Z���̘g���̐F
JKL.Calendar.Style.prototype.others_border_color= "#EEEEEE";    // ���̓��Z���̘g���̐F

// 2006.11.30 MOM �������t�̔w�i�F��Y��Ă��̂Œǉ����Ă݂�
JKL.Calendar.Style.prototype.today_bgcolor      = "#FFFFFF";    // �������t�Z���̔w�i�F

// 2006.11.30 MOM �I��s�\�ȓ��t�̔w�i�F��ǉ�
JKL.Calendar.Style.prototype.unselectable_day_bgcolor = "#EEEEEE";    // �I��s�\�ȓ��t�̔w�i�F

// 2013.10.18 DYN �j���Z���̕����F��ǉ�
JKL.Calendar.Style.prototype.holiday_color      = "#D00000";

//  ���\�b�h

JKL.Calendar.Style.prototype.set = function(key,val) { this[key] = val; }
JKL.Calendar.Style.prototype.get = function(key) { return this[key]; }
JKL.Calendar.prototype.setStyle = function(key,val) { this.style.set(key,val); };
JKL.Calendar.prototype.getStyle = function(key) { return this.style.get(key); };

// ���t������������

JKL.Calendar.prototype.initDate = function ( dd ) {
    if ( ! dd ) dd = new Date();
    var year = dd.getFullYear();
    var mon  = dd.getMonth();
    var date = dd.getDate();
    this.date = new Date( year, mon, date );
    this.getFormValue();
    return this.date;
}

// 2013.10.18 DYN �j�����擾����
JKL.Calendar.prototype.initHoliday = function () {
    var holiday = new Array();

    // google����
    if (!this.date) this.initDate();

    var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 13, 01); // 13������

    // �t�H�[�}�b�g
    var startM = this.date.getMonth() + 1;
    //var endM = endDate.getMonth() + 1;
    if (startM < 10) startM = '0' + startM;
    //if (endM < 10) endM = '0' + endM;

    var start = this.date.getFullYear() + '-' + startM + '-01'; // ��������
    //var end   = endDate.getFullYear() + '-' + endM + '-01';     // 13������܂łƂ��Ă���

    DYNns.$.ajax({
        // 2014.11.18 DYN url�ύX
        //url: 'http://www.google.com/calendar/feeds/japanese__ja%40holiday.calendar.google.com/public/full?alt=json&start-min=' + start + '&start-max=' + end,
        url:'https://asp.hotel-story.ne.jp/API/jp-holidays.js',
        type: 'GET',
        dataType: 'jsonp',
        scriptCharset: 'utf-8',
        timeout: 5000,
        // 2014.11.18 DYN �ǉ�
        jsonpCallback: 'callback',
        success: function (data) {
            //s 2014.11.18 DYN �����ύX
            /*var entry = data.feed.entry;
            for (var i = 0; i < entry.length; i++) {
                holiday.push(entry[i].gd$when[0].startTime.replace(/-/g, '/'));
            }*/

            for (var key in data) {
                if (start <= key.replace(/\//g, '-')) {
                    holiday.push(key.replace(/-/g, '/'));
                }
            }
            //e 2014.11.18 DYN �����ύX
            holiday.sort();
        },
        error: function (data) {
        },
        complete: function (data) {
        }
    });

    this.holiday = holiday;
}


// �����x�ݒ�̃I�u�W�F�N�g��Ԃ�

JKL.Calendar.prototype.getOpacityObject = function () {
    if ( this.__opaciobj ) return this.__opaciobj;
    var cal = this.getCalendarElement();
    if ( ! JKL.Opacity ) return;
    this.__opaciobj = new JKL.Opacity( cal );
    return this.__opaciobj;
};

// �J�����_�[�\�����̃G�������g��Ԃ�

JKL.Calendar.prototype.getCalendarElement = function () {
    if ( this.__dispelem ) return this.__dispelem;
    this.__dispelem = document.getElementById( this.eid )
    return this.__dispelem;
};

// �e�L�X�g���͗��̃G�������g��Ԃ�

JKL.Calendar.prototype.getFormElement = function () {
    if ( this.__textelem ) return this.__textelem;
    var frmelms = document.getElementById( this.formid );
    if ( ! frmelms ) return;
    for( var i=0; i < frmelms.elements.length; i++ ) {
        if ( frmelms.elements[i].name == this.valname ) {
            this.__textelem = frmelms.elements[i];
        }
    }
    return this.__textelem;
};

// �I�u�W�F�N�g�ɓ��t���L������iYYYY/MM/DD�`���Ŏw�肷��j

JKL.Calendar.prototype.setDateYMD = function (ymd) {
    var splt = ymd.split( this.spliter );
    if ( splt[0]-0 > 0 &&
         splt[1]-0 >= 1 && splt[1]-0 <= 12 &&       // bug fix 2006/03/03 thanks to ucb
         splt[2]-0 >= 1 && splt[2]-0 <= 31 ) {
        if ( ! this.date ) this.initDate();
            this.date.setDate( splt[2] );
            this.date.setMonth( splt[1]-1 );
            this.date.setFullYear( splt[0] );
    } else {
        ymd = "";
    }
    return ymd;
};

// �I�u�W�F�N�g������t�����o���iYYYY/MM/DD�`���ŕԂ�j
// ������ Date �I�u�W�F�N�g�̎w�肪����΁A
// �I�u�W�F�N�g�͖������āA�����̓��t���g�p����i�P�Ȃ�fprint�@�\�j

JKL.Calendar.prototype.getDateYMD = function ( dd ) {
    if ( ! dd ) {
        if ( ! this.date ) this.initDate();
        dd = this.date;
    }
    var mm = "" + (dd.getMonth()+1);
    var aa = "" + dd.getDate();
    if ( mm.length == 1 ) mm = "" + "0" + mm;
    if ( aa.length == 1 ) aa = "" + "0" + aa;
    return dd.getFullYear() + this.spliter + mm + this.spliter + aa;
};

// �e�L�X�g���͗��̒l��Ԃ��i���łɃI�u�W�F�N�g���X�V����j

JKL.Calendar.prototype.getFormValue = function () {
    var form1 = this.getFormElement();
    if ( ! form1 ) return "";
    var date1 = this.setDateYMD( form1.value );
    return date1;
};

// �t�H�[�����͗��Ɏw�肵���l����������

JKL.Calendar.prototype.setFormValue = function (ymd) {
    if ( ! ymd ) ymd = this.getDateYMD();   // ���w�莞�̓I�u�W�F�N�g����H
    var form1 = this.getFormElement();
    if ( form1 ) form1.value = ymd;
};

// 2011.02.09 DYN�ǉ�
// �J�����_�[������t�f�[�^��߂�
JKL.Calendar.prototype.SetCalenderYmd = function (ymd) {
	var warrArray = new Array;
	var warrY;
	var warrM;
	var warrD;
	var cnt;

	warrArray = ymd.split('/');
	warrY�@�@ = warrArray[0];
	warrM�@�@ = Number(warrArray[1]);
	warrD�@�@ = Number(warrArray[2]);


	document.getElementById(this.formid).cmbARRY.value = warrY;
	document.getElementById(this.formid).cmbARRM.value = warrM;
	document.getElementById(this.formid).cmbARRD.value = warrD;

};

//  �J�����_�[�\������\������

JKL.Calendar.prototype.show = function () {
    this.getCalendarElement().style.display = "";
};

//  �J�����_�[�\�����𑦍��ɉB��

JKL.Calendar.prototype.hide = function () {
    this.getCalendarElement().style.display = "none";
};

//  �J�����_�[�\�������t�F�[�h�A�E�g����

JKL.Calendar.prototype.fadeOut = function (s) {
    if ( JKL.Opacity ) {
        this.getOpacityObject().fadeOut(s);
    } else {
        this.hide();
    }
};

// ���P�ʂňړ�����

JKL.Calendar.prototype.moveMonth = function ( mon ) {
    // �O�ֈړ�
    if ( ! this.date ) this.initDate();
    for( ; mon<0; mon++ ) {
        this.date.setDate(1);   // ����1����1���O�͕K���O�̌�
        this.date.setTime( this.date.getTime() - (24*3600*1000) );
    }
    // ��ֈړ�
    for( ; mon>0; mon-- ) {
        this.date.setDate(1);   // ����1����32����͕K�����̌�
        this.date.setTime( this.date.getTime() + (24*3600*1000)*32 );
    }
    this.date.setDate(1);       // ������1���ɖ߂�
    this.write();    // �`�悷��
};

// �C�x���g��o�^����

JKL.Calendar.prototype.addEvent = function ( elem, ev, func ) {
//  prototype.js ������Η��p����(IE���������[�N���)
    if ( window.Event && Event.observe ) {
        Event.observe( elem, ev, func, false );
    } else {
        elem["on"+ev] = func;
    }
}

// �J�����_�[��`�悷��

JKL.Calendar.prototype.write = function () {
    var date = new Date();
    if ( ! this.date ) this.initDate();
    date.setTime( this.date.getTime() );

    var year  = date.getFullYear();          // �w��N
    var mon   = date.getMonth();             // �w�茎
    var today = date.getDate();              // �w���
    var form1 = this.getFormElement();

    // 2013.10.18 DYN �w�茎�̏j�������o��
    var holy = new Array();
    for (var i = 0; i < this.holiday.length; i++) {
        var ymd = this.holiday[i].split('/');
        if (ymd[0] == year && ymd[1] == mon+1) {
            holy.push(ymd[2]);
        }
    }


// 2011.6.17 DYN  �[��̔����Ԃ�ݒ�i�ʏ��0��ݒ�j
    var midnight  = 5;
    var checktime = new Date();
    var hours     = (new Date(checktime.getHours())).getTime();

    // �I���\�ȓ��t�͈�
    var min;
    if ( this.min_date ) {

        // 2011.6.17 DYN �ŏ��ɐ[��̔��imidnight���j�܂ł��ǂ������`�F�b�N����
        if ( midnight > hours ){
           this.min_date.setDate(checktime.getDate() - 1);
           var tmp = new Date( this.min_date.getFullYear(), this.min_date.getMonth(), this.min_date.getDate() );
        }else{
           var tmp = new Date( this.min_date.getFullYear(), this.min_date.getMonth(), this.min_date.getDate() );
        }
        min = tmp.getTime();
    }
    var max;
    if ( this.max_date ) {
        var tmp = new Date( this.max_date.getFullYear(), 
            this.max_date.getMonth(), this.max_date.getDate() );
        max = tmp.getTime();
    }

    // ���O�̌��j���܂Ŗ߂�
    date.setDate(1);                        // 1���ɖ߂�
    var wday = date.getDay();               // �j�� ���j(0)�`�y�j(6)

// 2006.11.15 MOM �\���J�n�j�����ςɂ����̂ŁA���W�b�N������Ƃ�����܂���
    if ( wday != this.start_day ) {
        date.setTime( date.getTime() - (24*3600*1000)*((wday-this.start_day+7)%7) );
    }


    // �ő��7���~6�T�ԁ�42�����̃��[�v
    var list = new Array();
    for( var i=0; i<42; i++ ) {
        var tmp = new Date();
        tmp.setTime( date.getTime() + (24*3600*1000)*i );
        if ( i && i%7==0 && tmp.getMonth() != mon ) break;
        list[list.length] = tmp;
    }

    // �X�^�C���V�[�g�𐶐�����
    var month_table_style = 'width: 100%; ';
    month_table_style += 'background: '+this.style.frame_color+'; ';
    month_table_style += 'border: 1px solid '+this.style.frame_color+';';

    var week_table_style = 'width: 100%; ';
    week_table_style += 'background: '+this.style.day_bgcolor+'; ';
    week_table_style += 'border-left: 1px solid '+this.style.frame_color+'; ';
    week_table_style += 'border-right: 1px solid '+this.style.frame_color+'; ';

    var days_table_style = 'width: 100%; ';
    days_table_style += 'background: '+this.style.day_bgcolor+'; ';
    days_table_style += 'border: 1px solid '+this.style.frame_color+'; ';

    var month_td_style = "";
// 2007.02.04 MOM TD�^�O���w�i�F�̃X�^�C���𖾎��I�Ɏw�肷��
    month_td_style += 'background: '+this.style.frame_color+'; ';
    month_td_style += 'font-size: '+this.style.font_size+'; ';
    month_td_style += 'color: '+this.style.month_color+'; ';
    month_td_style += 'padding: 4px 0px 2px 0px; ';
    month_td_style += 'text-align: center; ';
    month_td_style += 'font-weight: bold;';

    var week_td_style = "";
// 2007.02.04 MOM TD�^�O���w�i�F�̃X�^�C���𖾎��I�Ɏw�肷��
    week_td_style += 'background: '+this.style.day_bgcolor+'; ';
    week_td_style += 'font-size: '+this.style.font_size+'; ';
    week_td_style += 'padding: 2px 0px 2px 0px; ';
    week_td_style += 'font-weight: bold;';
    week_td_style += 'text-align: center;';

    var days_td_style = "";
// 2007.02.04 MOM TD�^�O���w�i�F�̃X�^�C���𖾎��I�Ɏw�肷��
    days_td_style += 'background: '+this.style.day_bgcolor+'; ';
    days_td_style += 'font-size: '+this.style.font_size+'; ';
    days_td_style += 'padding: 1px; ';
    days_td_style += 'text-align: center; ';
    days_td_style += 'font-weight: bold;';

    var days_unselectable = "font-weight: normal;";

    // HTML�\�[�X�𐶐�����
    var src1 = "";

// 2006.11.23 MOM �ז���<select>�ւ̉��}���u���̂P
// �e�[�u����div�ň͂�ŏ�ʃ��C���ɐݒ�(z-index�̒l��傫�����Ă���)
// 2006.11.27 MOM �`��t�B�[���h�̍������擾���邽�߁Aid���Z�b�g���Ă���
    src1 += '<div id="'+this.eid+'_screen" style="position:relative;z-index:'+(this.zindex+1)+';">\n';

    src1 += '<table border="0" cellpadding="0" cellspacing="0" style="'+month_table_style+'"><tr>';
    src1 += '<td id="__'+this.eid+'_btn_prev" title="�O�̌���" style="'+month_td_style+'">��</td>';
    src1 += '<td style="'+month_td_style+'">&nbsp;</td>';
// 2006.12.04 ksuzu �\�������N���b�N����ƌ��݂̌��Ɉړ�
    src1 += '<td id="__'+this.eid+'_btn_today" style="'+month_td_style+'">'+(year)+'�N '+(mon+1)+'��</td>';
    src1 += '<td id="__'+this.eid+'_btn_close" title="����" style="'+month_td_style+'">�~</td>';
    src1 += '<td id="__'+this.eid+'_btn_next" title="���̌���" style="'+month_td_style+'">��</td>';
    src1 += "</tr></table>\n";
    src1 += '<table border="0" cellpadding="0" cellspacing="0" style="'+week_table_style+'"><tr>';

// 2006.11.15 MOM �\���J�n�j��start_day���珇�Ɉ�T�ԕ��\������
    for(var i = this.start_day; i < this.start_day + 7; i++){
        var _wday = i%7;
        if(_wday == 0){
             src1 += '<td style="color: '+this.style.sunday_color+'; '+week_td_style+'">��</td>';
        }else if(_wday == 6){
             src1 += '<td style="color: '+this.style.saturday_color+'; '+week_td_style+'">�y</td>';
        }else{
             src1 += '<td style="color: '+this.style.weekday_color+'; '+week_td_style+'">';
            if(_wday == 1)        src1 += '��</td>';
            else if(_wday == 2)    src1 += '��</td>';
            else if(_wday == 3)    src1 += '��</td>';
            else if(_wday == 4)    src1 += '��</td>';
            else if(_wday == 5)    src1 += '��</td>';
        }
    }


    src1 += "</tr></table>\n";
    src1 += '<table border="0" cellpadding="0" cellspacing="0" style="'+days_table_style+'">';

    var curutc;
    if ( form1 && form1.value ) {
        var splt = form1.value.split(this.spliter);
        if ( splt[0] > 0 && splt[2] > 0 ) {
            var curdd = new Date( splt[0]-0, splt[1]-1, splt[2]-0 );
            curutc = curdd.getTime(); // �t�H�[����̓���
        }
    }

//2006.11.23 MOM �������t���擾���A�����b��؂�̂Ă�
    var realdd   = new Date();
    var realutc  = (new Date(realdd.getFullYear(),realdd.getMonth(),realdd.getDate())).getTime();

    for ( var i=0; i<list.length; i++ ) {
        var dd = list[i];
        var ww = dd.getDay();
        var mm = dd.getMonth();

        if ( ww == this.start_day ) {
            src1 += "<tr>"; // �\���J�n�j���̑O�ɍs��
        }

        var cc  = days_td_style;
        var utc = dd.getTime();

        if ( mon == mm ) {

//2006.11.23 MOM �ŏ��ɍ������t���ǂ������`�F�b�N����
//�������łȂ��ꍇ�ɂ��F�ς���ƑI���ł������Ɍ����ĕ���킵���̂ŁA�������������t�̏ꍇ�̂ݐF��ς���
            if ( utc == realutc ){
                cc += "color: "+this.style.today_color+";";     // �������t
            } else

            //s131018 t-suhara �����̏j����ǉ�
                if (dd.getDate() == holy[0]) {
                    cc += "color: " + this.style.holiday_color + ";";
                    holy = holy.slice(1);
                } else
                //e131018 t-suhara
                    if (ww == 0) {
                        cc += "color: " + this.style.sunday_color + ";";    // �����̓��j��
                    } else if (ww == 6) {
                        cc += "color: " + this.style.saturday_color + ";";  // �����̓y�j��
                    } else {
                        cc += "color: " + this.style.weekday_color + ";";   // �����̕���
                    }

        } else {
            cc += "color: "+this.style.others_color+";";        // �O�����Ɨ������̓��t
        }

//2006.11.23 MOM utc�̕ϐ��錾�����Ɉړ�
//      var utc = dd.getTime();

// 2006.11.30 MOM �I���\�ȗj���w��̏����ǉ�
//        if (( min && min > utc ) || ( max && max < utc )) {
        if (( min && min > utc ) || ( max && max < utc ) || ( !this.selectable_days[dd.getDay()] )) {
            cc += days_unselectable;
        }
        if ( utc == curutc ) { // �t�H�[����̓���
            cc += "background: "+this.style.day_hover_bgcolor+";";
        }
// 2006.11.30 MOM �������t�̔w�i�F
        else if ( mon == mm && utc == realutc ) {
            cc += "background: "+this.style.today_bgcolor+";";
        }
// 2006.11.30 MOM �I��s�\�ȓ��t�̔w�i�F
        else if (( min && min > utc ) || ( max && max < utc ) || ( !this.selectable_days[dd.getDay()] )) {
            cc += 'background: '+this.style.unselectable_day_bgcolor+';';
        }

//2006.11.23 MOM �g���`���ǉ�
        if ( this.draw_border ){
            if ( mon == mm && utc == realutc ){
                cc += "border:solid 1px "+this.style.today_border_color+";";    // �������������t
            } else {
                cc += "border:solid 1px "+this.style.others_border_color+";";    // ���̑�
            }
        }

        var ss = this.getDateYMD(dd);
        var tt = dd.getDate();

        src1 += '<td style="'+cc+'" title='+ss+' id="__'+this.eid+'_td_'+ss+'">'+tt+'</td>';

        if ( ww == (this.start_day+6)%7 ) {
            src1 += "</tr>\n";                                  // �\���J�n�j���̂P��O�ōs��
        }
    }
    src1 += "</table>\n";

    src1 += '</div>\n';

    // �J�����_�[������������
    var cal1 = this.getCalendarElement();
    if ( ! cal1 ) return;
    cal1.style.width = this.style.frame_width;
    cal1.style.position = "absolute";
    cal1.innerHTML = src1;


// 2006.11.23 MOM �ז���<select>�ւ̉��}���u���̂Q
// �J�����_�[�ƑS�������T�C�Y��IFRAME�𐶐����A���W����v�����ĉ��ʃ��C���ɕ`�悷��

// IFRAME�Ή����\�ȃo�[�W�����̂ݏ��u���{��
    var ua = navigator.userAgent;
    if( ua.indexOf("MSIE 5.5") >= 0 || ua.indexOf("MSIE 6") >= 0 ){

// 2006.11.27 MOM ���innerHTML�ɃJ�����_�[�̎��̂�n���Ă����āA�`��t�B�[���h�̍������擾����
// ��hide()���Ă΂ꂽ���ゾ�ƁAoffsetHeight��0�ɂȂ��Ă��܂��̂ŁA�ꎞ�I��show���Ă�
        this.show();
        var screenHeight = cal1.document.getElementById(this.eid+"_screen").offsetHeight;
        this.hide();

        src1 += '<div style="position:absolute;z-index:'+this.zindex+';top:0px;left:0px;">';
        src1 += '<iframe /?scid="dummy.htm" frameborder=0 scrolling=no width='+this.style.frame_width+' height='+screenHeight+'></iframe>';
        src1 += '</div>\n';

//���߂�innerHTML�ɃZ�b�g
        cal1.innerHTML = src1;
    }



    // �C�x���g��o�^����
    var __this = this;
    var get_src = function (ev) {
        ev  = ev || window.event;
        var src = ev.target || ev.srcElement;
        return src;
    };
    var month_onmouseover = function (ev) {
        var src = get_src(ev);
        src.style.color = __this.style.month_hover_color;
        src.style.background = __this.style.month_hover_bgcolor;
    };
    var month_onmouseout = function (ev) {
        var src = get_src(ev);
        src.style.color = __this.style.month_color;
        src.style.background = __this.style.frame_color;
    };
    var day_onmouseover = function (ev) {
        var src = get_src(ev);
        src.style.background = __this.style.day_hover_bgcolor;
    };
    var day_onmouseout = function (ev) {
        var src = get_src(ev);
// 2006.11.30 MOM �������������t�ł���΁A�������t�p�̔w�i�F��K�p
        var today = new Date();
        if( today.getMonth() == __this.date.getMonth() && src.id == '__'+__this.eid+'_td_'+__this.getDateYMD(today) ){
            src.style.background = __this.style.today_bgcolor;
        }else{
            src.style.background = __this.style.day_bgcolor;
        }
    };
    var day_onclick = function (ev) {
        var src = get_src(ev);
        var srcday = src.id.substr(src.id.length-10);
//      __this.setFormValue( srcday );
	__this.SetCalenderYmd( srcday );
        __this.fadeOut( 1.0 );
    };

//
// 2006.12.04 ksuzu �I���ł��Ȃ����ւ̃����N�͍쐬���Ȃ�
//
    // �O�̌��փ{�^��
    var tdprev = document.getElementById( "__"+this.eid+"_btn_prev" );
    //�O�̌��̍ŏI��
    var tmpDate = new Date(year,mon,1);
    tmpDate.setTime( tmpDate.getTime() - (24*3600*1000) );
    //�I���\�ȓ�������H
    if ( !min || this.min_date <= tmpDate ){
        tdprev.style.cursor = this.style.cursor;
        this.addEvent( tdprev, "mouseover", month_onmouseover );
        this.addEvent( tdprev, "mouseout", month_onmouseout );
        this.addEvent( tdprev, "click", function(){ __this.moveMonth( -1 ); });
    }
    //�I��s�\
    else{
        tdprev.title = "�O�̌��͑I���ł��܂���";
    }


//
// 2006.12.04 ksuzu �\�������N���b�N����ƌ��݂̌��Ɉړ�
//
    var nMov = (realdd.getFullYear() - year) * 12 + (realdd.getMonth() - mon);
    if ( nMov != 0 ){
        // ���݂̌��փ{�^��
        var tdtoday = document.getElementById( "__"+this.eid+"_btn_today" );
        tdtoday.style.cursor = this.style.cursor;
        tdtoday.title = "���݂̌���";
        this.addEvent( tdtoday, "mouseover", month_onmouseover );
        this.addEvent( tdtoday, "mouseout", month_onmouseout );
        this.addEvent( tdtoday, "click", function(){ __this.moveMonth( nMov ); });
    }

    // ����{�^��
    var tdclose = document.getElementById( "__"+this.eid+"_btn_close" );
    tdclose.style.cursor = this.style.cursor;
    this.addEvent( tdclose, "mouseover", month_onmouseover );
    this.addEvent( tdclose, "mouseout", month_onmouseout );

//
// 2006.12.04 ksuzu �J�����_�[�̏����\����߂�
//
    this.addEvent( tdclose, "click", function(){ __this.getFormValue(); __this.hide(); });

//
// 2006.12.04 ksuzu �I���ł��Ȃ����ւ̃����N�͍쐬���Ȃ�
//
    // ���̌��փ{�^��
    var tdnext = document.getElementById( "__"+this.eid+"_btn_next" );
    //���̌��̏���
    var tmpDate = new Date(year,mon,1);
    tmpDate.setTime( tmpDate.getTime() + (24*3600*1000)*32 );
    tmpDate.setDate(1);
    //�I���\�ȓ�������H
    if ( !max || this.max_date >= tmpDate ){
        tdnext.style.cursor = this.style.cursor;
        this.addEvent( tdnext, "mouseover", month_onmouseover );
        this.addEvent( tdnext, "mouseout", month_onmouseout );
        this.addEvent( tdnext, "click", function(){ __this.moveMonth( +1 ); });
    }
    //�I��s�\
    else{
        tdnext.title = "���̌��͑I���ł��܂���";
    }


    // �Z�����Ƃ̃C�x���g��o�^����
    for ( var i=0; i<list.length; i++ ) {
        var dd = list[i];
        if ( mon != dd.getMonth() ) continue;       // �����̃Z���ɂ̂ݐݒ肷��

        var utc = dd.getTime();
        if ( min && min > utc ) continue;           // �̉߂���
        if ( max && max < utc ) continue;           // �����߂���
//      if ( utc == curutc ) continue;              // �t�H�[����̓���
// 2006.11.30 MOM �I���\�ȗj���w��Ή�
        if ( !this.selectable_days[dd.getDay()] ) continue;

        var ss = this.getDateYMD(dd);
        var cc = document.getElementById( "__"+this.eid+"_td_"+ss );
        if ( ! cc ) continue;

        cc.style.cursor = this.style.cursor;
        this.addEvent( cc, "mouseover", day_onmouseover );
        this.addEvent( cc, "mouseout", day_onmouseout );
        this.addEvent( cc, "click", day_onclick );
    }

    // �\������
    this.show();

};


// ���o�[�W�����݊��itypo�j
JKL.Calendar.prototype.getCalenderElement = JKL.Calendar.prototype.getCalendarElement;
JKL.Calender = JKL.Calendar;
