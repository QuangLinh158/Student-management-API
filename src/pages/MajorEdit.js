import React,{ useState, useEffect } from 'react';//imrse
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import majorService from '../services/majorService';
const MajorEdit = () => {
    //tạo useState để lấy id của href ra
    const [Id, setId] = useState(0);
    
    //dùng navigate để chuyển trang
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/major");
    }

    //làm việc với input lấy ra giá trị input ra
    const [major, setMajor] = useState({ id:0, name:""});
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        const newData = { ...major }; // phân rã major ra
        newData[e.target.name] = e.target.value; // gán name bằng giá trị mới
        setMajor(newData);// sau đó set lại major của data
    }
    const handleSave = (e) => {
        //them major
         if(major.id === 0){
            majorService.add(major).then((res) => {
                if(res.errorCode === 0){
                    navigate("/major");
                }
                else{
                   setMessage(res.message);
                }
            })
         }
         else{
             //updateMajor
            majorService.update(major.id, major).then((res) => {
                if(res.errorCode === 0){
                    navigate("/major");
                }
                else{
                   setMessage(res.message);
                }
            })
         }
    };

    //lấy id của đường dẫn ra
    useEffect(() => {
        const lastSlashIdx = window.location.href.lastIndexOf("/"); //lastIndexOf lấy vị trí cuối cùng của chuỗi
        setId(window.location.href.substring(lastSlashIdx + 1));//substring(27 + 1) là 28 sẽ lấy ra được id
    }, []);

    //lay dulieu tu list qua update
    const param = useParams();
    useEffect(() => {
        if(param.id > 0) {
            majorService.get(param.id).then((res) => {
                setMajor(res.data);
            })
        }
    }, [param.id]);

    return ( 
        <>
        <div className="container mt-4">
            <div className='row justify-content-center'>
                <div className='col-lg-8'>
                    <div className="card border-primary bt-5">
                        <div className="card-header">
                            <h3 className="card-title">Major <small className="text-muted">{Id > 0 ? "Edit" : "New"}</small></h3>
                        </div>
                    <div className="card-body">
                        <p className='text-center text-danger'>{message}</p>
                        <form>
                            <Input label="Major name" id="textMajorName" name="name" onChange={handleChange} defaultValue={major.name} />
                        </form>
                    </div>
                    <div className='card-footer'>
                            <div className='text-center'>
                                <button type="button" className="btn btn-secondary" onClick={handleBack} >Back</button>
				                <button type="button" className="btn btn-primary" onClick={handleSave} >Save</button>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default MajorEdit;