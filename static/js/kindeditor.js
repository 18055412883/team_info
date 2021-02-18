$('#标题').click(function(){
    var today=new Date();   //设置时间
    var submitTime=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds(); 
    $("#发布时间").attr('value',submitTime);
});
KindEditor.ready(function(K){
    var editor;
    var id = document.getElementById('正文内容')
    editor = K.create(id,{
        width : '100%',
        height : '500px',
        cssPath : '/static/editor/kindeditor/plugins/code/prettify.css',
        uploadJson : '../../upload/kindeditor',
        afterBlur: function(){ this.sync();}, //当失去焦点时执行this.sync();这个函数就是实现同步kindeditor的值到textarea中
        afterCreate : function() {
            var self = this;
            K.ctrl(document, 13, function() {
                self.sync();
                document.forms['example'].submit();
            });
            K.ctrl(self.edit.doc, 13, function() {
                self.sync();
                document.forms['example'].submit();
            });
        }
    });
    prettyPrint();
});

function is_link(sn){
    if(sn=='0'){
        $("#linkUrl").val("http:\//");
        $("#正文内容").show();
        document.getElementById("linkUrl").disabled="disabled";
    }else{
        $("#正文内容").hide();
        document.getElementById("linkUrl").disabled="";
    }
}

$('#type').onclick(function () {
        var value = "{{ new.newsType }}";
        //alert(value);
        var ops = this.options;
        for(var i=0;i<ops.length; i++){
        var tempValue = ops[i].value;
        if(tempValue == value)
        {
        ops[i].selected = true;
        }
        }
});

