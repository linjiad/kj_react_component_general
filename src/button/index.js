import React, {Component} from "react";
import "./index.less";

class Button extends Component {
    // noinspection JSAnnotator
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    state = {
        value: this.props.value,
    };
    render() {
        return (
            <div>
                <button className="myBtn" type="button" onClick={this.props.onClick}
                    style={{cursor:"pointer"}}> {this.props.value}</button>
            </div>
        );
    }
}

export default Button;
