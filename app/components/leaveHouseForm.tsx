import React, { useState } from "react";

interface LeaveHouseFormProps {
  handleClick: (event: any) => Promise<void>;
}

function LeaveHouseForm(props: LeaveHouseFormProps) {
  return (
    <form onSubmit={props.handleClick} action="#">
      <div className="min-w-full flex place-content-center">
        <input className="btn" type="submit" value="leave house instead"></input>
      </div>
    </form>
  );
}

export default LeaveHouseForm;
