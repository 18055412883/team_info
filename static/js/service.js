function change(it) {
    it.src = it.src + '?';
}
$('#lo_btn').click(function() {
            //预先发送csrf值，防止出现403错误
            $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
            $.ajax({
                type: "POST",
                url: "/service/operate_login/",
                dataType: 'json',
                data:$("form").serialize(),
                success: function (res) {
                    switch (res.status) {
                        case 200:{
                            alert("欢迎！");
                            location.href='/teacher_manage/teacher_account/';
                            break;
                        }case 201:{
                           alert("欢迎！");
                            location.href='/service/Tmodify_pwd/';
                            break;
                        }
                        case 203:{
                            var err_tips = document.getElementById('err_tips')
                            err_tips.style.display="block";
                            vali_code = document.getElementById('validate_code')
                            change(vali_code);
                            setTimeout(function(){err_tips.style.display="none";},3000);
                            break;
                        }case 100:{
                            alert("密码错误，请重新输入");
                            location.reload();
                            break;
                        }
                        case 103:{
                            alert("验证码错误，请重新输入");
                            vali_code = document.getElementById('validate_code');
                            change(vali_code);
                            change(document.getElementsByTagName('img'));
                            break;
                        }case 500:{
                            alert('数据异常，请重试');
                            location.reload();
                            break;
                        }default: {
                            alert("请求错误");
                            location.reload();
                            break;
                        }
                    }
                },
                error : function() {
                    alert("异常！");
                }
            })
        });

$('#re_btn').click(function() {
            //预先发送csrf值，防止出现403错误
            $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
            $.ajax({
                type: "POST",
                url: "/service/operate_register/",
                dataType: 'json',
                data:$("form").serialize(),
                success: function (res) {
                    switch (res.status) {
                        case 200:{
                            alert("注册成功！");
                            location.href='/service/login';
                            break;
                        }
                        case 100:{
                            var err_tips = document.getElementById('err_tips')
                            err_tips.style.display="block";
                            setTimeout(function(){err_tips.style.display="none";},3000);
                            break;
                        }
                        case 203:{
                            var err_tips = document.getElementById('err_account_tips');
                            err_tips.style.display="block";
                            setTimeout(function(){err_tips.style.display="none";},3000);
                            break;
                        }
                        case 103:{
                            alert("验证码错误，请重新输入");
                            vali_code = document.getElementById('validate_code');
                            change(vali_code);
                            change(document.getElementsByTagName('img'));
                            break;
                        }case 500:{
                            alert('数据异常，请重试');
                            location.reload();
                            break;
                        }
                        default: {
                            alert("请求错误");   //403 forbiden
                            location.reload();
                            break;
                        }
                    }
                },
                error : function() {
                    alert("异常！");
                }

            })
        });
