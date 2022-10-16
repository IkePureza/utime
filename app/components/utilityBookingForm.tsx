import React, { useState } from "react";

interface UtilityBookingFormProps {
  handleSubmit: (event: any) => Promise<void>;
}

function UtilityBookingForm(props: UtilityBookingFormProps) {
  const [bookingFrom, setBookingFrom] = useState();

  const handleBookingFromChange = (event: any) => {
    setBookingFrom(event?.target?.value);
  };

  return (
    <>
      <form onSubmit={props.handleSubmit} action="#">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Booking Description</span>
            <span className="label-text-alt">(Required)</span>
          </label>
          <input
            id="desc"
            name="desc"
            type="text"
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
              className="input input-bordered w-full max-w-xs"
              step="any"
              min={new Date().toISOString().split(".")[0]}
              onChange={handleBookingFromChange}
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
              className="input input-bordered w-full max-w-xs"
              disabled={!bookingFrom}
              step="any"
              min={bookingFrom}
              required
            />
          </div>
        </div>
        <br />
        <div className="min-w-full flex place-content-center">
          <input className="btn" type="submit" value="Book"></input>
        </div>
      </form>
    </>
  );
}

export default UtilityBookingForm;
