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
      <div className="card card-side card-compact w-96 bg-base-100 shadow-xl mb-2">
        <Image
          src={icon}
          width={148}
          height={148}
          alt="Shoes"
          className="rounded-r-xl"
        />

        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          {props.desc ? (
            <p>{props.desc}</p>
          ) : (
            <p>Description of {props.name}</p>
          )}
          <div className="card-actions justify-end">
            <Link href="household/[id]" as={`household/${props.id}`}>
              <a className="btn btn-primary ml-5 mt-2"> Go to House</a>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="justify-center flex-1 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        
        </div> */}
    </React.Fragment>
  );
}

export default HouseholdCard;