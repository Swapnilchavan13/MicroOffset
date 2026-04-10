const mongoose = require("mongoose");

const PopUpSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },

    email: { 
      type: String, 
      required: true,
      trim: true,
    },

    company_or_organization: { 
      type: String,
      trim: true 
    },

    contact_number: { 
      type: String,
      trim: true 
    },

    enquiry: { 
      type: String, 
      required: true 
    },

    source: {
  type: String,
  required: true,
}
  },
  { timestamps: true } // createdAt & updatedAt
);

module.exports = mongoose.model("PopUp", PopUpSchema);