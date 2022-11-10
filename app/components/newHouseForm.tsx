import React from "react";

interface NewHouseFormProps {
  handleClick: (event: any) => Promise<void>;
}

function NewHouseForm(props: NewHouseFormProps) {
  return (
    <form onSubmit={props.handleClick} action="#" id="createHouse">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">House Name</span>
          <span className="label-text-alt">(Required)</span>
        </label>
        <input
          id="houseName"
          name="houseName"
          type="text"
          placeholder="House Name"
          className="input input-bordered"
          maxLength={20}
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
          id="houseDesc"
          name="houseDesc"
          className="textarea textarea-bordered h-24"
          placeholder="Description"
          maxLength={50}
        ></textarea>
      </div>
      <br />
      <div className="min-w-full flex place-content-center">
        <input className="btn" type="submit" value="create house"></input>
      </div>
    </form>
  );
}

export default NewHouseForm;

//description not working. Does it save correctly to the DB?
