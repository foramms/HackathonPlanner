const getList = (req, res) => {
    const user = req.tokenuser;

    res.status(200).json(user.username);
};

module.exports = {
    getList
};