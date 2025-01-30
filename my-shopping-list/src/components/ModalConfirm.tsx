// ModalConfirm.tsx
import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";

interface ModalConfirmProps {
  children: ReactNode;
  title: string;
}

const ModalConfirm = forwardRef<HTMLDialogElement, ModalConfirmProps>(
  ({ children, title }, ref) => {
    const internalRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      showModal: () => internalRef.current?.showModal(),
      close: () => internalRef.current?.close(),
    }));

    return (
      <dialog ref={internalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-white mb-3">{title}</h3>
          {children}
          <div className="modal-action"></div>
        </div>
      </dialog>
    );
  }
);

export default ModalConfirm;
