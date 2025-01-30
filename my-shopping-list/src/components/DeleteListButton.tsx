// DeleteListButton.tsx
import { useRef } from "react";
import { IconTrash } from "@tabler/icons-react";
import List from "@/app/core/list/List";
import ModalConfirm from "@/components/ModalConfirm";
import { useDeleteList } from "@/hooks/useDeleteList";

interface DeleteListButtonProps {
  list: List;
  token: string;
}

export default function DeleteListButton({
  list,
  token,
}: DeleteListButtonProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { deleteListByID } = useDeleteList();

  function openModal() {
    modalRef.current?.showModal();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await deleteListByID(String(list.list_id), token);
    modalRef.current?.close();
    window.location.reload();
  }

  return (
    <>
      <button className="btn btn-error w-full text-white" onClick={openModal}>
        <IconTrash size={24} strokeWidth={2} color={"white"} />
        Delete
      </button>

      <ModalConfirm ref={modalRef} title="Confirm Delete">
        <form method="dialog" onSubmit={handleSubmit}>
          <p className="py-4 text-white">
            Are you sure you want to delete this list?
          </p>
          <div className="flex justify-end gap-3">
            <button type="submit" className="btn btn-error">
              Confirm
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => modalRef.current?.close()}
            >
              Close
            </button>
          </div>
        </form>
      </ModalConfirm>
    </>
  );
}
