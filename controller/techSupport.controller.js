const Ticket = require("../models/complaint.model");

  //All Events
  exports.getAllTickets = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
  
    try {
      const event_list = await Ticket.find().sort({_id: 1}).limit(limit).skip(skipIndex).exec();
  
      res.status(200).json({
        length: event_list.length,
        data: event_list,
      });
      console.log(data);
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong!",
        error: error
      });
    }
  };

  //Deleting events
exports.deleteTicket = async (req, res, next) => {
  const { event_id } = req.body;
  console.log(req.body);
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.body.event_id );
    if (!deletedTicket) {
      return res.status(404).json({
        message: "Complaint not found!",
      });
    }
    res.status(200).json({
      message: "Ticket resolved successfully!",
      deletedTicket,
    });
  } catch (error) {
    return next(error);
  }
};
