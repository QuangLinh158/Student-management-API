import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import ModalDisplay from "../components/ModalDisplay";
import Input from "../components/Input";
import RadioBtn from '../components/RadioBtn';
import { useFormik } from "formik";
import * as Yup from 'yup';
import studentService from './../services/studentService';
import SelectInput from '../components/SelectInput';
import majorService from './../services/majorService';
import CustomButton from '../components/CustomButton';

const Student = () => {

    //============== Waiting ====================
    const [isWaiting, setIsWaiting] = useState(false);
    //============== getlist ===============
    const [students, setStudents] = useState([]);
    const loadData = () => {
        studentService.list().then((res) => {
            setStudents(res.data);
        });
    };
    useEffect(() => {
        loadData();
    }, []);
    //=========== get major id ================
    const [major, setMajor] = useState([]);
    const loadMajor = () => {
        majorService.list().then((res) => {
            setMajor(res.data);
        });
    };
    useEffect(() => {
        loadMajor();
    }, []);
    //============== Modal-Save & Edit ================
    const [student, setStudent ] = useState({
        id:0,
        stuId:"",
        firstName:"",
        lastName:"",
        gender: 0,
        phone:"",
        email:"",
        majorId:0,
    });
    const [modalShow, setModalShow] = useState();
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    //showModale Save-Edit
    const showModalHandler = (e,id) => {
        e.preventDefault();
        if( id > 0 ){
            studentService.get(id).then((res) => {
                // setInstructorr(res.data);
                formik.setValues(res.data);
                handleModalShow();
            });
        }
        else{
            // setInstructorr({id:0, name:""});
            formik.resetForm();
            handleModalShow();
        }
    };
    const radioChange = (e) => {
        // const newInstructor = {...instructorr};
        // newInstructor[e.target.name] = parseInt(e.target.value);
        // setInstructorr(newInstructor);
        formik.setFieldValue("gender", parseInt(e.target.value));
        // console.log(e.target.value);
    };
    //validation
    const formik = useFormik({
        initialValues:{
            id:0,
            stuId:"",
            firstName:"",
            lastName:"",
            gender: 0,
            phone:"",
            email:"",
            majorId:0,
        },
        validationSchema: Yup.object({
            id: Yup.number().required(),
            stuId: Yup.string().required("Required").min(5, ">= 5 characters"),
            firstName: Yup.string().required("Required").min(5, ">= 5 characters"),
            lastName: Yup.string().required("Required").min(5, ">= 5 characters"),
            gender: Yup.number().required(),
            phone: Yup.string().required("Required").min(5, ">= 5 characters"),
            email: Yup.string().required("Required").min(5, ">= 5 characters"),
            majorId: Yup.number().required(),
        }),
        onSubmit: (values) => {
            handleSave(values);
        },
    });

    //Save-Edit function
    const handleSave = (data) => {
        //them major
        setIsWaiting(true);
         if(data.id === 0){
            studentService.add(data).then((res) => {
                setIsWaiting(false);
                if(res.errorCode === 0){
                   loadData();
                   handleModalClose();
                   toast.success("Add successful");
                } else toast.error(res.message);
            })
         }
         else{
             //updateMajor
            studentService.update(data.id, data).then((res) => {
                setIsWaiting(false);
                if(res.errorCode === 0){
                    loadData();
                    handleModalClose();
                   toast.success("Update successful");
                 } else toast.error(res.message);
            })
         }
    };

   //================= ModalDelete ==================
   const [modalDlShow, setModalDlShow] = useState();
   const handleModalDlClose = () => setModalDlShow(false);
   const handleModalDlShow = () => setModalDlShow(true);
   //showModel
   const showModalDlHandler = (e,id) => {
       if (e) e.preventDefault();
       if( id > 0 ){
           studentService.get(id).then((res) => {
               setStudent(res.data);
               handleModalDlShow();
           });
       }
       else{
           setStudent({id:0,
            stuId:"",
            firstName:"",
            lastName:"",
            gender: 0,
            phone:"",
            email:"",
            majorId:0,
        });
           handleModalDlShow();
       }
   }
   //deleteInstructor
   const handleDelete = (e) => {
       e.preventDefault();
       studentService.delete(student.id).then((res) => {
           if(res.errorCode === 0){
               loadData();
               handleModalDlClose();
               toast.success("Delete successful");
           }
           else{
               toast.error("Delete failed");
           }
       });
   };



    return ( 
        <>
    <div className="container mt-4">
        <div className="card border-primary bt-5">
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h3 className="card-title">Student <small className="text-muted">list</small></h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={(e) => showModalHandler(e, 0)}><i className="bi-plus-lg"></i> Add</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered border-primary table-hover table-striped">
                        <thead>
                            <tr className="table-primary border-primary">
                                <th style={{width: '50px'}}>#</th>
                                <th>Student Id</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Major Id</th>
                                <th style={{width: '80px'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((stude, idx) => (
                                <tr key={stude.id}> 
                                    <td>{idx + 1}</td>
                                    <td>{stude.stuId}</td>
                                    <td>{`${stude.lastName} ${stude.firstName}`}</td>
                                    <td><i className={`bi bi-gender-${stude.gender === 0 ? 'male' : 'female'}`}></i></td>
                                    <td>{stude.phone}</td>
                                    <td>{stude.email}</td>
                                    <td>{stude.majorId}</td>
                                    <td>
                                    <a href="/#" onClick={(e) => showModalHandler(e, stude.id)}><i className="bi-pencil-square text-primary"></i></a>
                                    <a href="/#" onClick={(e) => showModalDlHandler(e, stude.id)}><i className="bi-trash text-danger"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
    {/* ============== Modal =============== */}
      <ModalDisplay show={modalShow}
        onHide={handleModalClose}
        title={`${ formik.values.id > 0 ? 'Edit' : 'New' } Student`}
        btn1={
            <CustomButton
                color="secondary" 
                onClick={handleModalClose}
            >Close</CustomButton>
        }
        btn2={
            <CustomButton
                color="primary" 
                disabled={!formik.dirty || !formik.isValid || isWaiting}
                onClick={formik.handleSubmit}
                isLoading={isWaiting}
            >Save</CustomButton>
        }
        body = {
            <form>
                <Input label="Instructor Id" id="textInstructorCode" 
                    // name="code" onChange={handleChange} defaultValue={instructorr.code}  
                    frmField={formik.getFieldProps("stuId")}
                    err={formik.touched.stuId && formik.errors.stuId}
                    errMessage={formik.errors.stuId}
                />
                <Input label="First name" id="textInstructorfirstName" 
                    // name="firstName" onChange={handleChange} defaultValue={instructorr.firstName} 
                    frmField={formik.getFieldProps("firstName")}
                    err={formik.touched.firstName && formik.errors.firstName}
                    errMessage={formik.errors.firstName}
                />
                <Input label="Last name" id="textInstructorlastName" 
                    // name="lastName" onChange={handleChange} defaultValue={instructorr.lastName} 
                    frmField={formik.getFieldProps("lastName")}
                    err={formik.touched.lastName && formik.errors.lastName}
                    errMessage={formik.errors.lastName}
                />
                <div className='mb-3'>
                    <label className='col-sm-3'>Gender</label>
                    <RadioBtn label="Male" id="RadioMale" 
                        // name="gender"  value="0" 
                        checked={formik.values.gender===0}
                        defaultValue={0}
                        onClick={radioChange}
                    />
                    <RadioBtn label="FeMale" id="RadioFeMale" 
                        // name="gender"  value="1" 
                        checked={formik.values.gender===1}
                        defaultValue={1}
                        onClick={radioChange}
                    />
                </div>
                <Input label="Phone" id="textInstructorPhone" 
                    // name="phone"  onChange={handleChange} defaultValue={instructorr.phone}
                    frmField={formik.getFieldProps("phone")}
                    err={formik.touched.phone && formik.errors.phone}
                    errMessage={formik.errors.phone}
                />
                <Input label="Email" id="textInstructorEmail" 
                    // name="email"  onChange={handleChange} defaultValue={instructorr.email}
                    frmField={formik.getFieldProps("email")}
                    err={formik.touched.email && formik.errors.email}
                    errMessage={formik.errors.email}
                />
                <SelectInput 
                    label="Major name"
                    opselect = "Chon major"
                    // value = "1"
                    // opvalue = "1"
                    frmField={formik.getFieldProps("majorId")}
                    optionn={
                        major.map((item)=>{
                            return(
                                <option value={item.id}>{item.name}</option>
                            )
                        })
                    }
                 />
            </form>
            }
        />

            <ModalDisplay show={modalDlShow}
            onHide={handleModalDlClose}
            title="Chú ý"
            btn1={
                <CustomButton
                    color="secondary" 
                    onClick={handleModalClose}
                >Close</CustomButton>
            }
            btn2={
                <CustomButton
                    color="primary" 
                    onClick={handleDelete}
                >Delete</CustomButton>
            }
            body = {
            <p>Bạn có muốn xóa <span className="text-danger">{`${student.firstName} ${student.lastName}`}</span> không ?</p>
            }
        />
        </div>
        </>
     );
}
 
export default Student;