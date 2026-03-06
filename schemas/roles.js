const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false } // Trường này thêm vào để phục vụ Xóa mềm
}, { 
    timestamps: true // Thuộc tính này sẽ tự động tạo ra 2 trường createdAt và updatedAt (đáp ứng yêu cầu timestamp)
});

module.exports = mongoose.model('Role', roleSchema);