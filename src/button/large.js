import React, {Component} from "react";
import "./index.less";

class ButtonLarge extends Component {
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
                <button className="myBtn-large" type="button" onClick={this.props.onClick}
                    style={{cursor:"pointer"}}>{this.state.value}</button>
            </div>
        );
    }
}

export default ButtonLarge;
