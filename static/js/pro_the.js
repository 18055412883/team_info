 //三个监听器开关
    var step1 = false;
    var step2 = false;
    var step3 = false;
    function select_tch() {
        step1 = judge_value(this.value);
        select_listener_switch();

    };
    function select_item() {
        step2 = judge_value(this.value);
        select_listener_switch();

    };
    $(function(){  //当教师登录的时候 这个id的标签名为 input 此时触发第三个开关
        var tag_name = document.getElementById('tch_type');
        if(tag_name.tagName === 'INPUT') {
            step3 = true;
            select_listener_switch();
        }
    })
    function judge_value(key) {
        if(key == '=选择项目类型=' || key == '=选择教师='){
            return false
        }else{
           return true;
        }
    }
    //监听器开关
    function select_listener_switch() {
        if (step2 && (step1 || step3)) {
            select_listener();
        }
    }
    //监听器
    function select_listener() {
        var select_tch_item = $('#type');
        var tch = $('#tch_type');
        select_trigger(tch,select_tch_item)
    }
    var request_url;
    var redict_url;
    function set_url() {
        var path = window.location.pathname;
        var url = path.split('/');
        request_url = '/' + url[1] + '/check_tch_item/';
        if(url[1]=='project'){
           redict_url = '/' + url[1] + '/pro_change/';
        }else{
            redict_url = '/' + url[1] + '/thesis_change_detail/';
        }
    }
    //触发事件
    function select_trigger(tch,select_tch_item) {
        $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
            var data = {'select_item' : select_tch_item.val(),'tch':tch.val()};
            set_url();
            $.ajax({
                url: request_url,
                type: "post",
                data: data,
                dataType: 'json',
                success: function (res) {
                    if(res.status ==200){
                        alert('当前已有' + select_tch_item.find("option:selected").text() + '请直接编辑')
                        location.href = redict_url + res.id;
                    }
                },
                error: function () {}
                });
    }