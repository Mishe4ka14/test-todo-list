import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';
import { useEffect, useState } from 'react';
import { ITodo } from '../../services/types/types';

const modalRoot = document.getElementById('modal-root');

interface ModalProps {
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  todo: ITodo | null;
}

const Modal = ({ onClose, onSave, todo } : ModalProps): JSX.Element => {

  // если модалка для редактирования - добавляем значения, если для добавления - пустые
  const [title, setTitle] = useState(todo ? todo.title : '')
  const [description, setDescription] = useState(todo ? todo.description : '')

  const [isPopupOpen, setPopupOpen] = useState(false);


  // обработчики на закрытие модалки
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

  const handleSave = () => {
    if (title && description) {
      onSave(title, description);
    }
  };
  
  return ReactDOM.createPortal(
  (
   <>
    <ModalOverlay closeModal={(() => handlerClose())}/>
    <div className={styles.container}>
      <div className={styles.close}>
        <img onClick={(() => handlerClose())}/>
      </div>
      <h2>{ todo ? 'Редактировать' : 'Добавить'}</h2>
      <div className={styles.box}>
        <div>
          <h3>Название</h3>
          <input 
            className={styles.input}
            placeholder='Название задачи' 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <h3>Описание</h3>
          <textarea 
            className={styles.input}
            placeholder='Описание задачи'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type='submit' className={styles.save_btn} onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  </>
  ), modalRoot as HTMLElement,
);
};

export default Modal;