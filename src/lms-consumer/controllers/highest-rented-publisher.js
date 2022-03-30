const Rentals = require('../../lms-event-processor/toolbox/models/rentals');
const Publisher = require('../../lms-event-processor/toolbox/models/publisher');

module.exports = highestRentedPublisher = async (req, res) => {
    const data = await Rentals.aggregate([
        {
            $match:
            {
                'status': true
            }
        },
        {
            $lookup:
            {
                from: 'books',
                localField: 'book_id',
                foreignField: 'book_id',
                as: 'Book_Details'
            }
        },
        {
            $unwind: '$Book_Details'
        },
        {
            $group:
            {
                _id: '$Book_Details.publisher_id',
                GroupByPublisher:
                {
                    $count: {}
                }
            }
        },
        {
            $sort:
            {
                'GroupByPublisher': -1
            }
        },
        {
            $limit: 1
        }
    ]);

    if (!data || !data.length) res.json([]);
    const publisher = await Publisher.find({ 'publisher_id': data[0]._id });
    return res.json(publisher);
}