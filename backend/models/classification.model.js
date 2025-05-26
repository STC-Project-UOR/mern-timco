import mongoose from 'mongoose';

const ClassificationSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    botanical_name: { 
        type: String 
    }
});

export default mongoose.models.Classification || mongoose.model('Classification', ClassificationSchema);
