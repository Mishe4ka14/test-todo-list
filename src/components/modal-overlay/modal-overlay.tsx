import styles from './modal-overlay.module.scss';

const ModalOverlay = ({ closeModal }:{closeModal():void}) => (
  <div className={styles.overlay} onClick={closeModal}>
    </div>
);

export default ModalOverlay;