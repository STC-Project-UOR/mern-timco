import mongoose from "mongoose";

const timberSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    height:{
        type: Number,
        required: true
    },
    diameter:{
        type: Number,
        required: true
    },
    volume:{
        type: Number,
        required: true
    },
    in_date:{
        type: Date,
        required: true
    },
    out_date:{
        type: Date,
    },
    in_location:{
        type: String,
        required: true
    },
    store_location:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    note:{
        type: String
    },

}, {
    timestamps: true // createAt, updateAt
});

const Timber = mongoose.model('Timber', timberSchema);

export default Timber;