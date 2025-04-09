require("dotenv").config();
const mongoose = require("mongoose");
const Volunteer = require("./models/Volunteer");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const testVolunteer = new Volunteer({
  fullName: "John Doe",
  username: "johndoe",
  residence: "New York",
  email: "john@example.com",
  phone: "1234567890",
  password: "securepassword",
});

testVolunteer.save()
  .then(() => {
    console.log("✅ Test volunteer added!");
    mongoose.connection.close(); // Close connection after saving
  })
  .catch((err) => {
    console.error("❌ Error adding volunteer:", err);
    mongoose.connection.close();
  });
