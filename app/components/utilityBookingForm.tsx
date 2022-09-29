import React, { useState } from "react";

interface UtilityBookingFormProps {
  handleSubmit: (event: any) => Promise<void>;
  validBooking: number;
  bookingFrom: undefined;
  bookingTo: undefined;
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
        {props.validBooking == 1 && <p> Booking successful! </p>}
        {props.validBooking == 1 && <p> From: {props.bookingFrom} </p>}
        {props.validBooking == 1 && <p> To: {props.bookingTo} </p>}

        {props.validBooking === 0 && <p>Booking unsuccessful!</p>}
        {props.validBooking === 0 && <p>Possible reasons:</p>}
        {props.validBooking === 0 && <p>- *To* needs to be after *From*</p>}
        {props.validBooking === 0 && <p>- Utility is already booked</p>}

        <div className="min-w-full flex place-content-center">
          <input className="btn" type="submit" value="Book Utility"></input>
        </div>
      </form>
    </>
  );
}

export default UtilityBookingForm;
