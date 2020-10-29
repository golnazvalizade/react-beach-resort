import React from "react";
import { withRoomConsumer } from "../context";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import Loading from "./Loading";

const RoomContainer = ({ context }) => {
  const { loading, sortRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortRooms} />
    </div>
  );
};

export default withRoomConsumer(RoomContainer);

// const RoomContainer = () => {
//   return (
//     <RoomConsumer>
//       {(value) => {
//         const { loading, sortRooms, rooms } = value;
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <div>
//             <RoomFilter rooms={rooms} />
//             <RoomList rooms={sortRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// };
