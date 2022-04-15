import React from 'react';

const SelectInput = (props) => {
    const { value,optionn, opselect, opvalue,id,label,labelSize,frmField, ...others} = props;
    const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
    return ( 
        <div className='row mb-3'>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <div className='col-sm'>
                <select id={id} {...others} {...frmField} className="form-select" aria-label="Default select example">
                    {/* <option selected {...others} {...frmField}>{opselect}</option>
                    <option value={value} {...others} {...frmField}>{opvalue}</option> */}
                    {optionn}
                </select>
            </div>
        </div>
     );
}
 
export default SelectInput;