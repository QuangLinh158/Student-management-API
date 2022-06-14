import React, {useState, useEffect} from 'react';
import instructorService from '../services/instructorService';
import { toast } from 'react-toastify';
import ModalDisplay from "../components/ModalDisplay";
import Input from "../components/Input";
import RadioBtn from '../components/RadioBtn';
import { useFormik } from "formik";
import * as Yup from 'yup';
import CustomButton from '../components/CustomButton';
import {Pagination} from 'react-bootstrap';
import { DebounceInput } from "react-debounce-input";
const Instructor = (props) => {
    //=================panigation============================
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [pagingItems, setPagingItems] = useState([]);
    const handleChangePageLength = (e) => {
        setPage(0);
        setPageLength(e.target.value);
    };
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    //============== Waiting ====================
    const [isWaiting, setIsWaiting] = useState(false);
    //============== getlist ===============
    const [instructor, setInstructor] = useState([]);
    const loadData = () => {
        instructorService.getPaging(page, pageLength, search).then((res) => {
            setInstructor(res.data);
            let items = [];
            const totalPages = res.pagingInfo.totalPages;
            if(totalPages > 1){
                items = [
                    <Pagination.Item key="first" onClick={() => setPage(0)}>
                        &laquo;
                    </Pagination.Item>,
                    <Pagination.Item key="prev" disabled={page === 0} onClick={() => setPage(page - 1)} >
                        &lsaquo;
                    </Pagination.Item>
                ];
            for(let i= 0; i< totalPages; i++){
                items.push(
                    <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)} >
                        {i+1}
                    </Pagination.Item>
                );
            };
            items.push(
                <Pagination.Item key="next" disabled={page === totalPages -1} onClick={() => setPage(page + 1)}>
                    &rsaquo;
                </Pagination.Item>,
                <Pagination.Item key="last" onClick={() => setPage(totalPages - 1)} >
                    &raquo;
                </Pagination.Item>
            );
            };
            setPagingItems(items);
        });
    };
    useEffect(() => {
        loadData();
    }, [page, pageLength, search]);

    //============== Modal-Save & Edit ================
    const [instructorr, setInstructorr ] = useState({
        id:0,
        code:"",
        firstName:"",
        lastName:"",
        gender: 0,
        phone:"",
        email:"",
    });
    const [modalShow, setModalShow] = useState();
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    //showModale Save-Edit
    const showModalHandler = (e,id) => {
        e.preventDefault();
        if( id > 0 ){
            instructorService.get(id).then((res) => {
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
    //get value input
    // const handleChange = (e) => {
    //     const newInstructor = { ...instructorr }; // phân rã major ra
    //     newInstructor[e.target.name] = e.target.value; // gán name bằng giá trị mới
    //     setInstructorr(newInstructor);// sau đó set lại major của data
    // };
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
            code:"",
            firstName:"",
            lastName:"",
            gender: 0,
            phone:"",
            email:"",
        },
        validationSchema: Yup.object({
            id: Yup.number().required(),
            code: Yup.string().required("Required").min(5, ">= 5 characters"),
            firstName: Yup.string().required("Required").min(5, ">= 5 characters"),
            lastName: Yup.string().required("Required").min(5, ">= 5 characters"),
            gender: Yup.number().required(),
            phone: Yup.string().required("Required").min(5, ">= 5 characters"),
            email: Yup.string().required("Required").min(5, ">= 5 characters"),
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
            instructorService.add(data).then((res) => {
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
            instructorService.update(data.id, data).then((res) => {
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
           instructorService.get(id).then((res) => {
               setInstructorr(res.data);
               handleModalDlShow();
           });
       }
       else{
           setInstructorr({id:0,
            code:"",
            firstName:"",
            lastName:"",
            gender: 0,
            phone:"",
            email:"",});
           handleModalDlShow();
       }
   }
   //deleteInstructor
   const handleDelete = (e) => {
       e.preventDefault();
       instructorService.delete(instructorr.id).then((res) => {
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
                        <h3 className="card-title">Instructor <small className="text-muted">list</small></h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={(e) => showModalHandler(e, 0)}><i className="bi-plus-lg"></i> Add</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row mb-2">
                    <div className="col">
                        <div className="row gx-1">
                            <label className=" col-form-label col-sm-auto ">Show</label>
                            <div className="col-sm-auto">
                                <select value={pageLength} style={{width:"80px"}}
                                    onChange={handleChangePageLength}
                                    className=" form-select shadow-none"
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <label className=" col-form-label col-sm-auto">entries</label>
                        </div>
                    </div>
                    <div className=" col-auto ">
                        <DebounceInput
                            className="form-control"
                            minLength={2}
                            debounceTimeout={300}
                            value={search}
                            onChange={handleChangeSearch}
                        />
                    </div>
                </div>
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
                                <th style={{width: '80px'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructor.map((instruc, idx) => (
                                <tr key={instruc.id}> 
                                    <td>{idx + 1}</td>
                                    <td>{instruc.code}</td>
                                    <td>{`${instruc.lastName} ${instruc.firstName}`}</td>
                                    <td><i className={`bi bi-gender-${instruc.gender === 0 ? 'male' : 'female'}`}></i></td>
                                    <td>{instruc.phone}</td>
                                    <td>{instruc.email}</td>
                                    <td>
                                    <a href="/#" onClick={(e) => showModalHandler(e, instruc.id)}><i className="bi-pencil-square text-primary"></i></a>
                                    <a href="/#" onClick={(e) => showModalDlHandler(e, instruc.id)}><i className="bi-trash text-danger"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination className="mt-3 mb-0 justify-content-end">
                    {pagingItems}
                </Pagination>
            </div>
        </div>

    {/* ============== Modal =============== */}
      <ModalDisplay show={modalShow}
        onHide={handleModalClose}
        title={`${ formik.values.id > 0 ? 'Edit' : 'New' } Instructor`}
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
                    frmField={formik.getFieldProps("code")}
                    err={formik.touched.code && formik.errors.code}
                    errMessage={formik.errors.code}
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
            </form>
        }
      />

    <ModalDisplay show={modalDlShow}
        onHide={handleModalDlClose}
        title="Chú ý"
        btn1={
            <CustomButton
                color="secondary" 
                onClick={handleModalDlClose}
            >Close</CustomButton>
        }
        btn2={
            <CustomButton
                color="primary" 
                onClick={handleDelete}
            >Delete</CustomButton>
        }
        body = {
            <p>Bạn có muốn xóa <span className="text-danger">{`${instructorr.firstName} ${instructorr.lastName}`}</span> không ?</p>
        }
      />
    </div>
        </>
     );
}
 
export default Instructor;