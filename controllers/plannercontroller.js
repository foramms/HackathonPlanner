const User = require('../models/user');
const Planner = require('../models/planner');

const getList = async (req, res) => {
    const user = req.objuser;

    const plannersId = user.planners;
    var planners = [];

    for (var planerid of plannersId) {
        var planner = await Planner.findOne({_id: planerid});

        planners.push({
            id: planner._id,
            name: planner.name,
        });
    }

    return res.status(200).json(planners);
};

module.exports = {
    getList
};