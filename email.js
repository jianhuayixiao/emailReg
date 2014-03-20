/**
 * Created with JetBrains WebStorm.
 * User: jiayuan
 * Date: 2014-3-11
 * Time: 下午2:20
 * To change this template use File | Settings | File Templates.
 */

$(function(){
	
	
	//邮箱验证
	$("#email").focus(function(){
		$(this).parent().addClass("cur").removeClass("err");
		$(this).next().hide();
		$("#emailTip").removeClass("errorTip").show().children("p").html("用来登录网站");
	}).blur(function(){
		emailAdd( $(this) );
	}).keyup(function(e){
		if (e.which === 38 || e.which === 40 || e.which === 13){ return; }
    	var html = '',val = $(this).val(), com = '.com', cn = '.cn', emailData = {
    		item: [
    			'sina' + com,'163' + com,'qq' + com,'126' + com,'vip.sina' + com,'sina' + cn,'hotmail' + com,
    			'gmail' + com,'sohu' + com,'139' + com,'wo' + com + cn,'189' + cn,'21cn' + com
    		]
    	};
    	var ft = val.slice(val.indexOf("@") + 1);
    	with(emailData){
	    	for( i in item ){
	    		if(item[i].search(ft) !== -1){
	    			html += '<li><a href="">';
		    		html += val.slice(0,val.indexOf("@"));
		    		html += '@';
		    		html += item[i];
		    		html += '</a></li>';				
	    		}
	    	}
    	}
    	$(".domain ul").html(html);
    	if(val.search("@") !== -1){
	   		$(".domain").show();	
	    }
	    if($(".domain ul li").length === 0){
	    	$(".domain").hide();
	    }
    	/*
    	if( e.shiftKey && e.which === 50 ){
    		$("#emailAdd-o").show();
    	}
    	*/
    	
	}).keydown(function(e){
		if($(".domain").is(":visible")){
			if(e.which === 38){ //上
				var obj = $(".domain ul li"), l = obj.size(), index = l - 1;
				for(var i = 0; i < l; i++){
					if(obj.eq(i).hasClass("hov")){
						obj.eq(i % l).removeClass("hov");
						index = i - 1;
					}
				}
				var val = obj.eq(index).find("a").text();
				$("#email").val(val);
				index = (index < 0) ? (l - 1) : (index % l);
				$(".domain ul li").eq(index).addClass("hov");
			}
			if(e.which === 40){ //下
				var obj = $(".domain ul li"), l = obj.size(), index = 0;
				for(var i = 0; i < l; i++){
					if(obj.eq(i).hasClass("hov")){
						obj.eq(i % l).removeClass("hov");
						index = i + 1;
					}
				}
				var val = obj.eq(index).find("a").text();
				$("#email").val(val);
				index = index > (l - 1) ? 0 : (index % l);
				$(".domain ul li").eq(index).addClass("hov");		
			}
			if(e.which === 13){
				$(".domain").hide();
				emailAdd( $(this) );		
			}
		}
	});
    $(".domain ul li a").live("click", function(){
    	var val = $(this).text();
    	$("#email").val(val);
    	$(".domain,#emailTip").hide();
    	$(this).parents(".i-w").removeClass("err");
    	$("#email").next().removeClass("error");
    	return false;
    });
	
	
});

//邮箱验证
function emailAdd( obj ){
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    	val = obj.val();
    if(reg.test(val)){
        obj.parent().removeClass("err cur");
        obj.next().removeClass("error").show();
        $("#emailTip").removeClass("errorTip").children("p").text("提示：将会给你发送确认邮件").end().show();
    }else{
    	if(val === ''){
    		$("#emailTip").addClass("errorTip").children("p").text("提示：邮箱地址必填");	
    	}else{
    		$("#emailTip").addClass("errorTip").children("p").text("提示：格式不正确");
    	}
        obj.parent().addClass("err");
        obj.next().addClass("error").show();
    }
}





