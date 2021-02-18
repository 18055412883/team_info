function sub_thesis_form(btn,id){
    //0:提交  1：草稿箱  2：修改
    var name = document.getElementById('tch_type').value;
    // var name1 = document.getElementById('tea_tch_type').value;
    if(btn == 0 || btn ==2){
        if(!checkForm()){
           return false;
        }if(name=="pass"){
                alert('老师姓名不能空');
                return false;
            }
    }else{
        // 检查老师姓名是否空
        //alert('草稿箱');
        if(name.value=='pass'){
            alert('老师姓名不能空');
            return false;
        }
    }
    var url = '/thesis/addThesis/';
    var extend_args = '&btn='+btn;  //加的 btn值 和 (id值)
    if(btn == 2){
        url = '/thesis/thesis_change/';
        extend_args += '&id=' + id;  
    }    

    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    datas = $("form").serialize();
    datas += extend_args;

    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data:datas,
        success: function (res) {
            if(res.status == 200){
                        alert('提交成功且待审核');
                        location.reload();
             }
            },
        error : function() {
                    alert("提交异常！");
                }
            });
        return true;
};


function dele(id) {
    var k = confirm("确认删除?");
    if (k) {
        var post_id = {"id": id,};
        $.ajax({
            type: "POST",
            url: "/thesis/thesis_delete/",
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
            url: "/thesis/release_thesis/",
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

var key=$("#type_value").val();
$("#type option[value='"+key+"']").attr("selected","selected")