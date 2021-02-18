function sub_recurit(it,btn,id=0){
    if(btn!='f'&&!it){
        return false;
    }
    if(btn=='up'){
        url = "/recruit/recruit_edit/" + id +"/";
    }
    else{
        url = "/recruit/recruit_edit/";
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
                    if(res.status==200){
                        alert('提交成功');
                        location.reload();
                    }else{
                        alert('提交失败')
                        location.reload();
                    }
                },
                error : function() {
                    alert("提交异常！");
                }
            })
};

function dele_recurit(id){
        var k = confirm("确认删除?");
        if(k){
        var post_id = {"id":id,};
        $.ajax({
            type:"POST",
            url:"/recruit/delete_recruit/",
            data:post_id,
            success:function(){
                location.reload();
            }
        })
        alert("删除成功");
         location.reload();
      }
}

function recruit_release(id){
    var url = "/recruit/release_recruit/";
    url += id+'/';
    $.ajax({
            type:'post',
            url:url,
            success:function(res){
                alert("发布成功");
                location.reload();
            },
            error:function(){
                alert('发布异常');
                location.reload();
            }
    })
}