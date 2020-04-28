import React ,{ Component,Fragment } from "react";
import myLess from "./index.less";
class RichText extends Component {
    constructor(){
        super();
    }
    state = {
        buttonList:[
            {
                title:"居中",
                dataName:"justifyCenter",
                dataValue:"",
                type:"button",
            },
            {
                title:"左对齐",
                dataName:"justifyLeft",
                dataValue:"",
                type:"button",
            },
            {
                title:"右对齐",
                dataName:"justifyRight",
                dataValue:"",
                type:"button",
            },
            {
                title:"无序列表",
                dataName:"insertUnorderedList",
                dataValue:"",
                type:"button",
            },
            {
                title:"有序列表",
                dataName:"insertOrderedList",
                dataValue:"",
                type:"button",
            },
            {
                title:"加粗",
                dataName:"bold",
                dataValue:"",
                type:"button",
            },
            {
                title:"斜体",
                dataName:"italic",
                dataValue:"",
                type:"button",
            },
            {
                title:"下划线",
                dataName:"underline",
                dataValue:"",
                type:"button",
            },
            {
                title:"前进一步",
                dataName:"redo",
                dataValue:"",
                type:"button",
            },
            {
                title:"后退一步",
                dataName:"undo",
                dataValue:"",
                type:"button",
            },
            {
                title:"字体大小",
                dataName:"fontsize",
                dataValue:3,
                type:"fontSize",
            },
            {
                title:"表情",
                dataName:"inserttext",
                dataValue:"",
                type:"emoji",
            },
            {
                title:"字体颜色",
                dataName:"forecolor",
                dataValue:"#1a9be6",
                type:"fontColor",
            },
            {
                title:"背景颜色",
                dataName:"backColor",
                dataValue:"#1a9be6",
                type:"backColor",
            },
            {
                title:"插入图片",
                dataName:"insertimage",
                dataValue:"http://49.4.91.199:8888/group1/M00/00/00/wKgBo16foHiAE2-EADD-wJ_gJmo699.jpg",
                type:"img",
            },
        ],
        emojiList:[
            "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚",
            "🙂","🤗","🤔","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","😴","😌","😛","😜","😝","🤤","😒","😓",
            "😔","😕","🙃","🤑","😲",
            "😖","😞","😟","😤","😢","😭","😦","😧","😨","😩","😬","😰","😱","😳","😵","😡","😠","😷","🤒","🤕","🤢","🤧","😇",
            "🤠","🤡","🤥","🤓","😈","👿","👹","👻","👽","🤖","💩" ,"😸" ,"😹" ,"😻" ,"😼", "😽" ,"🙀" ,"😿" ,"😾"
        ],
        colorList:[
            "#1a9be6","#e64f4c","#e63c39","#5537e6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6",
            "#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6",
            "#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#1a9be6","#ffffff",
        ],
    }
    componentDidMount() {
        /**  当文档载入完毕后，在富文本框内设置焦点，
         *  并且在第一行插入p标签。
         **/
        this.refs.myEdit.focus();
        document.execCommand("formatblock", false, "p");
        /**  在编辑框内，当键盘输入时自动在当前行插入p标签，
         *  也可以自动插入其它标签，
         *  当编辑框内检测到</li>标签时禁止插入p标签。
         */
        this.refs.myEdit.onkeydown = ()=>{
            const str = this.refs.myEdit.innerHTML;
            const val = str.search(/<\/li>/i);
            if(val < 0){
                document.execCommand("formatblock", false, "p");
            }
        };

        const btns = document.getElementsByName("button_edit");
        /**  编辑按钮的js操作命令接口。
         *  按钮的data-name属性存放命令，data-value属性存放值。
         *  也可用其它标签代替。
         **/
        for(let i = 0; i < btns.length; i++){
            btns[i].onclick = ()=>{
                if(!btns[i].getAttribute("data_value")){
                    console.log(btns[i].getAttribute("data_name"));
                    document.execCommand(btns[i].getAttribute("data_name"));
                }else{
                    console.log(btns[i].getAttribute("data_value"));
                    document.execCommand(btns[i].getAttribute("data_name"),false,btns[i].getAttribute("data_value"));
                }
            };
        }
        // 点击点的坐标
        let clickx =  "";
        let clicky = "";
        let upclickx =  "";
        let upclicky = "";
        let imgNode = false;
        this.refs.myEdit.onmousemove = (e)=>{
            if(Object.is(e.srcElement.nodeName,"IMG")&&Object.is(e.srcElement.name,"MyImg")){
                const imgNode2 = e.srcElement;
                const img = {
                    left:imgNode2.offsetLeft,
                    right:imgNode2.offsetLeft + imgNode2.clientWidth,
                    top:imgNode2.offsetTop,
                    bottom:imgNode2.offsetTop + imgNode2.clientHeight,
                };
                // 右侧
                if(img.right -10 <= e.clientX && e.clientX <= img.right+ 10){
                    imgNode2.style.cursor = "e-resize";
                }
                else{
                    e.srcElement.style.cursor = "default";
                }
            }
        };
        this.refs.myEdit.onmousedown = (event) =>{
            // 记录点击的x和y
            clickx = event.x;
            clicky = event.y;
            if(Object.is(event.srcElement.nodeName,"IMG")){
                imgNode = event.srcElement;
                event.preventDefault();
            }else{
                imgNode = false;
            }
        };
        this.refs.myEdit.onmouseup= (event) =>{
            // 记录点击的x和y
            upclickx = event.x;
            upclicky = event.y;
            if(imgNode){
                const width = imgNode.clientWidth;
                const height = imgNode.clientHeight;
                imgNode.style.width = `${width + upclickx - clickx}px`;
                imgNode.style.height = `${height + upclicky - clicky}px`;
            }
        };
    }
    // 选择字体大小
    changSize = (item,e,event)=>{
        item.dataValue = event.target.value;
        document.execCommand("fontsize",false,event.target.value);
        this.setState({buttonList:[...new Set([...this.state.buttonList,item])]});
    }
    // 显示图标选择
    showEmoji = () =>{
        const emojiList = document.getElementById("emojiList");
        if(emojiList.style.display){
            emojiList.style.display = "";
        }
        else{
            emojiList.style.display = "block";
        }
    }
    // 插入图表
    changeEmoji = (item)=>{
        const emojiList = document.getElementById("emojiList");
        document.execCommand("inserttext",false,item);
        emojiList.style.display = "";
    }
    // 显示字体颜色
    showFontColor = () =>{
        const fontColorList = document.getElementById("fontColorList");
        if(fontColorList.style.display){
            fontColorList.style.display = "";
        }
        else{
            fontColorList.style.display = "block";
        }
    }
    // 选择字体颜色
    changeFontColor = (item,item2)=>{
        const fontColorList = document.getElementById("fontColorList");
        document.execCommand("forecolor",false,item);
        item2.dataValue = item;
        this.setState({buttonList:[...new Set([...this.state.buttonList,item2])]});
        fontColorList.style.display = "";
    }
    // 显示背景颜色
    showBackColor = () =>{
        const backColorList = document.getElementById("backColorList");
        if(backColorList.style.display){
            backColorList.style.display = "";
        }
        else{
            backColorList.style.display = "block";
        }
    }
    // 选择字体颜色
    changeBackColor = (item,item2)=>{
        const backColorList = document.getElementById("backColorList");
        document.execCommand("backColor",false,item);
        item2.dataValue = item;
        this.setState({buttonList:[...new Set([...this.state.buttonList,item2])]});
        backColorList.style.display = "";
    }
    // 添加img
    pushImg = ()=>{
        document.execCommand("insertimage",false,"http://49.4.91.199:8888/group1/M00/00/00/wKgBo16foHiAE2-EADD-wJ_gJmo699.jpg");
        const imgList = this.refs.myEdit.getElementsByTagName("IMG");
        Array.prototype.forEach.call(imgList,(item)=> {
            item.setAttribute("name","MyImg");
        });
    }
    render() {
        return (
            <div className={myLess.my_fuwenben}>
                <div className={myLess.my_menuList}>
                    {
                        this.state.buttonList.map((item,index)=>{
                            switch (item.type) {
                            case "button":
                                return(
                                    <button  key={index} className={myLess.my_menuItem} name="button_edit" data_name={item.dataName}>
                                        {item.title}
                                    </button>
                                );
                            case "fontSize":
                                return(
                                    <Fragment key={index}>
                                        <div>
                                            {item.title}
                                        </div>
                                        <select  className={myLess.my_menuItemInput} value={item.dataValue} style={{width:"50px"}}
                                            onChange={this.changSize.bind(this,item,event)}>
                                            <option value={7} style={{fontSize:"35px"}}> 一级 </option>
                                            <option value={6} style={{fontSize:"30px"}}> 二级 </option>
                                            <option value={5} style={{fontSize:"25px"}}> 三级 </option>
                                            <option value={4} style={{fontSize:"20px"}}> 四级 </option>
                                            <option value={3} style={{fontSize:"15px"}}> 五级 </option>
                                            <option value={2} style={{fontSize:"10px"}}> 六级 </option>
                                            <option value={1} style={{fontSize:"5px"}}> 七级 </option>
                                        </select>
                                    </Fragment>
                                );
                            case "emoji":
                                return(
                                    <Fragment key={index}>
                                        <div className={myLess.my_menuItem2}>
                                            <button onClick={this.showEmoji}>
                                                {item.title}
                                                {/*data_name={item.dataName} data_value={item.dataValue}*/}
                                            </button>
                                            <div className={myLess.my_emojiList} id="emojiList">
                                                {
                                                    this.state.emojiList.map((item,index)=>
                                                        <button style={{fontSize:"15px"}} key={index} onClick={this.changeEmoji.bind(this,item)}>{item}</button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            case "fontColor":
                                return(
                                    <Fragment key={index}>
                                        <div className={myLess.my_menuItem2}>
                                            <button onClick={this.showFontColor} style={{backgroundColor:`${item.dataValue}`}}>
                                                {item.title}
                                                {/*data_name={item.dataName} data_value={item.dataValue}*/}
                                            </button>
                                            <div className={myLess.my_emojiList} id="fontColorList">
                                                {
                                                    this.state.colorList.map((item2,index)=>
                                                        <button style={{fontSize:"15px",backgroundColor:`${item2}`,width:"20px",height:"20px"}}
                                                            key={index} onClick={this.changeFontColor.bind(this,item2,item)}> </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            case "backColor":
                                return(
                                    <Fragment key={index}>
                                        <div className={myLess.my_menuItem2}>
                                            <button onClick={this.showBackColor} style={{backgroundColor:`${item.dataValue}`}}>
                                                {item.title}
                                                {/*data_name={item.dataName} data_value={item.dataValue}*/}
                                            </button>
                                            <div className={myLess.my_emojiList} id="backColorList">
                                                {
                                                    this.state.colorList.map((item2,index)=>
                                                        <button style={{fontSize:"15px",backgroundColor:`${item2}`,width:"20px",height:"20px"}}
                                                            key={index} onClick={this.changeBackColor.bind(this,item2,item)}> </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            case "img":
                                return(
                                    <button  key={index} className={myLess.my_menuItem} onClick={this.pushImg}>
                                        {item.title}
                                    </button>
                                );
                            default : return null;
                            }
                        }
                        )
                    }
                </div>
                <div ref="myEdit" contentEditable="true" className={myLess.my_edit}></div>
            </div>
        );
    }
}
export default RichText;
