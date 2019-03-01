import * as classNames from "classnames";
import React, { Component } from 'react';
import "./checkbox.css";

class Checkbox extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        // this.props.isChecked = !this.props.isChecked;
        this.props.onChange && this.props.onChange(!this.props.isChecked, this.props.item);
    }

    render () {
        const { label, isDisabled = false, className, isChecked} = this.props;
        
        const classnames = classNames("Checkbox-container", { "Checkbox-container--disabled": isDisabled }, className);
        return (
            <div onClick={isDisabled ? null : this.handleClick} className={classnames}>
                <div className={classNames(
                    "Checkbox-icon-container",
                    { "Checkbox-icon-container--disabled": isDisabled },
                    { "Checkbox-icon-container--selected": isChecked })}>
                </div>

                <label className={classNames("Checkbox-label", { "Checkbox-label--disabled": isDisabled })}>
                    {label}
                </label>
            </div>
        );
    }
};

Checkbox.defaultProps = {
    isDisabled: false,
};

export default Checkbox;
 