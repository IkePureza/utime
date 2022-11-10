import React, { useState } from "react";

interface NewUtilityFormProps {
  handleSubmit: (event: any) => Promise<void>;
}

function NewUtilityForm(props: NewUtilityFormProps) {
  return (
    <form onSubmit={props.handleSubmit} action="#">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Type</span>
          <span className="label-text-alt">(Required)</span>
        </label>
        <select
          id="type"
          name="type"
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option value="&#128701;" selected>
            &#128701; Toilet
          </option>
          <option value="&#x1F6BF;">&#x1F6BF; Shower</option>
          <option value="&#x1F9FA;">&#x1F9FA; Laundry</option>
          <option value="&#x1F4FA;">&#x1F4FA; TV</option>
        </select>
      </div>
      <br />
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Utility Name</span>
          <span className="label-text-alt">(Required)</span>
        </label>
        <input
          id="utilityName"
          name="name"
          type="input w-full max-w-xs"
          placeholder="Utility Name"
          className="input input-bordered error-"
          maxLength={30}
          required
        />
      </div>
      <br />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description (Optional)</span>
          <span className="label-text-alt">Maximum 50 characters</span>
        </label>
        <textarea
          id="utilityDesc"
          name="desc"
          className="textarea textarea-bordered h-24"
          placeholder="Description"
          maxLength={50}
        ></textarea>
      </div>
      <br />
      <div className="min-w-full flex place-content-center">
        <input
          id="createUtilityButton"
          className="btn"
          type="submit"
          value="Create Utility"
        ></input>
      </div>
    </form>
  );
}

export default NewUtilityForm;
