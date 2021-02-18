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

function dele_announce(id){
        var k = confirm("确认删除?");

      if(k) {
          var post_id = {"id": id,};

          $.ajax({
              type: "POST",
              url: "/announce/delete_announce_draft/",
              data: post_id,
              success: function () {
                  alert("删除成功");
                  location.reload();
              }
          })
      }
}

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