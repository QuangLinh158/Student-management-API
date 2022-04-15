import React,{ useState, useEffect} from 'react';
import Input from '../components/Input';
import { useNavigate, useParams } from 'react-router-dom';
import RadioBtn from '../components/RadioBtn';
import instructorService from '../services/instructorService';
const InstructorEdit = () => {
    const [Id, setId] = useState(0);
    const navigate = useNavigate();
    //lấy id của đường dẫn ra
    useEffect(() => {
        const lastSlashIdx = window.location.href.lastIndexOf("/"); //lastIndexOf lấy vị trí cuối cùng của chuỗi
        setId(window.location.href.substring(lastSlashIdx + 1));//substring(27 + 1) là 28 sẽ lấy ra được id
    }, []);

    //back
    const handleBack = () => {
        navigate("/instructor");
    }

    //inputRef
    const [instructor, setInstructor] = useState({
        id:0,
        code:"",
        firstName:"",
        lastName:"",
        gender: 0,
        phone:"",
        email:"",
    });
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        const newInstructor = {...instructor};
        newInstructor[e.target.name] = e.target.value;
        setInstructor(newInstructor);
    };
    const radioChange = (e) => {
        const newInstructor = {...instructor};
        newInstructor[e.target.name] = parseInt(e.target.value);
        setInstructor(newInstructor);
    }

    //param
    const param = useParams();
    useEffect(() => {
        if(param.id > 0){
            instructorService.get(param.id).then((res) => {
                setInstructor(res.data);
            });
        }
    }, [param.id]);

    const handleSave = (e) => {
        if(instructor.id === 0){
            instructorService.add(instructor).then((res) => {
                if(res.errorCode === 0){
                    navigate("/instructor");
                }
                else{
                    setMessage(res.message);
                }
            })
        }
        else{
            instructorService.update(instructor.id, instructor).then((res) => {
                if(res.errorCode === 0){
                    navigate("/instructor");
                }
                else{
                    setMessage(res.message);
                }
            })
        }
    }


    return ( 
        <>
        <div className="container mt-4">
            <div className='row justify-content-center'>
                <div className='col-lg-8'>
                    <div className="card border-primary bt-5">
                        <div className="card-header">
                            <h3 className="card-title">Instructor <small className="text-muted">{Id > 0 ? "Edit" : "New"}</small></h3>
                        </div>
                    <div className="card-body">
                        <p className='text-center text-danger'>{message}</p>
                        <form>
                            <Input label="Instructor Id" id="textInstructorCode" name="code" onChange={handleChange} defaultValue={instructor.code}  />
                            <Input label="First name" id="textInstructorfirstName" name="firstName" onChange={handleChange} defaultValue={instructor.firstName} />
                            <Input label="Last name" id="textInstructorlastName" name="lastName" onChange={handleChange} defaultValue={instructor.lastName} />
                            <div className='mb-3'>
                                <label className='col-sm-3'>Gender</label>
                                <RadioBtn label="Male" id="RadioMale" name="gender" onChange={radioChange} value="0" checked={instructor.gender===0}/>
                                <RadioBtn label="FeMale" id="RadioFeMale" name="gender" onChange={radioChange} value="1" checked={instructor.gender===1}/>
                            </div>
                            <Input label="Phone" id="textInstructorPhone" name="phone"  onChange={handleChange} defaultValue={instructor.phone}/>
                            <Input label="Email" id="textInstructorEmail" name="email"  onChange={handleChange} defaultValue={instructor.email}/>
                        </form>
                    </div>
                    <div className='card-footer'>
                            <div className='text-center'>
                                <button type="button" className="btn btn-secondary" onClick={handleBack} >Back</button>
				                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default InstructorEdit;