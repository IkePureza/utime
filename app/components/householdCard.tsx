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
            <Link href="household/[houseId]" as={`household/${props.id}`}>
              <a className="btn btn-primary ml-5 mt-2"> Go to House</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HouseholdCard;
