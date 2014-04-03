

function setTab(name,m,n){ 
	for( var i=1;i<=n;i++){ 
		var menu = document.getElementById(name+i); 
		//某个
		var showDiv = document.getElementById("cont_"+name+"_"+i); 
		//对应的content
		menu.className = i==m ?"on":""; //当前的i和m传进来的m相等，那么m那个的classname=on;同时他的content的dislay显示
		showDiv.style.display = i==m?"block":"none"; 
	}
}


//编辑按钮显示编辑专辑页面
function left1AlbumClick(){

    edit_album = new Display(parseData.getAlbumEdit(),"form_edit_album","form_edit_album_tpl")
    edit_album.show();
    buttons = parseData.getButtons(parseData.getAlbumEdit(),"album");
    //隐藏所有按钮
    var form_buttons = $("#form_edit_album").find("input[type=button]");
    form_buttons.each(function(i){
        form_button = $(form_buttons[i]);
        form_button.hide();
    });
    for(var i in buttons){
        var button = buttons[i]
        form_buttons.each(function(j){
            var form_button = $(form_buttons[j]);
            if(i == j){
                form_button.show();
                form_button.val(button.text);
                // form_button.data("url") = button.url;
                var url = button.url;
                form_button.click(function(){
                    edit_album.getValue();
                    jQuery.post(
                        url,parseData.formatAlbumEdit(edit_album.jsonObj),
                        function(sData){
        	            if(sData.error_code == 0){
                                alert("to do refreash left windown");
        	            }
        	            else{
        	                alert(sData.error_code)//保持并发布没成功
        	            }
                        },'json'
                    );
                });
            }
        });
    }
    //添加取消按钮
    $("#form_edit_album").find("#cancle").show().click(function(){
        edit_album.close();
    });
    
    $("#form_edit_album").find('.pic-file').each(function(index){
        PicUploader.registerAjaxUploadListener($("#form_edit_album").find('.pic-file').eq(index).attr('id'),'2',$(this).attr('data-upl-type'),$(this).parents("form").attr('id'));
    });
    
}


    // function stringFilter($str){    
    //   if (!empty($str)) {  
    //     if (ini_set('magic_quotes_gpc')) {  
    //       return $str;  
    //     }else{  
    //       return addslashes($str);  
    //     }  
    //   }else{  
    //     return false;  
    //   }
    // }
$(document).ready(function(){	
    left1Album = new Display(parseData.getAlbumEdit(),"form_album","form_album_tpl");
    left1Album.show();
    
    //简介模块
    left1Info = new Display(parseData.getAlbumEdit(),"cont_tab_1","cont_tab_1_tpl")
    left1Info.show();
    $("#cont_tab_1").css('display','none');

    //歌曲列表
    for(var i=0; i < quku_v.album.data.quku_songs_list.length;i++){
        song_arr = []
        newli = $("<li id=song_"+i+"></li>").appendTo($("#form_song ul"));
        rightSong = new Display(parseData.getSongEdit(quku_v.album.data.quku_songs_list,i),newli.attr('id'),"songs_list_tpl");
        rightSong.show();
    }

    //编辑按钮
    $("#form_album").hover(
	function(){
	    if($(".ai_album").next().css("display",'none')) $(".ai_album").next().css('display','inline');
	    //after("<a href='#' style='color:#999;float:right'>编辑</a>");
	},
	function(){
	    if($(".ai_album").next().css("display",'inline')) $(".ai_album").next().css('display','none');
	}
    )
    
    $("#form_album").find("#album_eidt_btn").bind("click",left1AlbumClick);


})
