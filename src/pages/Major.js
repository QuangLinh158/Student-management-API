import React, {useState, useEffect} from "react";
import majorService from "../services/majorService";
import Input from "../components/Input";
import { toast } from 'react-toastify';
import ModalDisplay from "../components/ModalDisplay";
import { useFormik } from "formik";
import * as Yup from 'yup';
import CustomButton from "../components/CustomButton";
import {Pagination} from 'react-bootstrap';
import { DebounceInput } from "react-debounce-input";
const Major = (props) => {
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
    //============== getListMajor ================
    const [majors, setMajors] = useState([]);
    const loadData = () => {
        // majorService.list().then((res) => {
        //     setMajors(res.data);
        // });
        majorService.getPaging(page, pageLength, search).then((res) => {
            setMajors(res.data);
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

    //================ Modal-Save & Edit ====================
    const [major, setMajor] = useState({ id: 0, name: "" });
    const [modalShow, setModalShow] = useState();
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    
    //showModale Save-Edit
    const showModalHandler = (e,id) => {
        e.preventDefault();
        if( id > 0 ){
            majorService.get(id).then((res) => {
                formik.setValues(res.data);
                handleModalShow();
            });
        }
        else{
            formik.resetForm();
            handleModalShow();
        }
    };
    //get value input
    // const handleChange = (e) => {
    //     const newData = { ...major }; // phân rã major ra
    //     newData[e.target.name] = e.target.value; // gán name bằng giá trị mới
    //     setMajor(newData);// sau đó set lại major của data
    // };

    //validation
    const formik = useFormik({
        initialValues: {
            id: 0,
            name:"",
        },
        validationSchema: Yup.object({
            id: Yup.number().required(),
            name: Yup.string().required("Required").min(5, ">= 5 characters"),
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
            majorService.add(data).then((res) => {
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
            majorService.update(data.id, data).then((res) => {
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
            majorService.get(id).then((res) => {
                setMajor(res.data);
                handleModalDlShow();
            });
        }
        else{
            setMajor({id:0, name:""});
            handleModalDlShow();
        }
    }
    //deleteMajor
    const handleDelete = (e) => {
        e.preventDefault();
        majorService.delete(major.id).then((res) => {
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
        
    <div className="container mt-4">
        <div className="card border-primary bt-5">
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h3 className="card-title">Major <small className="text-muted">list</small></h3>
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
                                <th>Major Name</th>
                                <th style={{width: '80px'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {majors.map((major,idx) => (
                                <tr key={major.id}>
                                <td>{idx + 1}</td>
                                <td>{major.name}</td>
                                <td>
                                    <a href="/#" onClick={(e) => showModalHandler(e, major.id)}><i className="bi-pencil-square text-primary"></i></a>
                                    <a href="/#" onClick={(e) => showModalDlHandler(e, major.id)}><i className="bi-trash text-danger"></i></a>
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
        title={`${ formik.values.id > 0 ? 'Edit' : 'New' } Major`}
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
                <Input 
                    type="text"
                    label="Major name" 
                    id="textMajorName" 
                    frmField={formik.getFieldProps("name")}
                    err={formik.touched.name && formik.errors.name}
                    errMessage={formik.errors.name}
                    lastRow
                    required
                    // name="name" 
                    // onChange={handleChange} 
                    // defaultValue={major.name} 
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
            <p>Bạn có muốn xóa <span className="text-danger">{major.name}</span> không ?</p>
        }
      />
    </div>
  );
}

export default Major;
