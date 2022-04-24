import React from 'react'; //imcr
import PropTypes from 'prop-types';
// đây là component có thể tái sử dụng ở các form khác
const Input = (props) => {
    
    //đây là cái props chứa các thuộc tính của component cần tái sử dụng.
    //...others là cái refs là những thuộc tính bên ngoài truyền vào là thì sẽ vào cái mảng others.
    const  { type, id, label, labelSize, inputRef, frmField, 
            err, errMessage, lastRow, required, ...others} = props;

    const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label ${required ? "required" : ""}`;
    const inputClass = `form-control ${err ? "is-invalid" : "" }`;
    return (
            <div className={`row ${lastRow ? "" : "mb-3"}`}>

                <label htmlFor={id} className={labelClass}>{label}</label>

                <div className="col-sm">
                    { others["rows"] > 1 ?
                     (<textarea  ref={inputRef} className={inputClass} id={id} {...others} {...frmField}></textarea>) : 
                     (<input type={type}  ref={inputRef} className={inputClass} id={id} {...others} {...frmField}/>)}
                     {err ? <div className='invalid-feedback'>{errMessage}</div> : ""}
                </div>
            </div>
    );
}

Input.propTypes = {
    type: PropTypes.oneOf(["text", "url", "email", "tel",
                            "password", "number", "search"]),
    inputRef: PropTypes.object,
    label: PropTypes.string.isRequired,
    labelSize: PropTypes.number,
    lastRow: PropTypes.bool,
    frmField: PropTypes.object,
    err: PropTypes.string,
    errMessage: PropTypes.string,
    rows: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
 
export default Input;