const mongoose = require('mongoose');
const arraySchema = mongoose.Schema(
    {
        student: [
            {
                firstName: {
                    type: String,
                    required: true,
                },
                lastName: {
                   type: String,
                   required: true,
                },
                gender:{
                    type: String,
                    required:true,
                },
                phone:{
                  type: String,
                  required: true,
                },
                email: {
                    type: String,
                    required:true,
                }
            },
        ]
    },
    {
        timestamps:true
    }
);
const Student = mongoose.model('Student', arraySchema);
module.exports = Student;