
function sub_search_form(){
    //1：新闻  2：公告  3：论文
      var obj = document.getElementById('option');
//    var index = obj.selectedIndex;
//    var value = obj.options[index].value;
      var form = document.getElementById('search_form');
      var value = obj.value;
      //alert(value)
        switch (value){
            case '0': form.action = '/search/';
                break;
            case '1': form.action = '/search/news/';
                break;
            case '2': form.action = '/search/announcement/';
                break;
            case '3': form.action = '/search/thesis_information/';
                break;
            default:break;
        }
}

function pagination(currentpage,totalpage){
    //页码过多时中间加入省略号
    var dots = "<li><a href='javascript:void(0);'>...</a></li>";  //省略号
    if(totalpage<=10)
        return;
    else{
        if(currentpage<=4){//页码：1~4
            for(var i=currentpage+3;i<totalpage-2;i++){
                $(".paginator li").eq(i).hide();
            }
            $(".paginator li").eq(currentpage+2).after(dots);
            return;
        }
        else if(currentpage>totalpage-4){//页码：后4页
            for(var i=currentpage-3;i>3;i--){
                $(".paginator li").eq(i).hide();
            }
            $(".paginator li").eq(currentpage-2).before(dots);
            return;
        }
        else{//中间页码 
            for(var i=2;i<currentpage-2;i++)
                $(".paginator li").eq(i).hide();
            for(var i=totalpage-1;i>currentpage+2;i--)
                $(".paginator li").eq(i).hide();
            $(".paginator li").eq(currentpage+2).after(dots);
            $(".paginator li").eq(currentpage-2).before(dots);
            return;
            
        }
    }
    // $(".paginator li").eq(3).after("<li><a href='javascript:void(0);'>...</a></li>")
}