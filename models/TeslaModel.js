const { Schema, model } = require("mongoose");

const tesla = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teslaRange: {
        type: String,
        required: true
    },
    peakPower: {
        type: String,
        required: true
    },
    awd: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

tesla.method("toClient", function() {
    const tesla = this.toObject();
    tesla.id = tesla._id;
    delete tesla._id;

    return tesla;
});

module.exports = model("Tesla", tesla);



















