// eslint-disable-next-line
import React, {Component} from "react";
import "./index.less";

class Bread extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    state = {
        position:this.props.position,
    };

    componentDidMount() {}
    render() {
        return (
            <div className="Breadcrumb-box">
                <ul>
                    <li style={{fontSize:"2rem",fontWeight:"800"}}>
                        <i className={`iconfont breadcrumb_iconfont iconzhuye`} ></i>
                    </li>
                    <li>您的位置：</li>
                    {
                        this.props.position.map((item,index)=> {
                            if(index+1 === this.props.position.length){
                                return (
                                    <a >
                                        <li style={{padding:"0 2px",fontSize: "16px"}}>
                                            {item.name}
                                        </li>
                                    </a>
                                );
                            }else {
                                return (
                                    <a>
                                        <li style={{padding:"0 2px",fontSize: "16px"}}>
                                            {item.name}
                                        </li>
                                        <li>></li>
                                    </a>
                                );
                            }
                        })}
                </ul>
            </div>
        );
    }
}
export default Bread;
