import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../signupForm';
import LoginForm from '../loginForm';
import './navbar.css';

import Auth from '../../utils/auth';

const AppNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

 const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <>
     <Navbar expand="md" collapseOnSelect>
        <Container fluid>
          <div className="header-content">
            <Navbar.Brand as={Link} to='/'>
              Mindfulness Memoir
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar'>
              <Nav className='ml-auto'>
                <Nav.Link as={Link} to='/resources'>
                  Resources
                </Nav.Link>
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to='/myDaily'>
                      Daily Checklist
                    </Nav.Link>
                    <Nav.Link as={Link} to='/myJournal'>
                      My Journal
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link onClick={openLoginModal}>Login</Nav.Link>
                    <Nav.Link onClick={openSignupModal}>Sign Up</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

      <Modal
        show={showLoginModal}
        onHide={closeLoginModal}
        centered
        aria-labelledby='login-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='login-modal'>Login to Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleModalClose={closeLoginModal} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showSignupModal}
        onHide={closeSignupModal}
        centered
        aria-labelledby='signup-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='signup-modal'>Create a New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm handleModalClose={closeSignupModal} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
