import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
    {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['resume', 'coverLetter'],
        required: true
    },
    file_name: {type: String, required: true},
    size: {type: Number, required: true},
    filePath: {type: String, required: true},
    uploaded_at: {
        type:Date,
        default: Date.now
    }
},
{collection: 'documents'}
)

const Documents = mongoose.model('documents', DocumentSchema);
export default Documents;