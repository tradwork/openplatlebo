/**
 * 专辑页面图片裁剪功能
 * @author yujiao@baidu.com
 * @version 1.0.0
 * @date 2014/04/02 09:35 pm
 * 每位工程师都有保持代码优雅的义务
 * _each engineer has a duty to keep the code elegant
 */

//转换前后台模版数据格式
var parseData = {
    
    getAlbumEdit : function(data){
        if(!data){
            data = quku_v.album.data;
        }
        arrRes = new Array();
        arrRes.push({"key":"ai_album","type":"text","value":data.ai_album ? data.ai_album : "标题",'callback':{'name':'focus','func':function(){if(this.value=="标题") this.value=""}}});
        if(data.ai_globalid){
            arrRes.push({"key":"ai_globalid","type":"hidden","value":data.ai_globalid ? data.ai_globalid : 0});
        }
        arrRes.push({"key":"ai_source_info","type":"input","value":data.ai_source_info ? data.ai_source_info : data.ai_source_info});
        arrRes.push({"key":"ai_info","type":"input","value":data.ai_info ? data.ai_info : '这里是简介','callback':{'name':'focus','func':function(){if(this.value=="这里是简介") this.value=""}}});
        arrRes.push({"key":"ai_submit",'type':'input',"value":'发布'});
        var class1 = "",class2 = "";
        if(data.quku_tag_info_rel1.length > 0){
            class1 = data.quku_tag_info_rel1[0][0] ? data.quku_tag_info_rel1[0][0] : "";
            class2 = data.quku_tag_info_rel1[0][2] ? data.quku_tag_info_rel1[0][2] : "";
        }
        arrRes.push({"key":"ai_class_1","type":"select","value":data.si_tag_relOption,"selected":class1,"callback":{"name":"change","func":function(){          
            var nextSel = $(this).next();
            nextSel.empty();
            for(var i in data.si_tag_rel1Option[$(this).val()]){
                nextSel.append("<option value="+i+">"+data.si_tag_rel1Option[$(this).val()][i]+"</option>");
            }
        }}});
        arrRes.push({"key":"ai_class_2","type":"select","value":data.si_tag_rel1Option[data.si_tag_rel] ? data.si_tag_rel1Option[data.si_tag_rel] : {},"selected":class2});
        var defaultPic = {}, focusPic = {};

        for(var i in data.quku_pic_info){
            picObj = data.quku_pic_info[i];
            if(picObj.pi_usage_flag == 0){
                if(!defaultPic.pi_pic_width || defaultPic.pi_pic_width < picObj.pi_pic_width){
                   defaultPic = picObj;
                }
            }else if(picObj.pi_usage_flag == 1){
                if(!focusPic.pi_pic_width || focusPic.pi_pic_width < picObj.pi_pic_width){
                   focusPic = picObj;
                }
            }
        }

        defaultPic = defaultPic!= {} ? defaultPic : {'pic':'0','pi_link':'/static/img/demo_4.png'}
        focusPic = focusPic != {} ? focusPic : {'pic':'0','pi_link':'/static/img/demo_5.png'}        
        
        arrRes.push({"key":"img_pic_info","type":"img","value":defaultPic.pi_link});
        arrRes.push({"key":"json_pic_info","type":"hidden","value":JSON.stringify(defaultPic)});

        arrRes.push({"key":"img_focus_info","type":"img","value":focusPic.pi_link});
        arrRes.push({"key":"json_focus_info","type":"hidden","value":JSON.stringify(focusPic)});

        // arrRes.push({'key':"song_title","type":"text","value":'歌曲标题'});
        // arrRes.push({'key':"song_img","type":"img","value":"/static/img/demo_2.gif"});
        // arrRes.push({'key':"song_order","type":"text","value":'01'});
        
        return arrRes;
    },

    getSongEdit : function(data,i){
        var arrRes = [];
        var defaultPic = {}, focusPic = {};
        data = data[i]
        for(var i in data.quku_pic_info){
            picObj = data.quku_pic_info[i];
            if(picObj.pi_usage_flag == 0){
                if(!defaultPic.pi_pic_width || defaultPic.pi_pic_width < picObj.pi_pic_width){
                   defaultPic = picObj;
                }
            }else if(picObj.pi_usage_flag == 1){
                if(!focusPic.pi_pic_width || focusPic.pi_pic_width < picObj.pi_pic_width){
                   focusPic = picObj;
                }
            }
        }

        defaultPic = defaultPic!= {} ? defaultPic : {'pic':'0','pi_link':'/static/img/demo_4.png'}
        focusPic = focusPic != {} ? focusPic : {'pic':'0','pi_link':'/static/img/demo_5.png'}        
        
        arrRes.push({"key":"img_pic_info","type":"img","value":defaultPic.pi_link});
        arrRes.push({"key":"json_pic_info","type":"hidden","value":JSON.stringify(defaultPic)});
        arrRes.push({"key":"img_focus_info","type":"img","value":focusPic.pi_link});
        arrRes.push({"key":"json_focus_info","type":"hidden","value":JSON.stringify(focusPic)});

        arrRes.push({"key":"si_title","type":"span","value":data.quku_songs_info.si_title});
        arrRes.push({"key":"si_album_no","type":"text","value":data.quku_songs_info.si_album_no});
        arrRes.push({"key":"si_info","type":"text","value":data.quku_songs_info.si_album_no});
        return arrRes;
    },

    _formatClassInfo : function(data,postData,type){
        if(!postData["quku_tag_info_rel1"]){
            postData["quku_tag_info_rel1"] = new Array();
        }else{
            postData["quku_tag_info_rel1"] = JSON.parse(postData["quku_tag_info_rel1"]);
        }
        var classInfo = {"ti_rawweight":"0","ti_rawweight_1":"0","ti_editflag_1":"","ti_weight":"0","ti_weight_1":"0"};
        if(type == "ai_class_1"){
            if(data.selected){
                classInfo["ti_tagid"] = data.selected
            }
        }else if(type == "ai_class_2"){
            if(data.selected){
                classInfo["ti_tagid_1"] = data.selected
            }
        }
        postData["quku_tag_info_rel1"].push(classInfo);
        postData["quku_tag_info_rel1"] = JSON.stringify(postData["quku_tag_info_rel1"]);
        return postData;
    },

    _formatPicInfo : function(data,postData){
        if(!postData["quku_pic_info"]){
            postData["quku_pic_info"] = new Array();
        }else{
            postData["quku_pic_info"] = postData["quku_pic_info"].split("$@$")
        }
        postData["quku_pic_info"].push(data.value);
        postData["quku_pic_info"] = postData["quku_pic_info"].join("$@$");
        return postData;
    },
    
    formatAlbumEdit : function(data){
        var postData = {}
        var albumFields = ["ai_album","ai_info","ai_globalid","ai_source_info","ai_class_1","ai_class_2","json_focus_info","json_pic_info"];
        for(var i in albumFields){
            for(var j in data){
                if(data[j].key == albumFields[i]){
                    switch(albumFields[i]){
                        case "ai_class_1":
                        case "ai_class_2":
                        this._formatClassInfo(data[j],postData,albumFields[i]);
                        break;
                        case "json_focus_info":
                        case "json_pic_info":
                        this._formatPicInfo(data[j],postData);
                        break;
                        default:
                        if(typeof data[j].value != "undefined"){
                            postData[albumFields[i]] = data[j].value;
                        }
                    }
                }
            }
        }
        postData["quku_artist_works_ref"] = JSON.stringify({"ab_name":singerInfo.ab_name,"ab_globalid":singerInfo.ab_globalid});
        return postData;
    },

    getButtons : function(data,type){
        var strUrl = "?c="+type+"&m=";
        var buttons = {}
        if(type == "album"){
            if(data.ai_globalid!=0){
                buttons[0] = {"url":strUrl + "doEdit","text":"保存"};
                if(!data.ai_status || data.ai_status != 0){
                    buttons[1] = {"url":strUrl + "doEditAndPub","text":"保存并发布"};
                }
            }else{
                buttons[0] = {"url":strUrl + "doCreate","text":"创建"};
                if(!data.ai_status || data.ai_status != 0){
                    buttons[1] = {"url":strUrl + "doCreateAndPub","text":"创建并发布"};
                }
            }
        }else if(type == "song"){
            if(data.si_globalid){
                buttons[0] = {"url":strUrl + "doEdit","text":"保存"};
                if(!data.ai_status || data.ai_status != 0){
                    buttons[1] = {"url":strUrl + "doEditAndPub","text":"保存并发布"};
                }
            }else{
                buttons[0] = {"url":strUrl + "doCreate","text":"创建"};
                if(!data.ai_status || data.ai_status != 0){
                    buttons[1] = {"url":strUrl + "doCreateAndPub","text":"创建并发布"};
                }
            }
        }
        return buttons;
    },
    getPostData : function(data){
        var postData = {};
        postData['ai_album'] = "测试专辑";
        postData['ai_info'] = "测试专辑简介";
        postData['quku_artist_works_ref'] = '{"name":"\u8dd1\u706b\u8f66\u7535\u53f0","id":"1050472","idx":0}';
        postData['ai_globalid'] = "1737532";
        postData['ai_album_id'] = "1737532";
        postData['quku_tag_info_rel'] = '[{"td_name":"","ti_rawweight":"15000","ti_editflag":"1","ti_weight":"","ti_infotype":"","ti_tagid":"","ti_id":"","ti_infoid":"","ti_lastupdatetime":""}]';
        postData['quku_tag_info_rel1'] = '[{"ti_tagid":"11373559","ti_rawweight":"0","ti_tagid_1":"11373626","ti_rawweight_1":"0","ti_editflag_1":"","ti_weight":"0","ti_weight_1":"0"},{"ti_tagid":"11373559","ti_rawweight":"0","ti_tagid_1":"11373626","ti_rawweight_1":"0","ti_editflag_1":"","ti_weight":"0","ti_weight_1":"0"},{"ti_tagid":"11373559","ti_rawweight":"0","ti_tagid_1":"11373626","ti_rawweight_1":"0","ti_editflag_1":"","ti_weight":"0","ti_weight_1":"0"},{"ti_tagid":"11373559","ti_rawweight":"0","ti_tagid_1":"11373626","ti_rawweight_1":"0","ti_editflag_1":"","ti_weight":"0","ti_weight_1":"0"}]';
        postData['quku_pic_info'] = '{"pi_globalid":"1050476","pi_type":"2","pi_itemid":"1050473","pi_pic_width":"1136","pi_pic_height":"1136","pi_pic_ext":"jpg","pi_link":"http:\/\/c.hiphotos.baidu.com\/ting\/pic\/item\/b21bb051f8198618949fb22c48ed2e738ad4e6ba.jpg","pi_pic_desc":"","pi_md5":"36a185e7da3c005bc5b5bf27f6cc73ee","pi_jointime":"1396311553","pi_usage_flag":"0","pi_hiphotoid":"11146945954","pi_source":"1"}';
        return postData;
    }
}


