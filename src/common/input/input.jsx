import React, {Component} from "react";

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: props[props.field],
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
    <div>
      {this.props.type == "textarea" ?
        (<textarea className={this.props.className}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
            onClick={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.value}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}/>) :
        (<input className={this.props.className}
            type="text"
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
            onClick={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.value}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}/>)
        }
    </div>);
    }

    // ****************
    //  Class methods
    // ****************

    onChange = event => {
        this.setState({value: event.target.value});
        this.props.onChange && this.props.onChange(event.target.value, this.props.field);
    }

    onKeyUp = event => {
        this.initIfTypeFunction(this.props.onKeyUp, event);
    }

    onKeyDown = event => {
        this.initIfTypeFunction(this.props.onKeyDown, event);
    }

    onFocus = event => {
        this.initIfTypeFunction(this.props.onFocus, event);
    }

    onBlur = event => {
        this.initIfTypeFunction(this.props.onBlur, event);
    }

    initIfTypeFunction(func, ...args) {
        if (typeof func === "function") {
            func(...args);
        }
    }

    inputRef = input => {
        this.inputElm = input;
    }

    inputFocus = () => {
        this.inputElm.focus();
    }

}

export default Input;