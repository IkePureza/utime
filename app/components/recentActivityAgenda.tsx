/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  Event,
} from "react-big-calendar";
import moment from "moment";
import { db } from "../firebase/clientApp";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, where, collectionGroup } from "firebase/firestore";
moment.locale("en-GB");
//momentLocalizer(moment);
const localizer = momentLocalizer(moment);

interface RecentActivityAgenda {
  userHouseholds: any[] | undefined;
}

const RecentActivityAgenda = (props: RecentActivityAgenda) => {
  const bookingsRef = collectionGroup(db, "booking");
  const [events, setEvents] = useState<Event[] | undefined>([]);
  const [bookingsValue, bookingLoading, bookingError] = useCollection(
    query(
      bookingsRef,
      where(
        "householdId",
        "in",
        !props.userHouseholds || props.userHouseholds?.length == 0
          ? Array([""])
          : props.userHouseholds?.map((data) => data.id)
      )
    )
  );
  useEffect(() => {
    setEvents(
      bookingsValue?.docs.map((doc) => {
        return {
          id: doc.id,
          title: `🏠 ${doc.data().householdName ?? ""} > 👤 ${
            doc.data()?.userName ?? ""
          } > ${doc.data()?.amenityType ?? ""} ${doc.data().amenityName ?? ""}`,
          start: new Date(doc.data()?.from.seconds * 1000),
          end: new Date(doc.data()?.to.seconds * 1000),
          resourceId: doc.data().amenityId,
          description: doc.data()?.desc ?? "",
        };
      })
    );
  }, [bookingsValue, props.userHouseholds]);

  return (
    <div className="my-10 mx-5 grid">
      {bookingError && <strong>Error: {JSON.stringify(bookingError)}</strong>}
      {bookingLoading && <span>Collection: Loading...</span>}
      {bookingsValue && (
        <div className="overflow-auto container h-[75vh] mb-20 shadow-md rounded-md">
          <BigCalendar
            localizer={localizer}
            events={events}
            defaultView={Views.AGENDA}
            views={[Views.AGENDA]}
            step={60}
            defaultDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default RecentActivityAgenda;
