const Rentals = require('../../lms-event-processor/toolbox/models/rentals');
const User = require('../../lms-event-processor/toolbox/models/user');

module.exports = highestRentedCustomer = async (req, res) => {
    const data = await Rentals.aggregate(
        [
            {
                $match:
                {
                    'status': true
                }
            },
            {
                $group:
                {
                    _id: '$user_id',
                    TotalRentals:
                    {
                        $count: {}
                    }
                }
            },
            {
                $sort:
                {
                    'TotalRentals': -1
                }
            },
            {
                $limit: 1
            }
        ])

    if (!data || !data.length) res.json([]);    
    const user = await User.find({ 'user_id': data[0]._id });
    return res.json(user);
}