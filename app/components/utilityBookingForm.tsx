import React, { useState } from "react";

interface UtilityBookingFormProps {
  handleSubmit: (event: any) => Promise<void>;
  validBooking: boolean;
}

function UtilityBookingForm(props: UtilityBookingFormProps) {
  console.log("Props.validBooking:", props.validBooking);
  return (
    <>
      <h1 className="text-left font-black text-2xl mb-2">Book</h1>
      <form onSubmit={props.handleSubmit} action="#">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Booking Description</span>
            <span className="label-text-alt">(Required)</span>
          </label>
          <input
            id="desc"
            name="desc"
            type="input w-full max-w-xs"
            placeholder="Booking Description"
            className="input input-bordered error-"
            required
          />
        </div>
        <br />
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">From</span>
            <span className="label-text-alt">(Required)</span>
          </label>
          <div className="input-group">
            <input
              id="from"
              name="from"
              type="datetime-local"
              placeholder="DD/MM/YYYY HH:MM"
              className="input input-bordered error-"
              required
            />
          </div>
        </div>
        <br />
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">To</span>
            <span className="label-text-alt">(Required)</span>
          </label>
          <div className="input-group">
            <input
              id="to"
              name="to"
              type="datetime-local"
              placeholder="DD/MM/YYYY HH:MM"
              className="input input-bordered error-"
              required
            />
          </div>
        </div>
        <br />

        {props.validBooking === false && <p>Bad booking!!!</p>}
        <div className="min-w-full flex place-content-center">
          <input className="btn" type="submit" value="Book Utility"></input>
        </div>
      </form>
    </>
  );
}

export default UtilityBookingForm;
