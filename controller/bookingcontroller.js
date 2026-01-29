
const bookingmodel = require("../model/bookingmodel")

function timeToMinutes(time) {
    if (!time.includes(" ")) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    const [t, modifier] = time.split(" ");
    let [hours, minutes] = t.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
}




const addbooking = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;

        const bookings = await bookingmodel.find({ date });

        const newstart = timeToMinutes(startTime);
        const newend = timeToMinutes(endTime);

        const today = new Date().toISOString().split("T")[0];

        if (date === today) {
            const currentMinutes = getCurrentMinutesIST();

            if (newstart <= currentMinutes) {
                return res.status(400).json({
                    message: "This time slot has already started or expired",
                });
            }
        }

        for (let booking of bookings) {
            const currentstart = timeToMinutes(booking.startTime);
            const currentend = timeToMinutes(booking.endTime);

            const currentMinutes = getCurrentMinutesIST();

            if (booking.date === today) {
                if (currentMinutes >= currentstart && currentMinutes < currentend) {
                    booking.status = "confirmed";
                } else if (currentMinutes >= currentend) {
                    booking.status = "done";
                } else {
                    booking.status = "pending";
                }

                await booking.save();
            }

            if (newstart < currentend && newend > currentstart) {
                return res.status(400).json({
                    message: "This time slot is already booked",
                });
            }
        }

        const data = await bookingmodel.create(req.body);
        return res.status(201).json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};





const getbooking = async (req, res) => {
    try {
        const data = await bookingmodel.find({})
        return res.send(data)


    } catch (error) {
        console.log(error)
    }
}

const deletbooking = async (req, res) => {
    const id = req.params.id
    try {

        const data = await bookingmodel.findByIdAndDelete(id)
        return res.send(data)


    } catch (error) {
        console.log(error)
    }
}

const updatebooking = async (req, res) => {
    const id = req.params.id

    try {
        const data = await bookingmodel.findByIdAndUpdate(id, req.body)
        return res.send(data)

    } catch (error) {
        console.log(error)
    }
}

module.exports = { addbooking, getbooking, deletbooking, updatebooking, timeToMinutes }