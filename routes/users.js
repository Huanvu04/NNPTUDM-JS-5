const express = require('express');
const router = express.Router();
const User = require('../schemas/users'); // Import schema User vào đây

// 1. Viết API C R U D cơ bản ở đây
// API Lấy danh sách (Get All) - Chỉ lấy những user chưa bị xóa mềm
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false }).populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Xóa mềm (Soft Delete) - Thay vì xóa, ta update isDeleted = true
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { isDeleted: true }, 
            { new: true }
        );
        res.status(200).json({ message: "Xóa thành công", user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Viết API Post /enable
router.post('/enable', async (req, res) => {
    try {
        const { email, username } = req.body;
        
        // Tìm user có đúng email và username truyền lên
        const user = await User.findOneAndUpdate(
            { email: email, username: username, isDeleted: false },
            { status: true },
            { new: true } // Trả về data mới sau khi update
        );

        if (!user) {
            return res.status(404).json({ message: "Sai thông tin hoặc User không tồn tại!" });
        }
        res.status(200).json({ message: "Đã bật status thành true", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Viết API Post /disable
router.post('/disable', async (req, res) => {
    try {
        const { email, username } = req.body;
        
        // Tương tự như enable, nhưng set status thành false
        const user = await User.findOneAndUpdate(
            { email: email, username: username, isDeleted: false },
            { status: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Sai thông tin hoặc User không tồn tại!" });
        }
        res.status(200).json({ message: "Đã tắt status thành false", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Tạo mới User (Create)
router.post('/', async (req, res) => {
    try {
        const { username, password, email, fullName, role } = req.body;

        // Tạo một user mới từ dữ liệu gửi lên
        const newUser = new User({
            username,
            password, // Lưu ý: Thực tế đi làm password phải được mã hóa (hash), nhưng làm bài tập thì lưu tạm chuỗi thường cũng được
            email,
            fullName,
            role
        });

        // Lưu vào database
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Tạo user thành công!", user: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;