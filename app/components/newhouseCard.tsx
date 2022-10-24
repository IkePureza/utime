import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HouseHoldCardProps {
  id: string;
  name: string;
  desc?: string;
  icon?: string; //URL of image, if none provided, default icon is used
}

function HouseholdCard(props: HouseHoldCardProps) {
  const icon = props.icon || "https://placeimg.com/148/148/arch";

  return (
    <React.Fragment key={props.id}>
      <div className="card card-side card-compact w-80 shadow-xl mb-2 bg-zinc-100 rounded-xl mt-10">
        <Image
          src={"/plus.jpg"}
          width={80}
          height={80}
          alt="Shoes"
          className="rounded-r-xl object-cover shadow-md"
        />

        <div className="card-body gap-0">
          <h2 className="card-title leading-4">New House</h2>
          <p className="text-xs">Add a new household</p>
          <div className="card-actions justify-end">
            <label
              htmlFor="new-house-modal"
              className="btn btn-xs btn-accent w-16 modal-button normal-case text-xs shadow-lg"
            >
            Go!
          </label>
          </div>
        </div>
      </div>

      {/* <div className="justify-center flex-1 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        
        </div> */}
    </React.Fragment>
  );
}

export default HouseholdCard;
