function sub1( it ){ 
    //新闻提交
    if(!it){
       return true;
    }
    else{
    form = $("form").serialize();
    var extend_args = "&btn=" + "btn1";
    form += extend_args;
        //var form = new FormData(document.getElementById("news_form"));
        //form.append("btn", "btn1");
            $.ajax({
                url: "/news/successful/",
                type: "post",
                data: form,
                dataType: 'json',
//                processData: false,
//                contentType: false,
                success: function (data) {
                    alert("提交成功");
                    location.reload();
                },
                error: function (e) {
                    alert("错误!!!");
                    location.reload();
                }
            });
            return true;
    }
}
function sub2(){
    //保存为草稿
    var date = checkTitle();
    if(!date){
        alert("标题不能未空");
    }
    else{
        var form = new FormData(document.getElementById("news_form"));
             form.append("btn","btn2");
             $.ajax({
                 url:"/news/successful/",
                 type:"post",
                 data:form,
                 processData:false,
                 contentType:false,
                 success:function(data){
                     alert("已保存至草稿箱");
                     location.reload();
                 },
                 error:function(e){
                     alert("错误！！");
                     location.reload();
                 }
             });
    }
}





function newChange(it,id){
    if(!it){
        return false;
    }
    else{
        var form = new FormData(document.getElementById("news_form"));
             form.append("id",id);
             $.ajax({
                 url:"/news/newChange/",
                 type:"post",
                 data:form,
                 processData:false,
                 contentType:false,
                 success:function(data){
                     alert("已成功修改新闻且待审核");
                     window.location.href = "/news/review/";
                 },
                 error:function(e){
                     alert("错误！！");
                     location.reload();
                 }
             });
        return true;
    }
}

function checkTitle(){
    var date = document.getElementById('标题');
    if(date.value==""){
        return false;
    }
    else 
        return true;
};

function re_new(id) {
    var k = confirm("确认发布?");
    if(k){
    var post_id = {"id":id};
    $.ajax({
         type:"POST",
         url:"/news/rele_news/",
         data:post_id,
         success:function(res){
               alert("发布成功");
               location.reload();

         },
         error:function(){
               location.reload();
               alert("发布失败");
         }
    })
    }
}

function dele_new(id) {
    var k = confirm("确认删除?");

    if (k) {
        var post_id = {"id": id,};

        $.ajax({
            type: "POST",
            url: "/news/delete_news/",
            data: post_id,
            success: function () {
                alert("删除成功");
                location.reload();

            },
            error:function () {
                alert("删除失败");
                location.reload();
            }
        })

    }
}

 //页面加载时开始执行
    //alert("ready");
    //默认副标题的值
    $('#副标题').focus (function(){//获得焦点时默认值消失
        if($(this).val()==this.defaultValue){
            $(this).val("");
        }
    });
    $('#副标题').blur (function(){//失去焦点时如果为空则变为默认值
        if($(this).val()==""){
            $(this).val(this.defaultValue);
        }
    });
    //选中select标签的值
    var key=$("#type_value").val();
    $("#type option[value='"+key+"']").attr("selected","selected")



//当新闻的downTitle为无的时候隐藏副标题
var downTitle = document.getElementById('downTitle');
var content = downTitle.innerHTML;
//alert(content);
if(content =="——无"){
    $('#downTitle').hide();
}


