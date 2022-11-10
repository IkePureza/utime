import React, { useState } from "react";

interface DeleteUtilityFormProps {
  handleClick: (event: any) => Promise<void>;
}

function DeleteUtilityForm(props: DeleteUtilityFormProps) {
  return (
    <form onSubmit={props.handleClick} action="#">
      <div className="min-w-full flex place-content-left text-red-500">
        <input type="submit" value="Delete Utility"></input>
      </div>
    </form>
  );
}

export default DeleteUtilityForm;
 