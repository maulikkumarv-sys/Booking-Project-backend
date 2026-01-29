
const bookingmodel = require("../model/bookingmodel")

function timeToMinutes(time) {
    const [t, modifier] = time.split(" ")
    let [hours, minutes] = t.split(":")

    hours = parseInt(hours)
    minutes = parseInt(minutes)

    if (modifier === "PM" && hours !== 12) hours += 12
    if (modifier === "AM" && hours === 12) hours = 0

    return hours * 60 + minutes


}




const addbooking = async (req, res) => {

    try {
        const { date, startTime, endTime } = req.body



        const bookings = await bookingmodel.find({ date })

        const newstart = timeToMinutes(startTime)
        const newend = timeToMinutes(endTime)

        const today = new Date().toISOString().split('T')[0]

        if (date === today) {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            if (newstart <= currentMinutes) {
                return res.status(400).json({
                    message: "This time slot has already expired",
                });
            }
        }




        for (let booking of bookings) {
            const currentstart = timeToMinutes(booking.startTime)
            const currentend = timeToMinutes(booking.endTime)
            const today = new Date().toISOString().split("T")[0];

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            // if (currentMinutes < currentstart) {
            //     booking.status = "pending";
            // }
            // else if (currentMinutes >= currentstart && currentMinutes < currentend) {
            //     booking.status = "confirmed";
            // }
            // else {
            //     booking.status = "done";
            // }
            // const now = new Date();
            // const currentMinutes = now.getHours() * 60 + now.getMinutes();

            let status = "pending"; // default

            if (booking.date === today) {
                const start = timeToMinutes(booking.startTime);
                const end = timeToMinutes(booking.endTime);

                if (currentMinutes >= start && currentMinutes < end) {
                    status = "confirmed";
                } else if (currentMinutes >= end) {
                    status = "done";
                }
            }

            await booking.save();

            if (newstart < currentend && newend > currentstart) {
                return res.status(400).json({
                    message: "This time slot is already booked"
                });
            }
        }


        const existbooking = await bookingmodel.findOne({
            date, startTime, endTime,




        })







        const data = await bookingmodel.create(req.body)
        return res.send(data)


    } catch (error) {
        console.log(error)
    }




}





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