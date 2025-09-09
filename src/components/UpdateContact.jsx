import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const UpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const upDate = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  Name: contact.Name,
                  email: contact.email,
                }
              : { Name: "", email: "" }
          }
          onSubmit={(val) => {
            isUpdate ? upDate(val, contact.id) : addContact(val);
          }}
        >
          <Form className="max-w-[370px] mx-auto  gap-3 flex flex-col">
            <div className="flex gap-1 flex-col">
              <label htmlFor="Name">Name</label>
              <Field name="Name" className="border h-8" />
              <div className="text-red-500">
                <ErrorMessage name="Name" />
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <label htmlFor="email">Email</label>
              <Field name="email" className="border h-8" />
              <div className="text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange self-end p-2 rounded-lg border"
            >
              {isUpdate ? "Update" : " add contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default UpdateContact;
