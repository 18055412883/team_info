function limit_letter_chinese(ob,message=null){//正则表达式限制输入格式为字母、汉字、顿号、中英文逗号，减号、下划线，英文.,使用可选参数message辅助提示信息
    var value = ob.value;
    var reg = /^[a-zA-Z\u4e00-\u9fa5、,，\-_ .]+$/g;
    var tag = reg.test(value);
    if(value.length === 0) return false; //避免对空输入框的正则检测
    if(!tag){ //不符合正则表达式要求
        if(message != null)
        alert("请检查"+message+"输入格式,要求为中文或字母可用、隔开！");
        return false;
    }
    return true;

}

function limit_tel(ob,message = null) {//限制输入为手机号码格式（11位）数字
    var value = ob.value;
    var reg = /^\d{1,11}$/g;
    var tag = reg.test(value);
    if(value.length === 0) return false; //避免对空输入框的正则检测
    if(!tag){
        alert("请检查"+message+"输入格式！,要求为小于等于11位的电话号码.");
        return false;
    }
    return true;
}

function limit_letter_chinese_length(ob,length = 20,message= null) {//限制输入为字母、汉字的最大长度,默认长度为20
    var value = ob.value;
    var tag = limit_letter_chinese(ob);
    if(value.length === 0) return false; //避免对空输入框的正则检测
    if(!tag || length < value.length){
        alert("请检查"+message+"输入格式！输入格式,要求长度小于"+length);
        return false;
    }
    return true;
}

function limit_length(ob, length=20,message=null) {
    var value = ob.value;
    tag = value.length < length
    if(value.length === 0) return false; //避免对空输入框的正则检测
    if(!tag){
        alert("请检查"+message+"输入格式！长度小于"+length);
        return false;
    }
    return true;
}

function limit_number_length(ob,min_length = 1 ,max_length = 20,message = null){//限定输入数字的长度范围
    var value = ob.value;
    if(value.length === 0) return false; //避免对空输入框的正则检测
    var reg = /^\d+$/g;
    var tag = reg.test(value) && min_length <= value.length && value.length <= max_length;
    if(!tag){
        if(max_length === min_length){
            alert("请检查"+message+"输入格式！长度"+max_length+"为的数字")
        }else{
            alert("请检查"+message+"输入格式！长度在"+min_length+"和"+max_length+"之间的数字");
        }
        return false;
    }
    return true;
}
/*
control the input format of email
 */
function limit_email(ob,message=null){
    var value = ob.value;
    if(value.length === 0) return false; //避免对空输入框的正则检测
    value = value.replace(/^\s*|\s*$/g,'');
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
    var tag = reg.test(value);
    if(!tag){
        alert("请检查"+message+"输入格式！请输入正确格式的E-mail链接");
        return false;
    }
    return true;
}
/*
    control the format of URL
    reg_http:使用对于含有HTTP标记的URL进行检测:https://www.baidu.com
    reg:对于没有HTTP标记的URL进行检测  ：www.baidu.com
 */
function limit_url(obj,message=null){
    var value = obj.value;
    if(value.length === 0) return true;//未填入内容时，避免正则检测
    var reg_http = /^(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9\u4e00-\u9fa5_+%$/=&#\-?]+){2,}$/g;
    var reg = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){2,}$/g;
    var tag = reg.test(value);
    var tag_http = reg_http.test(value);
    if(!tag && !tag_http){
        alert("请检查"+message+"输入格式！请输入正确格式的URL链接");
        return false;
    }
    return true;
}
// 在提交前对于所有填入项再次进行正则检测
function limit_check_tch_edit(){
    var t_1 = limit_letter_chinese(document.getElementById("教师姓名"),'教师姓名');
    var t_2 = limit_tel(document.getElementById("电话"),'电话')
    var t_3 = limit_letter_chinese_length(document.getElementById("民族"),20,'民族')
    var t_4 = limit_letter_chinese_length(document.getElementById("籍贯"),50,'籍贯')
    var t_5 = limit_letter_chinese_length(document.getElementById("学校名称"),20,'学校名称')
    var t_6 = limit_letter_chinese_length(document.getElementById("tch_ins"),20,'学院')
    var t_7 =limit_length(document.getElementById("tch_adr"),50,'地址')
    var t_8 = limit_number_length(document.getElementById("tch_pC"),6,6,'邮政编码')
    var t_9 = limit_email(document.getElementById("邮箱"),'邮箱')
    return t_1 && t_2 && t_3 && t_4 &&t_5 && t_6 &&t_6 &&t_7 &&t_8&&t_9;
}

function limit_check_student_add() {
    var Link_1 = document.getElementById("stu_name");
    if(Link_1 == null) Link_1 = document.getElementById("姓名")
    var t_1 = limit_letter_chinese(Link_1,'学生姓名');
    var Link_2 = document.getElementById("stu_id");
    if(Link_2 == null) Link_2 = document.getElementById("学号")
    var t_2 = limit_number_length(Link_2,0,18,'学生帐号');
    return t_2 && t_1;
}

function limit_check_news_editor() {

   //  var t_1 = limit_letter_chinese_length(document.getElementById('标题'),30,'新闻标题');
   // // var t_2 = limit_letter_chinese_length(document.getElementById("副标题"),30,'新闻副标题');
   //  return t_1;
    return true;
}

function limit_check_addThesis() {
    // var t_1 = limit_letter_chinese_length(document.getElementById("title"),50,'公告标题');
    var t_2 = limit_letter_chinese(document.getElementById("author"),'作者');
    var Link = document.getElementById("original");
    if(Link == null) Link = document.getElementById("origin");
    var t_3 = limit_url(Link,'链接');
    return  t_2 && t_3;
}

function limit_check_addThesis_editor(){
    // var t_1 = limit_length(document.getElementById("标题"),50,'标题');
    var t_2 = limit_letter_chinese(document.getElementById("作者"),'作者');
    var t_3 = limit_url(document.getElementById("原文链接"),'原文链接')
    return t_2 && t_3;
}

function limit_check_ann_editor(){
    // var t_1 = limit_letter_chinese_length(document.getElementById('标题'),30,'公告标题');
    var t_2 = limit_letter_chinese(document.getElementById('作者'),'撰稿人');
    var t_3 = limit_url(document.getElementById("来源"),'来源链接');
    return t_2 && t_3;
}

function limit_check_thesis_editor(){
 //   var t_1 = limit_letter_chinese_length(document.getElementById('标题'),30,'标题');
    var t_2 = limit_letter_chinese(document.getElementById('作者'),'撰稿人');
    var t_3 = limit_url(document.getElementById("original"),'原文链接');
    return  t_2 && t_3;
}

function limit_check_support_editor(){
    var t_1 = limit_length(document.getElementById("平台名称"),30,'平台名称');
    var t_2 = limit_url(document.getElementById("链接"),'链接');
    return t_1 && t_2;
}