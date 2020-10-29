import React, { Component, createContext } from "react";
// import items from "./data";
import Client from "./Contentful";

const RoomContext = createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  //getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortRoom",
        order: "-fields.price",
      });

      let rooms = this.formatData(response.items);
      // console.log(rooms);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      this.setState({
        rooms,
        featuredRooms,
        sortRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch {}
  };

  componentDidMount() {
    this.getData();
    // console.log(rooms);
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    let room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRoom
    );
  };

  filterRoom = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;

    let tempRooms = [...rooms];

    capacity = parseInt(capacity);

    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter((room) => room.price <= price);

    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    this.setState({
      sortRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export const withRoomConsumer = (Component) => {
  return (props) => {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
};

export { RoomProvider, RoomContext, RoomConsumer };
