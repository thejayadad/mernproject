import React, { useState } from 'react';
import "./row.css"
import Modal from './modal'
import "./modal.css"
import Form from './form';

const Row = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  return (
    <div
    className='row'
    >
        <div>
            <h1>My Class</h1>
        </div>
        <div>
        <button className='modal-btn' onClick={openModal}>Add Subject</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Subject">
        <p>Fill out the fields below to add a subject</p>
        <Form />
      </Modal>
        </div>
    </div>
  )
}

export default Row