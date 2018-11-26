const resevations = require("../data/resevations.json");

let idCount = resevations.length;

const resolvers = {
  Query: {
    getReservations: (root, args, context, info) => {
      // let result = resevations.slice(args.offset, args.limit); //TODO consider this
      let result = resevations;
      return result;
    },
    getReservation: (root, args, context, info) => {
      let index = resevations.findIndex(item => item.id === args.id);
      if (index == -1) {
        return {};
      } else {
        return resevations[index];
      }
    }
  },
  Mutation: {
    addReservation: (root, args, context, info) => {
      const reservation = {
        id: `r${idCount++}`,
        name: args.name,
        hotelName: args.hotelName,
        arrivalDate: args.arrivalDate,
        departureDate: args.departureDate
      };
      resevations.push(reservation);
      return reservation;
    },
    updateReservation: (root, args, context, info) => {
      let index = resevations.findIndex(item => item.id === args.id);
      const reservation = resevations[index];
      resevations[index] = Object.assign(reservation, {
        name: args.name,
        hotelName: args.hotelName,
        arrivalDate: args.arrivalDate,
        departureDate: args.departureDate
      });
      console.log(resevations[index]);
      return resevations[index];
    },
    deleteReservation: (root, args, context, info) => {
      resevations.splice(resevations.findIndex(item => item.id === args.id), 1);
      return resevations;
    }
  }
};

module.exports = resolvers;
