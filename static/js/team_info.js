function sub_info(it,btn,status='',id=0){  //status=stu 表示学生，默认为教师
    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    if(btn!='f'&&!it){
        return false;
    }
    if(status==''){
        var datas = new FormData(document.getElementById('tch_info'));
        if(btn=='up'){
            datas.append('sid',id);
        }
        if(btn=='info_change'){
            //alert(id);
            datas.append('sid',id);
        }
        url = "/teacher_manage/teacher_add/";
        var pic = $('[name=tch_pic]')[0].files[0];
        datas.append('tch_pic',pic);
        // alert(pic.value)
        var url = '/teacher_manage/teacher_add/';
    }else{
        var datas = new FormData(document.getElementById('stu_info'));
        if(btn=='up'){
            datas.append('sid',id)
        }
        url = "/teacher_manage/student_add/";
        var pic = $('[name=stu_pic]')[0].files[0];
        datas.append('stu_pic',pic);
        // alert(pic.value)
        var url = '/teacher_manage/student_add/';
    }
    datas.append('btn',btn);
    $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data:datas,
                processData: false,  //
                contentType: false,
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
function  ProcessFile(e) {
   var file = document.getElementById('照片').files[0];
   var pic = document.getElementById('result');
   if(pic.innerHTML=""){
       pic.removeChild('img');
   };
   if (file){
       var reader = new FileReader();
       reader.onload = function (event) {
           var txt = event.target.result;
           var img = document.createElement("img");
           img.src = txt;
           //img.style="";
           img.height=150;
           img.width=90;
       document.getElementById("result").appendChild(img);
       };
   }
   reader.readAsDataURL(file);
}
function del_team_info(person,id) { //人员类型，人员id
    var k = confirm("确认删除?");
    if (k) {
        var post_data = {"id": id,"person":person};
        $.ajax({
            type: "POST",
            url: "/teacher_manage/del_person/",
            data: post_data,
            success: function (res) {
                if(res.status ==200){
                    alert("删除成功");
                    location.reload();
                }else if(res.status == 500){
                    alert("删除失败");
                    location.reload();
                }else{
                    alert('访问错误');
                    location.reload();
                }
            },
            error:function () {
                location.reload();
                alert("异常");
            }
        })
    }
}
