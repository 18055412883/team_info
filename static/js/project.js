function  upload_file(it){
    var next = it.cloneNode(true);
    var loca = document.getElementById('end');
    var parent = it.parentNode;
    var node = it.nextSibling;
    parent.insertBefore(next,node);
    var rv = it.childNodes;
    var a = $(next).find(':input');  //jQuery
    // for(var i=0;i<a.length;i++){
    //     a[i].value = '';
    // // alert(a[i].value)
};
function set_id() {
    var num = document.getElementsByName('file_num');
    for(var i = 1;i<num.length;i++){
        var f = 'f';
        f+=i;
        num[i].id = f;
    }
};
function the_sub(btn){
// function the_sub(it,btn) {
    // if(btn!='f'&&!it){
    //     return false;
    // }
    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    var datas = new FormData(document.getElementById('thesis_edi'));
    var num = document.getElementsByName('file_num');
    for(var i=0;i<num.length-1;i++){
        var ff = 'f';
        ff+=i;
        var files = $('[name=file_num]')[i].files[0];
        datas.append(ff,files);
    }
    datas.append('f_num',i);
    datas.append('btn',btn);
    url = '/project/the_edit_sub/';
    $.ajax({
        url: url,
        type: "post",
        data: datas,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            if(res.status ==200){
                alert('提交成功');
                location.reload();
            }else{
                alert('提交失败');
                location.reload();
            }
                        },
        error: function (e) {
            alert("错误!!!");
            window.clearInterval(timer);
        }
    });
}
function dele_project(id) {
        var k = confirm("确认删除?");
        if (k) {
            var post_id = {"id": id,};

            $.ajax({
                type: "POST",
                url: "/project/delete_project/",
                data: post_id,
                success: function (res) {
                    if(res.data == 'success'){
                        alert("删除成功");
                        location.reload();
                    }
                    else{
                        alert("删除失败");
                        location.reload();
                    }
                },
                error:function () {
                    alert("异常");
                    location.reload();
                }
            })
        }
}
function dele_thesis(id) {
        var k = confirm("确认删除?");
        if (k) {
            var post_id = {"id": id,};
            $.ajax({
                type: "POST",
                url: "/project/delete_thesis/",
                data: post_id,
                success:function () {
                    location.reload();
                    alert("删除成功");
                },
                error:function () {
                    location.reload();
                    alert("删除失败");
                }
            })
        }
}

function thesisChange(it,id){
    if(!it){
        return false;
    }
    else{
        var form = new FormData(document.getElementById("news_form"));
             form.append("id",id);
             $.ajax({
                 url:"/project/thesisChange/",
                 type:"post",
                 data:form,
                 processData:false,
                 contentType:false,
                 success:function(data){
                     alert("已成功修改论文且待审核");
                     window.location.href = "/project/thesis_review/";
                 },
                 error:function(e){
                     alert("错误！！");
                     location.reload();
                 }
             });
        return true;
    }
}

window.onload = function(){
    var key=$("#paperType_value").val();
    $("#type option[value='"+key+"']").attr("selected","selected")
}
function sub(it,btn,id=0){
    if(btn!='f'&&!it){
        return false;
    }
    if(btn=='up'|| btn == 'realse'){
        url = "/project/the_edit_sub/" + id +"/";
        if(btn == 'realse'){
             var k =confirm('确认发布?');
             if (k){
             }else{
                 location.reload();
             }
        }
    }
    else{
        url = "/project/the_edit_sub/";
    }
     $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    datas = $("form").serialize();
    var str = "&btn=" + btn;
    datas+=str;
    $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data:datas,
                success: function (res) {
                    switch (res.status) {
               case 200:{
                   alert('提交成功且待审核');
                   location.reload();
                   break;
               }case 201:{
                   alert('保存成功');
                   location.reload();
                   break;
               }case 202:{
                   alert('更新成功且待审核');
                   location.reload();
                   break;
               }case 203:{
                   alert('发布成功');
                   location.reload();
                   break;
               }case 500:{
                   alert('错误');
                   location.reload();
                   break;
               }case 403:{
                   alert('403:forbiden!!');
                   location.reload();
                   break;
               }default:{

               }
           }
            },
                error : function() {
                    alert("提交异常！");
                }
            })
};

function sub_pro(btn,id=0){             //添加科研成果
    //t:提交  f：草稿箱    up:修改
    var tch_name = document.getElementById('tch_type');
    var extend_args = '&btn='+btn;
    var url = '/project/pro_edit/';
    switch (btn) {
        case  't':{
            //alert(tch.value)
            if(tch_name.value=='pass'){
                alert('老师不能为空');
                return false;
            }
            if(!checkType()){
            return false;
            }
            if(document.getElementById('正文内容').value.length <= 0) {
                alert('正文不能为空');
                return false;
            }
            break;
        }case 'f':{
            if(tch_name.value=='pass'){
               alert('老师不能为空');
               return false;
            }
            break;
        }case 'up' :{
            if(tch_name.value=='pass'){
                alert('老师不能为空');
                return false;
            }
            if(document.getElementById('正文内容').value.length <= 0) {
                alert('正文不能为空');
                return false;
            }
            if(!checkType()){
                return false;
            }
            extend_args += '&id=' + id;
            break;
        }case 'release':{
             var k =confirm('确认发布?');
             if (k){
                 url = '/project/release_project/' + id + '/'
             }
             break;
        }
    }

    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    var datas = $("form").serialize();
    datas += extend_args;
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data:datas,
        success: function (res) {
           switch (res.status) {
               case 200:{
                   alert('提交成功且待审核');
                   location.reload();
                   break;
               }case 201:{
                   alert('保存成功');
                   location.reload();
                   break;
               }case 202:{
                   alert('更新成功且待审核');
                   location.reload();
                   break;
               }case 203:{
                   alert('发布成功');
                   location.reload();
                   break;
               }case 500:{
                   alert('错误');
                   location.reload();
                   break;
               }case 403:{
                   alert('403:forbiden!!');
                   location.reload();
                   break;
               }default:{

               }

           }
            },
        error : function() {
                    alert("提交异常！");
                }
            });
        return true;
};

function checkType(){
    var t = document.getElementById('type');
    if(!t){
        return true;
    }
    var index = t.selectedIndex;
    var data = t.options[index].value;
    if(data.length != 1) {
        alert('项目类型不能为空');
        return false;
    }
    return true;
};

function removeProject(){
    //去掉与教师用户不相关的数据

}