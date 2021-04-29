import React, { useState } from 'react';
import '../css/Modal.scss';
import '../pages/SecondPage';

const Modal = ({ isOpen, close, cancel, price }) => {

  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={cancel} />
        <div className="Modal">
          <p className="title">
                <b>{price}원</b>
          </p>
          <div className="content">
            <p>
                이체를 진행하시겠습니까?
    	    </p>
          </div>
          <div className="button-wrap">
            <button onClick={close}>확인</button>
            <button onClick={cancel}>취소</button>
          </div>
        </div>
      </React.Fragment>
      :
      null
    }
    </React.Fragment>
  )
}
export default Modal