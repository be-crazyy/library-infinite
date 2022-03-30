const Rentals = require('../../lms-event-processor/toolbox/models/rentals');
const Author = require('../../lms-event-processor/toolbox/models/author');

module.exports = highestRentedAuthor = async (req, res) => {
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
                _id: '$Book_Details.author_id',
                GroupByAuthor:
                {
                    $count: {}
                }
            }
        },
        {
            $sort:
            {
                'GroupByAuthor': -1
            }
        },
        {
            $limit: 1
        }
    ]);
  
    if (!data || !data.length) res.json([]);
    const author = await Author.find({ 'author_id': data[0]._id });
    return res.json(author);
}