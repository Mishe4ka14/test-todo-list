import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';
import { useEffect, useState } from 'react';

const modalRoot = document.getElementById('modal-root');



const Modal = ({ onClose } : any): JSX.Element => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlerClose = () => {
    setPopupOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  
  const escClose = (e: Event & { key: string }) => {
    if (e.key === 'Escape') {
      handlerClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escClose);
    return () => {
      document.removeEventListener('keydown', escClose);
    };
  });

  return ReactDOM.createPortal(
  (
   <>
    <ModalOverlay closeModal={(() => handlerClose())}/>
    <div className={styles.container}>
      <div className={styles.close}>
        <img onClick={(() => handlerClose())}/>
      </div>
      <h2>Редактировать</h2>
      <div className={styles.box}>
        <div>
          <h3>Название</h3>
          <input placeholder='Название задачи'></input>
        </div>
          <p>Описание</p>
          <input placeholder='Название задачи'></input>
        <div></div>
        <button>Сохранить</button>
      </div>
    </div>
  </>
  ), modalRoot as HTMLElement,
);
};

export default Modal;