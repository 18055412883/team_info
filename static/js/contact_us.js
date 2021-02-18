function checkmainbody(it,btn,id=0) {  //正文内容
    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    datas = $("form").serialize();
    if (!it) {
        return false;
    }
    // var form = new FormData(document.getElementById("contact_us"));
    if (btn === 'up') {
        var up_id = "&id=" + id ;
        datas+=up_id;
    }
    var choose = "&btn=" + btn;
    datas+=choose;
    $.ajax({
        type: "POST",
        url: '/contact_us/contact_us_edit/',
        dataType: 'json',
        data: datas,
        success: function (res) {
            if (res.status == 200) {
                alert("提交成功");
                location.reload();
            } else if (res.status == 201) {
                alert('保存成功');
                location.reload();
            } else if (res.status == 202) {
                alert('更新成功');
                location.reload();
            } else {
                alert('提交失败');
            }
        },
        error: function () {
            alert("错误!!!");
            window.clearInterval(timer);
        }
    });
};

function dele(id) {
    var k = confirm("确认删除?");
    if (k) {
        var post_id = {"id": id,};
        $.ajax({
            type: "POST",
            url: "/contact_us/contact_us_delete/",
            data: post_id,
            success: function (res) {
                if (res.status === 200) {
                    alert("删除成功");
                    location.reload();
                } else {
                    alert("删除失败");
                    location.reload();
                }
            },
            error: function (e) {
                alert("系统错误")
            }
        })
    }
}

function release(id) {
    var k = confirm("确认发布吗?");
    if (k) {
        var post_id = {"id": id,};
        $.ajax({
            type: "POST",
            url: "/contact_us/release_contact_us/",
            data: post_id,
            success: function (res) {
                if (res.status == 200) {
                    alert("发布成功");
                    location.reload();
                } else {
                    alert("发布失败");
                    location.reload();
                }
            },
            error: function (e) {
                alert("后台函数错误")
                location.reload();
            }
        })
    }
}


function dele_team_style(id) {
    var params = {"id": id,};
    var k = confirm("确认删除?");
    if (k) {
        $.ajax({
            type: "POST",
            url: "/contact_us/team_style_delete/",
            data: params,
                success: function (data) {
                if(data.result==0){
                    alert('未找到删除对象');
                }
                else if(data.result==100){
                    alert("删除成功");
                }
                location.reload();
            },
            error:function(){
                elert('error');
            }
        })
        }
}
function sub_team_style(it,btn,id=0){
    if(!it){
        return false;
    }
    var form = new FormData(document.getElementById("team_style_form"));
    if(btn == 'up'){
        form.append('id',id);
    }
    url = "/contact_us/team_style_add/";
    form.append('btn',btn);
        $.ajax({
            url: url,
            type: "post",
            data: form,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                if(res.status == 200){
                    //100为后台返回成功的数据
                    alert("提交成功");
                    location.reload();
                }else if(res.status == 202){
                    alert("更新成功");
                    location.reload();
                } else if(res.status==500){
                    //传过去的数据不全
                    alert("提交失败");
                    location.reload();
                }else if(res.status == 403){
                    alert("请求错误")
                    location.reload();
                }
            },
            error:function(){
                alert('error!!');
            }
        });
            return true;
}

