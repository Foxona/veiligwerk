/* eslint-disable @next/next/no-img-element */
import { UserType } from "@/types/usertype";
import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#table");

export function TableModal({
  modalIsOpen,
  setModalIsOpen,
  user,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  user: UserType;
}) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="User Card"
      >
        <div className="flex justify-center items-center">
          <img
            className="h-24 w-24 rounded-full"
            src={user.picture.thumbnail}
            alt={`${user.name.first} ${user.name.last}`}
          />
        </div>

        <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">
          {user.name.title} {user.name.first} {user.name.last}
        </h3>
        <div>
          <p className="text-sm text-gray-500">Email: {user.email}</p>
          <p className="text-sm text-gray-500">Phone: {user.phone}</p>
          <p className="text-sm text-gray-500">
            DOB: {new Date(user.dob.date).toLocaleDateString()}
          </p>
        </div>
        <div className="items-center py-3 w-full">
          <button
            id="ok-btn"
            className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
