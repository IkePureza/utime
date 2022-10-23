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

  console.log("desc: ", props.desc, ".");

  return (
    <React.Fragment key={props.id}>
      <div className="card card-side card-compact w-96 shadow-xl mb-2 bg-zinc-100 rounded-xl">
        <Image
          src={"/houseDefault.jpg"}
          width={80}
          height={100}
          alt="Shoes"
          className="rounded-r-xl object-cover shadow-md"
        />

        <div className="card-body gap-0">
          <h2 className="card-title leading-4" id="houseName">
            {props.name}
          </h2>
          <p className = "text-xs break-normal break-words" id="houseDesc">{props.desc}</p>

          <div className="card-actions justify-end">
            <Link href="household/[houseId]" as={`household/${props.id}`}>
              <a className="btn btn-accent btn-xs ml-5 text-xs mt-2 rounded-lg normal-case shadow-md"> Go to House</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HouseholdCard;
