import React, { useRef } from 'react';
import { useOutsideClick } from '../../../hooks';
import './modal.scss';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = (props: Props) => {
  const { children, onClose } = props;
  const ref: React.MutableRefObject<any> = useRef(null);
  useOutsideClick(ref, () => onClose());

  return (
    <div className="modal">
      <div className="modal-wrapper" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
