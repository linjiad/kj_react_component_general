import React, {Component} from "react";
import "./index.less";
class DataPicker extends Component {
    // noinspection JSAnnotator
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.value?this.props.value:"",
    };
    onChange = (event) => {
        this.props.onChange(event.target.value);
        this.setState({value:event.target.value});
    };
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    }

    render() {
        return (
            <div style={{display:"flex"}}>
                <div className="date_picker_title">{this.props.title}</div>
                <input type="date" value={this.state.value} onChange={this.onChange} className="my_date_picker"/>
            </div>
        );
    }
}

export default DataPicker;
