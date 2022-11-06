import React, { useContext, useRef, useState } from "react";
import Image from "next/image";

import { db, storage } from "../../firebase/clientApp";
import { updateDoc, doc } from "firebase/firestore";

import AlertContext from "../../context/alertProvider";
import { useDocumentData } from "react-firebase-hooks/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
interface HouseholdEditModalProps {
  houseId: any;
}

export const householdEditModalId = "edit-house-modal";

const HouseholdEditModal = (props: HouseholdEditModalProps) => {
  const alert = useContext(AlertContext);
  const [imageUpload, setImageUpload] = useState<File | null>();
  const [imageError, setImageError] = useState(false);

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

  const handleImageUpload = (event: any) => {
    if (event.target.files) {
      if (event.target.files[0].size > 1000 * 1000) {
        setImageError(true);
      } else {
        setImageError(false);
        setImageUpload(event.target.files[0]);
      }
    }
  };

  // Handler that uploads user profile image and
  // updates user auth instance photoURL
  const handleImageSubmit = async (event: any) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `household/${props.houseId + v4()}`);
    await uploadBytes(imageRef, imageUpload);
    // Delete old profile pic
    if (houseData?.photoURL) {
      const oldImageRef = ref(storage, houseData?.photoURL);
      await deleteObject(oldImageRef);
    }
    const newPhotoLink = await getDownloadURL(imageRef);
    await updateDoc(doc(db, "household", props.houseId), {
      photoURL: newPhotoLink,
    });
    if (modalRef.current !== null) {
      modalRef.current.checked = !modalRef.current.checked;
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
        <div className="modal-box relative max-w-none w-fit">
          <label
            htmlFor="edit-house-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex mt-5 gap-x-10">
            <div id="houseInfoEdit">
              <h3 className="text-xl font-bold">Edit Household Details</h3>
              <p className="py-2">Edit details of your home below.</p>
              <form
                onSubmit={handleHouseEditSubmit}
                action="#"
                id="createHouse"
              >
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
                    className="btn btn-primary"
                    type="submit"
                    value="edit"
                  ></input>
                </div>
              </form>
            </div>
            <div id="houseImageUpload">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">Household icon upload</h3>
                <p className="py-2">&#40;File size limit: &#60;1MB&#41;</p>
                <div className=" border-4 rounded-lg my-5 w-50 h-50 place-self-center justify-self-center">
                  {imageUpload && (
                    <Image
                      src={URL.createObjectURL(imageUpload)}
                      alt="No image"
                      height={50}
                      width={50}
                    ></Image>
                  )}
                </div>
                {imageError && (
                  <div className="alert alert-error shadow-lg">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-current flex-shrink-0 w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>
                        File size is too big! &#40;Ensure it is less than
                        1MB&#41;
                      </span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className=""
                  accept=".png,.jpg,.jpeg"
                />
                <button
                  onClick={handleImageSubmit}
                  className="btn btn-primary mt-10"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseholdEditModal;
