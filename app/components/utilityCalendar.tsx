/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
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
import { query, where, collection, doc } from "firebase/firestore";
moment.locale("en-GB");
//momentLocalizer(moment);
const localizer = momentLocalizer(moment);

interface UtilityCalendarProps {
  houseId: string;
  utilityId: string;
}

const UtilityCalendar = (props: UtilityCalendarProps) => {
  const bookingsRef = collection(db, "booking");
  const [bookingsValue, bookingLoading, bookingError] = useCollection(
    query(
      bookingsRef,
      where("householdId", "==", props.houseId),
      where("amenityId", "==", props.utilityId)
    )
  );
  const [events, setEvents] = useState<Event[] | undefined>([]);

  useEffect(() => {
    setEvents(
      bookingsValue?.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data()?.userName,
          start: new Date(doc.data()?.from.seconds * 1000),
          end: new Date(doc.data()?.to.seconds * 1000),
          resourceId: doc.data().amenityId,
          description: doc.data()?.desc,
        };
      })
    );
  }, [bookingsValue]);

  return (
    <div className="m-10">
      {bookingError && <strong>Error: {JSON.stringify(bookingError)}</strong>}
      {bookingLoading && <span>Collection: Loading...</span>}
      {bookingsValue && (
        <BigCalendar
          localizer={localizer}
          events={events}
          defaultView={Views.DAY}
          views={[Views.DAY]}
          step={60}
          defaultDate={new Date()}
        />
      )}
    </div>
  );
};

export default UtilityCalendar;
