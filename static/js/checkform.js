function checkForm(info='') {
    if(!checkInput(info)){
         return false;
     }
    if(!checkTextarea()){
        return false;
    }
    if(!checkType()){
        return false;
    }
    return true;
};
function checkDrfat() {
    var status = checkType();
    return status;
}
function checkInput(info='') {
    var content0 = document.getElementsByTagName('input');
    // checkType();
    // alert(content0[1].id)
    if(info==='info') {
        for (var i = 1; i < content0.length; i++) {
            if (content0[i].value.length <= 0) {
                if(content0[i].id==='编码'||content0[i].id ==='原文链接'){
                    continue;
                }
                alert(content0[i].id + '不能为空');
                return false;
            }
        }
    } else {
                for (var i = 0; i < content0.length; i++) {
                    if (content0[i].value.length <= 0 ) {
                        if(content0[i].id==='编码'||content0[i].id ==='原文链接'){
                     continue;
                }
                        alert(content0[i].id + '不能为空');
                        return false;
                    }
                }
            }
    return true;
};
function checkTextarea() {
    var content1 = document.getElementsByTagName('textarea');
    for (var i = 0; i < content1.length; i++) {
        if (content1[i].value.length <= 0&&content1[i].id) {
            alert(content1[i].id + '不能为空');
            return false;
        }
    }
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
        alert('类型不能为空');
        return false;
    }
    return true;
};
function show_my_affairs(url) {
        $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
        $.ajax({
            type: "POST",
            url: url,
            data: '',
            success: function (html) {
                var place = document.querySelector('.col-md-9');
                while(place.hasChildNodes()) //删除子节点
                {
                    place.removeChild(place.firstChild);
                }
                place.innerHTML = html;
            },
        })
    }
//界面加载时自动执行
// $(function () {
//     $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
//     function polling() {
//         $.ajax({
//             type: 'POST',
//             url:'/service/polling/',
//             data: '',
//             // timeout: 10000,
//             success:function (res) {
//                 switch (res.status) {
//                     case 200:
//                         break;
//                     case 404:
//                         location.href = '/logged_out/';
//                         break;
//                     case 403:
//                         location.href = '/logged_out/';
//                         break;
//                 }
//             },
//             error:function () {},
//         })
//     }
//     setInterval(polling,3000);
// });
