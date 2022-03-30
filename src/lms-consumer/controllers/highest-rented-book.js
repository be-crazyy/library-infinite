const Rentals = require('../../lms-event-processor/toolbox/models/rentals');
const Book = require('../../lms-event-processor/toolbox/models/book');

module.exports = highestRentedBook = async (req, res) => {
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
                    _id: '$book_id',
                    TotalRentals:
                    {
                        $count: { }
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
    const book = await Book.find({ 'book_id': data[0]._id });
    return res.json(book);
}