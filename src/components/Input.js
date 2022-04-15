import React from 'react'; //imcr

// đây là component có thể tái sử dụng ở các form khác
const Input = (props) => {
    
    //đây là cái props chứa các thuộc tính của component cần tái sử dụng.
    //...others là cái refs là những thuộc tính bên ngoài truyền vào là thì sẽ vào cái mảng others.
    const  {id, label,labelSize,inputRef,frmField, err, errMessage, ...others} = props;

    const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
    const inputClass = `form-control ${err ? "is-invalid" : "" }`;
    return (
            <div className="row mb-3">

                <label htmlFor={id} className={labelClass}>{label}</label>

                <div className="col-sm">
                    { others["rows"] > 1 ?
                     (<textarea  ref={inputRef} className={inputClass} id={id} {...others} {...frmField}></textarea>) : 
                     (<input  ref={inputRef} className={inputClass} id={id} {...others} {...frmField}/>)}
                     {err ? <div className='invalid-feedback'>{errMessage}</div> : ""}
                </div>
            </div>
    );
}
 
export default Input;