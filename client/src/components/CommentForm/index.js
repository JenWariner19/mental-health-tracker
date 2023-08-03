import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Modal } from 'react-bootstrap';
import SignUpForm from '../signupForm';
import LoginForm from '../loginForm';


import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';


const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const [addComment, { error }] = useMutation(ADD_COMMENT);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Join the Conversation: Comment Below</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2"> {error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical', padding:'3px' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link onClick={openLoginModal}>login</Link> or <Link onClick={openSignupModal}>signup.</Link>
        </p>
      )}
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
    </div>
    
  );
};

export default CommentForm;
