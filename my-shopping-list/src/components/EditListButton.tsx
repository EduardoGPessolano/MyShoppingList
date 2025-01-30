import { useRef } from "react";
import { IconEdit } from "@tabler/icons-react";
import { useUpdateList } from "@/hooks/useUpdateList";
import { ModalForm } from "@/components/ModalForm";
import List from "@/app/core/list/List";
import useList from "@/hooks/useList";

interface EditListButtonProps {
  list: List; // lista atual a ser editada
  token: string;
}

export default function EditListButton({ list, token }: EditListButtonProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { updateListByID } = useUpdateList();

  function openModal() {
    modalRef.current?.showModal();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedList: Partial<List> = {};

    if (formData.get("listName") !== "") {
      updatedList.name = formData.get("listName") as string;
    }
    if (formData.get("description") !== "") {
      updatedList.description = formData.get("description") as string;
    }
    if (formData.get("image") !== "") {
      updatedList.icon = formData.get("image") as string;
    }
    const dueDate = formData.get("date") as string;
    if (
      dueDate &&
      new Date(dueDate).toISOString() !== new Date(list.due).toISOString()
    ) {
      updatedList.due = new Date(dueDate);
    }

    await updateListByID(String(list.list_id), updatedList, token);
    modalRef.current?.close();
    window.location.reload();
  }

  return (
    <>
      <button className="btn btn-neutral w-full text-white" onClick={openModal}>
        <IconEdit size={24} strokeWidth={2} color={"white"} />
        Edit
      </button>

      <ModalForm ref={modalRef} title="Edit List">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="list-name" className="block mb-2 text-white">
              List Name
            </label>
            <input
              id="list-name"
              name="listName"
              type="text"
              style={{ color: "white" }}
              className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
              placeholder={list.name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="list-description" className="block mb-2 text-white">
              Description
            </label>
            <input
              id="list-description"
              name="description"
              type="text"
              style={{ color: "white" }}
              className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
              placeholder={list.description}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="list-date" className="block mb-2 text-white">
              Date
            </label>
            <input
              id="list-date"
              name="date"
              type="date"
              style={{ color: "gray" }}
              className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
              defaultValue={new Date(list.due).toISOString().split("T")[0]}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="list-image" className="block mb-2 text-white">
              Image
            </label>
            <input
              id="list-image"
              name="image"
              type="text"
              style={{ color: "white" }}
              className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
              placeholder={list.icon}
            />
          </div>
          <div className="modal-action flex justify-end gap-2">
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn btn-outline btn-error"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary border-blueish bg-blueish hover:bg-blueish/80 hover:border-blueish"
            >
              Save
            </button>
          </div>
        </form>
      </ModalForm>
    </>
  );
}
