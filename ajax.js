/*
*url        地址
*method     请求方式
*datatype   返回的数据类型  string/json/xml
*data       请求的时候传的数据
*succ       成功后的回调函数
*fail       失败后的回调函数

*/
function ajax(json){

    var settings={
        url:'',
        method:'get',
        data:{},
        dataType:'json',
        succ:function(){},
        fail:function(){}
    };
    //用用户传的参数覆盖默认参数
    for (var attr in json){
        settings[attr]=json[attr];
    }
    var arr=[];
    for (var attr in settings.data){
        arr.push(attr+'='+settings.data[attr]);
    }
    settings.data=arr.join('&');
    //声明一个ajax对象
    var ajax=window.XMLHttpRequest?XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
    //设置请求方式
    if(settings.method.toLocaleLowerCase()='get'){
        ajax.open(settings.method,settings.url+'?'+settings.data+'&'+new Data().getTime(),true);
        ajax.send();
    } else{
        ajax.open(settings.method,settings.url,true);
        ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        ajax.send(settings.data);
    }
//设置完成事件的兼容性
    if(typeof ajax.onload=='undefined'){
        ajax.onreadystatechange==ready;

    }else{
        ajax.onload=ready;
    }
    function ready(){
        if(ajax.readyState=4){
            if(ajax.status==200){
                switch(settings.dataType.toLocaleLowerCase()){
                    case'string':
                    settings.succ(ajax.responseText);
                    break;
                    case 'json':
                        settings.succ(JSON.parse(ajax.responseText));
                        break;
                    case 'xml':
                        settings.succ(ajax.responesXML)
                }

            }else{
                settings.fail(ajax.status);
            }
        }
    }
}