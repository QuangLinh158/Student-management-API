import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Container from './../../node_modules/react-bootstrap/esm/Container';
// import NavLink from './../../node_modules/react-bootstrap/esm/NavLink';
import { useSelector, useDispatch } from 'react-redux';
import ActionTypes from '../store/actions';
//b3. tạo navbar găn link trỏ đến các pages
const Header = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.auth.currentUser);
    const logoutAction = (e) => {
		e.preventDefault();
		dispatch({
			type: ActionTypes.LOGOUT_USER,
		});
	};
	return ( 
    // <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
	//   <div className="container">

	// 	<Link className="navbar-brand" to="/">Student Management</Link>

	// 	<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	// 	  <span className="navbar-toggler-icon"></span>
	// 	</button>
	// 	<div className="collapse navbar-collapse" id="navbarNav">
	// 	  <ul className="navbar-nav me-auto">
	// 		<li className="nav-item">
	// 		  <Link className="nav-link" to="/major">Major</Link>
	// 		</li>
	// 		<li className="nav-item">
	// 		  <Link className="nav-link" to="/instructor">Instructor</Link>
	// 		</li>
	// 		<li className="nav-item">
	// 		  <Link className="nav-link" to="/student">Student</Link>
	// 		</li>
	// 	  </ul>
	// 	  <ul className="navbar-nav">
	// 			<li className="nav-item">
	// 				<a className="nav-link" href="/#">welcome to ... </a>
	// 			</li>
	// 			<li className="nav-item">
	// 				<a className="nav-link" href="/#"><i className="bi-box-arrow-right"></i></a>
	// 			</li>
	// 		</ul>
	// 	</div>
	//   </div>
	// </nav>
	<Navbar bg="primary" variant='dark' expand="md">
  <Container>
    <Navbar.Brand as={Link} to="/">Student Management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/major">Major</Nav.Link>
        <Nav.Link as={NavLink} to="/instructor">Instructor</Nav.Link>
        <Nav.Link as={NavLink} to="/student">Student</Nav.Link>
      </Nav>
	  <Nav>
	  	<Nav.Link href='/#'>Welcome to <strong>{userInfo.fullName}</strong></Nav.Link>
		<Nav.Link onClick={ logoutAction }>
			<i className='bi-box-arrow-right'></i>
		</Nav.Link>
	  </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    );
}
 
export default Header;