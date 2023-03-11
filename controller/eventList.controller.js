const Post = require("../models/eventList.model");


  //Adding events
  Post.createUser = async function (title, event_id, date, limit, time, location, Presenter, Desc) {
    const ticket = new Post({ title, event_id, date, limit, time, location, Presenter, Desc });
    const savedTicket = await ticket.save();
    return savedTicket;
  };

  exports.addEvent = async (req, res, next) => {
    const { title, date, limit, time, location, Presenter, Desc } = req.body;
    console.log(req.body);
    try {

      const highestEvent = await Post.findOne({}, { event_id: 1 }).sort({ event_id: -1 });

      var num = parseInt(highestEvent.event_id, 10);

      var e_id = num ? num + 1 : 1;
      const event_id= e_id.toString();

      console.log(event_id);


      // Call the createUser method on the Ticket model
      const savedTicket = await Post.createUser(title, event_id, date, limit, time, location, Presenter, Desc);


      res.status(201).json({
        message: "Ticket created!",
        TicketDetails: {
          title: savedTicket.title, 
          event_id: savedTicket.event_id, 
          limit: savedTicket.limit,
          date: savedTicket.date, 
          time: savedTicket.time, 
          location: savedTicket.location, 
          Presenter: savedTicket.Presenter, 
          Desc: savedTicket.Desc
        },
      });
    } catch (error) {
      return next(error);
    }
  };
  

  //All Events
  exports.getAllEvents = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
  
    try {
      const event_list = await Post.find().sort({_id: 1}).limit(limit).skip(skipIndex).exec();
  
      res.status(200).json({
        length: event_list.length,
        data: event_list,
      });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong!",
        error: error
      });
    }
  };


// Update the document with the specified event_id
exports.updateEvent = async (req, res, next) => {
  const { title, event_id, date, limit, time, location, Presenter, Desc } = req.body;
  try {
    const filter = { event_id: event_id };
    const update = {
      title: title,
      limit: limit,
      date: date,
      time: time,
      location: location,
      Presenter: Presenter,
      Desc: Desc
    };
    const options = { new: true }; // Return the updated document
    const updatedEvent = await Post.findOneAndUpdate(filter, update, options);

    if (updatedEvent) {
      res.status(200).json({
        message: "Event updated!",
        EventDetails: updatedEvent
      });
    } else {
      res.status(404).json({
        message: "Event not found!"
      });
    }
  } catch (error) {
    return next(error);
  }
};


//Deleting events
exports.deleteEvent = async (req, res, next) => {
  const { event_id } = req.body;
  try {
    const deletedEvent = await Post.findOneAndDelete({event_id: event_id });
    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found!",
      });
    }
    res.status(200).json({
      message: "Event deleted successfully!",
      deletedEvent,
    });
  } catch (error) {
    return next(error);
  }
};
