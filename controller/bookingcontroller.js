
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

function getCurrentMinutesIST() {
    const now = new Date();
    const ist = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    return ist.getHours() * 60 + ist.getMinutes();
}


const addbooking = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;

        if (!date || !startTime || !endTime) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const bookings = await bookingmodel.find({ date });

        const newstart = timeToMinutes(startTime);
        const newend = timeToMinutes(endTime);

        if (newstart >= newend) {
            return res.status(400).json({ message: "Invalid time range" });
        }

        const today = new Date().toISOString().split("T")[0];

        // 🚫 block expired slots ONLY for today
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

            // 🚫 overlap check (ALL dates)
            if (newstart < currentend && newend > currentstart) {
                return res.status(400).json({
                    message: "This time slot is already booked",
                });
            }

            // ✅ update status ONLY for today
            if (booking.date === today) {
                const currentMinutes = getCurrentMinutesIST();

                let newStatus = "pending";
                if (currentMinutes >= currentstart && currentMinutes < currentend) {
                    newStatus = "confirmed";
                } else if (currentMinutes >= currentend) {
                    newStatus = "done";
                }

                if (booking.status !== newStatus) {
                    booking.status = newStatus;
                    await booking.save();
                }
            }
        }

        const data = await bookingmodel.create(req.body);
        return res.status(201).json(data);

    } catch (error) {
        console.error("Booking Error:", error);
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