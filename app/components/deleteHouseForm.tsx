import React, { useState } from "react";

interface DeleteHouseFormProps {
  handleClick: (event: any) => Promise<void>;
}

function DeleteHouseForm(props: DeleteHouseFormProps) {
  return (
    <form onSubmit={props.handleClick} action="#">
      <div className="min-w-full flex place-content-center">
        <input className="btn" type="submit" value="delete house"></input>
      </div>
    </form>
  );
}

export default DeleteHouseForm;
