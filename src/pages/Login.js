import Input from '../components/Input'; 
import React,{ useState, useEffect } from 'react';

import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import ActionTypes from '../store/actions';
import { useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton';

const Login = (props) => {
    //============== Waiting ====================
    const [isWaiting, setIsWaiting] = useState(false);
    const [message, setMessage] = useState("");// useState là một hook cho phép chúng ta quản lý các state trong một functional component 
    const usernameRef = React.useRef(); // tạo ra refs
    const userpasswordRef = React.useRef(); // tạo ra refs

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginAction = (token, userInfo) => {
        dispatch({
            type: ActionTypes.LOGIN_USER,
            token: token,
            currentUser: userInfo,
        });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault(); // dùng để chặn hành động mặc định(thì nó không refresh cái form lại)
        const username = usernameRef.current.value; // lấy giá trị name hiện tại trong input
        const password = userpasswordRef.current.value; // lấy giá trị password hiện tại trong input
        // if(username === "admin" && password === "123456")
        // {
        //     setMessage("Good!");
        // }
        // else{
        //     setMessage("Wrong!");
        // }
        setIsWaiting(true);
        userService.login(username,password).then((res) =>{
            setIsWaiting(false);
            if(res.errorCode === 0){
                setMessage("");
                handleLoginAction(res.data.accessToken, res.data);
                navigate("/home");
            }
            else{
                setMessage("Wrong username or password !");
            }
        });

    }

    /*(uef) useEffect được chuyển từ componentDidmount qua. nếu refresh 
    trang lại thì nó tự trỏ vào input đầu tiên mà không cần click vào.*/
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    return(
        <>
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-sm-8 col-lg-5">
                    <div className="card bg-primary">
                        <div className="card-header text-white">
                            <h4 className="card-title mb-0"><i className="bi-grid-3x3-gap-fill"></i> Login</h4>
                        </div>
                        <div className="card-body bg-white rounded-bottom">

                            <p className=' text-center text-danger'>{message}</p>

                            <form onSubmit={formSubmitHandler}>

                                <Input label="UserName" inputRef={usernameRef} type="text" id="name"  placeholder="Enter your name..." required/>
                                <Input label="PassWord" inputRef={userpasswordRef} type="password" id="password" placeholder="Enter your password..." required/>
                                {/* <Input label="UserNote" id="note" rows="3"  placeholder="Enter your note..."/> */}
                                <div className="row">
                                    <div className="offset-sm-3 col-auto">
                                        {/* <button type="submit" className="btn btn-primary">Sign in</button> */}
                                        <CustomButton 
                                            type="submit"
                                            color="primary"
                                            isLoading={isWaiting}
                                        >Sign in</CustomButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;