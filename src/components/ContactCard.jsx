import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import UpdateContact from "./UpdateContact";
import useDisclose from "../hooks/useDisclose";
const ContactCard = ({ contact, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-yellow flex justify-between items-center mt-4 rounded-xl p-1">
        <div className=" flex items-center gap-3">
          <HiOutlineUserCircle className="text-4xl text-orange" />
          <div className="">
            <h2 className="font-medium">{contact.Name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>

        <div className="flex gap-1 text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => {
              deleteContact(contact.id); // removes from Firestore
              onDelete(contact.id); // removes from local state
            }}
            className="mr-1 cursor-pointer text-orange"
          />
        </div>
      </div>
      <UpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
