import React from "react";

const CustomButton = (props) => {
    const {
        type="button", color, icon, iconColor = "dark",
        className, onClick, isLoading = false } = props;
    const buttonClass = `btn btn-${color} ${className}`;
    const spinnerClass = `spinner-border spinner-border-sm text-${iconColor} me-1`;
    const iconClass = `${icon} text-${iconColor} me-1`;
    return ( 
        <button type={type} className={buttonClass}
            onClick={onClick} disabled={isLoading} >
            { isLoading ? (
                <div className={spinnerClass} role="status">
                    <span className=" visually-hidden">Loading...</span>
                </div>
            ) : (<i className={iconClass}></i>)}
            {props.children}
        </button>
     );
};
 
export default CustomButton;