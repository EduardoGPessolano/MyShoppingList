import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
}

export const ModalForm = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, title }, ref) => {
    const internalRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLDialogElement);

    function closeModal() {
      internalRef.current?.close();
    }

    return (
      <dialog ref={internalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-white mb-3">{title}</h3>
          {children}
        </div>
      </dialog>
    );
  }
);
