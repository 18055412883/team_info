var seconds = 0;
function count_seconds(){
    seconds +=1
}
$(function () {
    setInterval(count_seconds,1000);
});
window.onbeforeunload = function () {
    url = window.location.pathname
    id = url.split('/')[3];
    type = url.split('/')[1];
    clearInterval();
    $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
    $.ajax({
            type: 'POST',
            url:'/news_thesis_long/',
            data: {'seconds':seconds,'id':id,'type':type},
            success:function (res) {},
            error:function () {},
        })
};