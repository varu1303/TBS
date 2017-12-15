const Ticket = require('./../mongo/schemas/ticketSchema');

module.exports = {

  saveTicket: (ticketDetail, by) => {
    let ticket = new Ticket({
      ticketTitle: ticketDetail.ticketTitle,
      ticketDescripton: ticketDetail.ticketDescripton,
      raisedBy: {
        name: by.Name,
        emailId: by.EmailId,
        phoneNumber: by.PhoneNumber
      }
    })

    return ticket.save();
  }

  
}