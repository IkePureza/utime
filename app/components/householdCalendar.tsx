/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
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
import { useRouter } from "next/router";
moment.locale("en-GB");
//momentLocalizer(moment);
const localizer = momentLocalizer(moment);

interface HouseholdCalendarProps {
  houseId: string;
}

const HouseholdCalendar = (props: HouseholdCalendarProps) => {
  const router = useRouter();
  const bookingsRef = collection(db, "booking");
  const householdRef = doc(db, "household", props.houseId);
  const amenityRef = collection(householdRef, "amenity");
  const [bookingsValue, bookingLoading, bookingError] = useCollection(
    query(bookingsRef, where("householdId", "==", props.houseId))
  );
  const [amenityValue, amenityLoading, amenityError] =
    useCollection(amenityRef);
  const [events, setEvents] = useState<Event[] | undefined>([]);
  const [resources, setResources] = useState<any[] | undefined>([]);

  const handleSelectEvent = useCallback(
    (event: any) => router.push(event.href),
    [router]
  );

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
          href: `/household/${doc.data().householdId}/utility/${
            doc.data().amenityId
          }`,
        };
      })
    );

    setResources(
      amenityValue?.docs.map((doc) => {
        return {
          resourceId: doc.id,
          resourceTitle: `${doc.data().type} ${doc.data().name}`,
        };
      })
    );
  }, [bookingsValue, amenityValue]);

  return (
    <div className="m-10">
      {bookingError && amenityError && (
        <strong>Error: {JSON.stringify(bookingError)}</strong>
      )}
      {bookingLoading && amenityLoading && <span>Collection: Loading...</span>}
      {bookingsValue && amenityValue && (
        <BigCalendar
          localizer={localizer}
          events={events}
          defaultView={Views.DAY}
          views={[Views.DAY]}
          step={60}
          defaultDate={new Date()}
          resources={
            resources?.length == 0
              ? [{ resourceId: "", resourceTitle: "" }]
              : resources
          }
          onSelectEvent={handleSelectEvent}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
        />
      )}
    </div>
  );
};

export default HouseholdCalendar;
