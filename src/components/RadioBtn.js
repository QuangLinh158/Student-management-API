import React from 'react'; //imcr

// đây là component có thể tái sử dụng ở các form khác
const RadioBtn = (props) => {
    
    //đây là cái props chứa các thuộc tính của component cần tái sử dụng.
    //...others là cái refs là những thuộc tính bên ngoài truyền vào là thì sẽ vào cái mảng others.
    const  {id, label,value, ...others} = props;

    // const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
    return (
        <div className="form-check form-check-inline mx-2">
            <input className="form-check-input" type="radio" id={id} value={value} {...others}/>
            <label className="form-check-label" htmlFor={id} {...others}>{label}</label>
        </div>
    );
}
 
export default RadioBtn;