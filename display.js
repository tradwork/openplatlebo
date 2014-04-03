/**
 * 曲库公共功能开发，与具体业务无关
 * @author yujiao@baidu.com
 * @version 1.0.0
 * @date 2014/03/28 14:51 pm
 * 每位工程师都有保持代码优雅的义务
 * _each engineer has a duty to keep the code elegant
 */

function Dispalu(){
    this.init = function(){

    }
    return this;
}
function Display(jsonObj,strParentId,strContentId){
    
    this.jsonObj = jsonObj;
    this.strParentId = strParentId;
    this.strContentId = strContentId;
    this.supportType = new Array('input',"img","text","label","select","button","h3",'p','textarea','span');
    this.newObj = $("#"+strParentId);
    //jsonObj : {},

    // @strContentId 是模版id
    // @strParentId 是显示的容器id
    // @jsonObj 包含 key、value、callback、type
    
    this.close = function(){
        $("#" + this.strParentId).empty();
        $("#" + this.strParentId).hide();
    },

    this.show = function(){
        jsonObj = this.jsonObj;
        strContentId = this.strContentId;
        strParentId = this.strParentId;
        if(!this.jsonObj){
            console.log("数据没有初始化，请调用init方法");
            return false;
        }
        //console.log("数据列表:" + jsonObj);

        if($("#"+ strContentId).length != 1){
            console.log("模版为空")
            return false;
        }

        var p = $("#"+strContentId).html();
        //console.log("获取模版数据成功" + p)

        // if($("#"+newId).length > 0){
        //     $("#" + newId).remove();
        // }
        //三角位置计算函数
        // $("body").append("<div style='display:none' id='"+newId+"'></div>")
        this.newObj = $("#"+strParentId);
        //console.log(this.newObj);

        this.newObj.html(p);
        //给img, pic_json_info设置新的id，必须

        for(var j in jsonObj){
            subObj = false;
            subObj = this.findObj(jsonObj[j]);
            if(!subObj){
                continue;
            }
            this.setValue(subObj,jsonObj[j]);
        }
        this.newObj.css("display","block")
    },

    this.getValue = function(){
        for(var j in this.jsonObj){
            subObj = this.findObj(this.jsonObj[j]);
            if(!subObj){
                continue;
            }
            info = this.getSetGetFuc(subObj,this.jsonObj[j],"get");
            setFunc = info[0];
            tObj = info[1];
            if(jQuery.isFunction(this[setFunc])){
                this[setFunc](tObj,this.jsonObj[j]);
            }
        }
    },

    this.findObj = function(jsonObj){
        var i = jsonObj;
        //console.log("开始寻找id/name/class是:" + i.key + "的组件");这里还有问题，关于标签的问题
        subObj = false;
        if(this.newObj.find("[id = '"+i.key+"']").length == 1){
            subObj = this.newObj.find("[id = '"+i.key+"']");
        }else if(this.newObj.find("[name = '"+i.key+"']").length == 1){
            subObj = this.newObj.find("[name = '"+i.key+"']");
        }else if(this.newObj.find("."+i.key).length == 1){
            subObj = this.newObj.find("."+i.key);
        }
        if(!subObj){
            console.log("没有找到id是:" + i.key + "的组件");
            return false;
        }
        return subObj;
    },

    this.getSetGetFuc = function(targetObj,jsonObj,strType){
        setFunc = false;
        tObj = false;
        for(var j in this.supportType){
            var i = this.supportType[j]
            if(targetObj.is(i)){
                setFunc = "_" + strType + i;
                tObj = targetObj
                break;
            }else if(targetObj.find(jsonObj["type"]).is(i)){
                setFunc = "_" + strType + i;
                tObj = targetObj.find(jsonObj["type"])
                break;
            }
        }
        return [setFunc,tObj]
    },

    this.setValue = function(targetObj,jsonObj){
        info = this.getSetGetFuc(targetObj,jsonObj,"set");
        setFunc = info[0];
        tObj = info[1];
        if(!setFunc){
            console.log("不能支持现有的数据类型填充");
            return false;
        }

        if(jQuery.isFunction(this[setFunc])){
            this[setFunc](tObj,jsonObj);
            if(jsonObj.callback){
                $(tObj).bind(jsonObj.callback.name,jsonObj.callback.func);
            }
        }else{
            console.log(setFunc + " 方法未实现");
            return false;
        }
    },
    
    this._setimg = function(targetObj,jsonObj){
        imgLink = jsonObj.value;
        console.log("处理图片链接" + imgLink);
        $(targetObj).attr("src",imgLink);
    },
    
    this._getimg = function(targetObj,jsonObj){
        imgLink = $(targetObj).attr("src");
        jsonObj.value = imgLink;
    },

    this._settext = function(targetObj,jsonObj){
        textValue = jsonObj.value;
        console.log("处理文本数据" + textValue);
        $(targetObj).val(textValue);
    },

    this._seth3 = function(targetObj,jsonObj){
        textValue = jsonObj.value;
        console.log("处理文本数据" + textValue);
        $(targetObj).html(textValue);
    },

    this._geth3 = function(targetObj,jsonObj){
        imgLink = $(targetObj).html();
        jsonObj.value = imgLink;
    },

    this._setspan = function(targetObj,jsonObj){
        textValue = jsonObj.value;
        console.log("处理文本数据" + textValue);
        $(targetObj).html(textValue);
    },

    this._getspan = function(targetObj,jsonObj){
        imgLink = $(targetObj).html();
        jsonObj.value = imgLink;
    },

    this._setp = function(targetObj,jsonObj){
        textValue = jsonObj.value;
        console.log("处理文本数据" + textValue);
        $(targetObj).html(textValue);
    },

    this._getp =function(targetObj,jsonObj){
        imgLink = $(targetObj).html();
        jsonObj.value = imgLink;
    },

   this._getinput =function(targetObj,jsonObj){
        imgLink = $(targetObj).val();
        jsonObj.value = imgLink;
    },

    this._setinput =function(targetObj,jsonObj){
        textValue = jsonObj.value;
        console.log("处理文本数据" + textValue);
        $(targetObj).val(textValue);
    },

    this._gettextarea =function(targetObj,jsonObj){
        textValue= $(targetObj).val();
        jsonObj.value = textValue;
    },

    this._settextarea =function(targetObj,jsonObj){
        textValue = jsonObj.value;
        console.log("处理文本数据" + textValue);
        $(targetObj).html(textValue);
    },
    
    this._setselect =function(targetObj,jsonObj){
        options = jsonObj.value;
        selected = jsonObj.selected;
        $(targetObj).append("<option  value=></option>");
        for(var i in options){
            selected = "";
            if(i == selected){
                selected = "selected";
            }
            $(targetObj).append("<option "+selected+" value="+i+">"+options[i]+"</option>");
        }
    },

    this._getselect =function(targetObj,jsonObj){
        jsonObj.selected = $(targetObj).val();
    }
}

$(document).ready(function(){
    // a = Display.init([
    //     {"key":"album_focus","type":"img","value":"http://imgt3.bdstatic.com/it/u=853309878,3579075667&fm=23&gp=0.jpg","callback":
    //      {"name":"click","func":
    //       function(){
    //           alert(12)
    //       }
    //      }},
    //     {"key":"album_title","type":"h3","value":"柏木由纪",}
    // ],"text_id","form_album");
    //a.show()
    // // $("#form_album a").bind('click',function(){
    // //     //显示模版
    // //     $("#form_edit_album").css('display','block');
    // // })
});
 
