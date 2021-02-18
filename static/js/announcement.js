function sub_announce_editor(btn,id) {
    // btn : 1 提交
    // btn : 0 草稿箱
    if (btn == 1 || btn == 2){
        if (!checkInput() || !checkTextarea()){
            return false
        }
    }else if ( btn == 0){
        //TODO if ( checkDrfat()) 检查标题是否为空

    }

    var url="/announce/announcement_add/"
    var extend_args = "&btn=" +btn
    if(btn == 2){
        url="/announce/announcement_change_operate/"
        extend_args += "&id=" + id
    }
    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    datas = $("form").serialize();
    datas += extend_args;
    $.ajax({
        type: "POST",
        url:url,
        dataType: 'json',
        data: datas,
        success: function (res) {
            if (res.status == 200) {
                alert('提交成功');
                location.reload();
            } else {
                alert('提交失败')
                location.reload();
            }
        },
        error: function () {
            alert("提交异常！");
        }
    });
}

function dele(id) {
    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    var k = confirm("确认删除?");
    if (k) {
        var post_id = {"id": id,};
        $.ajax({
            type: "POST",
            url: "/announce/announcement_delete/",
            data: post_id,
            success: function (res) {
                if (res.status == 200) {
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
            url: "/announce/release_announce/",
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

