const Contact = require("../models/Contact");
const { Resend } = require("resend");
const apiKey = `re_iouGEsoR_KTj6NzZk21uEomiZmi2RUSXq`;
const resend = new Resend(apiKey);

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, details } = req.body;

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      details,
    });

    await newContact.save();

    // Send email
    const data1 = await resend.emails.send({
      from: "no-reply@thehimalayansalts.com",
      to: [email],
      subject: `Himalyan Salts`,
      text: `Thanks for Contacting Us, We will get back to you soon.`,
    });

    const data2 = await resend.emails.send({
      from: "The-Himalyan-Salts@thehimalayansalts.com",
      to: ["wmk@thehimalayansalts.com"],
      subject: `New Contact Request from ${firstName} ${lastName}`,
      text: `      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Subject: ${subject}
      Details: ${details}`,
    });

    if (data2) {
      return res.status(201).json({
        message: "Contact request sent successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Unable to make a contact",
    });
  }
};

// For Fetching all contact messages
exports.fetchAll = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.send({
      messages,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch Contact Messages",
    });
  }
};

// For Deleting Contact
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await Contact.findById({ _id: id });

    if (!msg) {
      return res.status(404).json({
        error: "Contact Msg With That ID Does Not Exist",
      });
    }

    await Contact.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Contact Message Deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable To Delete Message",
    });
  }
};
