import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import ContactCard from "./components/ContactCard";

import UpdateContact from "./components/UpdateContact";
import useDisclose from "./hooks/useDisclose";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const getContacts = async () => {
    try {
      const contactRef = collection(db, "contacts");
      onSnapshot(contactRef, (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
        return contactLists;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div className="max-w-[370px] mx-auto bg">
        <Navbar />
        <div className="flex items-center gap-2 ">
          <div className="flex relative items-center flex-grow">
            <FiSearch className=" ml-1 absolute  text-white text-3xl" />
            <input
              type="text"
              className="h-12 flex-grow  border bg-transparent border-white rounded-md pl-9 text-white"
            />
          </div>
          <div>
            <CiCirclePlus
              onClick={onOpen}
              className="text-black cursor-pointer bg-dark-yellow rounded-xl text-5xl stroke-[1] "
            />
          </div>
        </div>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <UpdateContact isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default App;
