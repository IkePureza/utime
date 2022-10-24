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
      <div className="card card-side card-compact w-full bg-base-100 shadow-xl mb-2 px-1">
        <p className="text-8xl">{props.data?.type}</p>

        <div className="card-body">
          <h2 className="card-title">{props.data?.name}</h2>
          <p>{props.data?.desc}</p>
          <div className="card-actions justify-end">
            <Link
              id="toUtilityButton"
              href="/household/[houseId]/utility/[utilityId]"
              as={`/household/${props.houseId}/utility/${props.id}`}
            >
              <a className="btn btn-primary ml-5 mt-2"> Go to Utility</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UtilityCard;
