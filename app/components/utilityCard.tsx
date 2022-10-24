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
      <div className="card card-side card-compact xl:w-96 w-80 bg-zinc-100 shadow-xl mb-2 rounded-xl">
        <div className="bg-white pt-5 rounded-lg shadow-md">
          <p className="text-5xl my-auto mx-3">{props.data?.type}</p>
        </div>  
        <div className="card-body gap-0">
          <h2 className="card-title leading-4">{props.data?.name}</h2>
          <p className = "text-xs break-normal break-words">{props.data?.desc}</p>
          <div className="card-actions justify-end">
            <Link
              id="toUtilityButton"
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