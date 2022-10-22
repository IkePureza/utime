import React from "react";
import Link from "next/link";

interface UtilityCardProps {
  id: string;
  houseId: string;
  data: any;
}

function UtilityCard(props: UtilityCardProps) {
  return (
    <React.Fragment key={props.id}>
      <div className="card card-side card-compact w-96 bg-zinc-100 shadow-xl mb-2 rounded-xl">
        <div className="bg-white pt-5 rounded-lg shadow-md">
          <p className="text-5xl my-auto mx-3">{props.data?.type}</p>
        </div>  
        <div className="card-body gap-0">
          <h2 className="card-title leading-4">{props.data?.name}</h2>
          <p className = "text-xs break-normal break-words">{props.data?.desc}</p>
          <div className="card-actions justify-end">
            <Link
              href="/household/[houseId]/utility/[utilityId]"
              as={`/household/${props.houseId}/utility/${props.id}`}
            >
              <a className="btn btn-accent btn-xs ml-5 text-xs mt-2 rounded-lg normal-case shadow-md"> Go to Utility</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UtilityCard;
/*
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
*/