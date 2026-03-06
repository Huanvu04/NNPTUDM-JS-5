const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, default: "" },
    avatarUrl: { type: String, default: "https://i.sstatic.net/l60Hf.png" }, // Bỏ chữ &quot; đi nhé, đó là lỗi hiển thị HTML
    status: { type: Boolean, default: false },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }, // Liên kết đến Role
    loginCount: { type: Number, default: 0, min: 0 },
    isDeleted: { type: Boolean, default: false } // Phục vụ Xóa mềm
}, { 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);