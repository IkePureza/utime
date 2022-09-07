import React from 'react'

interface NewHouseFormProps {
  handleClick: (event: any) => Promise<void>
}

function NewHouseForm(props: NewHouseFormProps) {
  return (
    <form onSubmit={props.handleClick} action="#">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">House Name</span>
          <span className="label-text-alt">(Required)</span>
        </label>
        <input
          id="houseName"
          name="houseName"
          type="input w-full max-w-xs"
          placeholder="House Name"
          className="input input-bordered"
        />
      </div>
      <br />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description (Optional)</span>
          <span className="label-text-alt">Maximum 50 words</span>
        </label>
        <textarea
          id="house_desc"
          name="house_desc"
          className="textarea textarea-bordered h-24"
          placeholder="Description"
        ></textarea>
      </div>
      <br />
      <div className="min-w-full flex place-content-center">
        <input className="btn" type="submit" value="create house"></input>
      </div>
    </form>
  )
}

export default NewHouseForm
