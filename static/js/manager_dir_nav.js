var url_map = {}; //侧边栏
//
url_map['teacher_account'] = 0;
url_map['manager_account'] = 1;
url_map['Tmodify_pwd'] = 2;
url_map['resetPwd'] = 3;
//
url_map['tch_edit'] = 0;
url_map['tch_list'] =1;
url_map['stu_edit'] =2;
url_map['stu_list'] =3;
//
url_map['thesis'] = 0;
url_map['award'] = 1;
url_map['teach_pro'] = 2;
//
url_map['project'] = 0;
url_map['research_thesis'] = 1;
url_map['research_award'] = 2;
url_map['research_patent'] = 3;
//
url_map['recruit_stu'] = 0;
url_map['recruit'] = 1;
url_map['company_recruit'] = 2;

var path = window.location.pathname;
url = path.split('/');
var app_url = '';
switch (url[2]) {
    case 'teacher_info':
    case 'teacher_account':
    case 'manager_account':
    case 'Tmodify_pwd':
    case 'resetPwd':{
        app_url = 'tch0';
        break;
    }case 'tch_edit':
     case 'tch_list':
     case 'stu_edit':
     case 'stu_list':{
         app_url = 'tch1';
         break;
     }case 'db_restore':
    case 'db_backup':{
        app_url = 'operate_log';
        break;
    }case 'pro_change':{
        app_url = 'project';
        url[2] = 'project_list';
        break;
    }case 'thesis_change_detail':{
        app_url = 'thesis';
        url[2] = 'Thesis_manage_list';
        break;
    }

    default:{
        switch (url[1]) {
            case 'announce':
            case 'support' :{
                app_url = 'news';
                break;
            }default:{
                app_url = url[1];
                break;
            }
        }
    }
}
$(function() {
    //document.getElementById('tag').className="current";
     var windowWidth = $(window).width();
     if(windowWidth>768){
        document.getElementById(app_url).className="active";     //导航栏
        document.getElementById(url[2]).className="list-group-item active";  //侧边栏
        }
});
//手机 导航栏
$('#nav_btn').click(function () {
    var windowWidth = $(window).width();
    if(windowWidth<=768){
        switch (url[2]) {
            default:{
                document.getElementById(app_url).className = "active";
                break;
            }
        }
    }
});
//手机 菜单
$('#dir_btn').click(function () {
    var windowWidth = $(window).width();
    if(windowWidth<=768){
        switch (url[2]) {
            default:{
                $("#dir_span li")[url_map[url[2]]].className = "active";
                break;
            }
        }
    }
});
