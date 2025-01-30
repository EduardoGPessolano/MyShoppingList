"use client";
import { useRef } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useAddList } from "@/hooks/useAddList";
import { ModalForm } from "@/components/ModalForm";
import List from "@/app/core/list/List";

interface AddListsButtonProps {
  user_id: string;
  token: string;
}
export default function AddListsButton({
  user_id,
  token,
}: AddListsButtonProps) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const modalRef = useRef<HTMLDialogElement>(null);
  const { addList } = useAddList();

  function openModal() {
    modalRef.current?.showModal();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("listName") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("image") as string;
    const due = new Date((formData.get("date") as string).split("T")[0]);
    const createdBy = Number(user_id);
    const numItems = 0;
    const items: never[] = [];

    const newList: Omit<List, "ListID"> = {
      name,
      description,
      createdBy,
      icon,
      numItems,
      due,
      items,
    };

    const result = await addList(newList, token);

    modalRef.current?.close();
    window.location.reload();
  }

  return (
    <>
      <button className="btn btn-neutral mr-20" onClick={openModal}>
        <IconPlus size={28} stroke={1} /> Add list
      </button>

      <ModalForm ref={modalRef} title="Add New List">
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
              placeholder="Enter list name"
              required
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
              placeholder="Enter a description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="list-date" className="block mb-2 text-white">
              Date
            </label>
            <input
              id="list-date"
              name="date"
              style={{ color: "white" }}
              type="date"
              className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
              required
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
              placeholder="Enter an image URL"
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
