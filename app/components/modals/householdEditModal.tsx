import React, { useContext, useRef } from "react";

import { db } from "../../firebase/clientApp";
import { updateDoc, doc } from "firebase/firestore";

import AlertContext from "../../context/alertProvider";
import { useDocumentData } from "react-firebase-hooks/firestore";

interface HouseholdEditModalProps {
  houseId: any;
}

const HouseholdEditModal = (props: HouseholdEditModalProps) => {
  const alert = useContext(AlertContext);

  const [houseData, loading, error] = useDocumentData(
    doc(db, "household", props.houseId)
  );

  const modalRef = useRef<HTMLInputElement>(null);

  const handleHouseEditSubmit = async (event: any) => {
    event.preventDefault();

    const newHouseName = event.target.elements.newHouseName.value;
    const newHouseDesc = event.target.elements.newHouseDesc.value;

    if (modalRef.current !== null) {
      modalRef.current.checked = !modalRef.current.checked;
    }

    // Dont submit if no changes are made
    try {
      await updateDoc(doc(db, "household", props.houseId), {
        name: newHouseName,
        desc: newHouseDesc,
      });
      alert?.success("Household Details Changed!", 5);
    } catch (error) {
      alert?.error("Error!: " + error, 5);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="edit-house-modal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-house-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-xl font-bold">Edit Household Details</h3>
          <p className="py-4">Edit details of your home below.</p>
          <form onSubmit={handleHouseEditSubmit} action="#" id="createHouse">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">House Name</span>
                <span className="label-text-alt">(Required)</span>
              </label>
              <input
                id="newHouseName"
                name="newHouseName"
                type="text"
                placeholder={houseData?.name}
                className="input input-bordered"
                required
              />
            </div>
            <br />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description (Optional)</span>
                <span className="label-text-alt">Maximum 50 words</span>
              </label>
              <textarea
                id="newHouseDesc"
                name="newHouseDesc"
                className="textarea textarea-bordered h-24"
                placeholder={houseData?.desc}
                maxLength={50}
              ></textarea>
            </div>
            <br />
            <div className="min-w-full flex place-content-center">
              <input
                id="submitEditHouse"
                className="btn"
                type="submit"
                value="edit"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HouseholdEditModal;
