var url_map = {}; //侧边栏
//
url_map['teaching'] = 0;
url_map['student_team'] = 1;
url_map['support'] = 2;
//
url_map['news2'] = 0;
url_map['news_show'] = 0;
url_map['announcement'] =1;
//
url_map['thesis1'] = 0;
url_map['award'] = 1;
url_map['teach_pro'] = 2;
//
url_map['project1'] = 0;
url_map['research_thesis'] = 1;
url_map['research_award'] = 2;
url_map['research_patent'] = 3;
//
url_map['recruit_stu'] = 0;
url_map['recruit1'] = 1;
url_map['company_recruit'] = 2;
//
url_map['contact_us1'] = 0;
url_map['team_list'] = 1
var path = window.location.pathname;
url = path.split('/');
if(url[2]=='news_show'){
    url[2]='news2';
}
var app_url = '';
switch (url[1]) {
    case 'support':{
        app_url = 'teacher_manage';
        break;
    }case 'announce':{
        app_url = 'news';
        break;
    }default:{
        app_url = url[1];
        break;
    }
}

$(function() {
    //document.getElementById('tag').className="current";
    var windowWidth = $(window).width();
    if (windowWidth > 768) {
        //导航栏
        if (path == '\/' || path == 'index') {
            $("#index").className = "active";
        } else {
            document.getElementById(app_url).className = "active";       //导航栏
            document.getElementById(url[2]).className = "list-group-item active";   //侧边栏
        }
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


