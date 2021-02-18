function dele_support(id) {
    var params = {"id": id,};
    var k = confirm("确认删除?");
    if (k) {
        $.ajax({
            type: "POST",
            url: "/support/delete_support/",
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
function sub_support(it,btn,id=0){
    if(!it){
        return false;
    }
    var form = new FormData(document.getElementById("support_form"));
    if(btn == 'up'){
        form.append('id',id);
    }
    url = "/support/support_add/";
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