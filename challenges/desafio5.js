const favArray = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match: { countries: "USA", "tomatoes.viewer.rating": { $gte: 3 }, cast: { $exists: true } } },
  { $addFields: { commonFavs: { $setIntersection: [favArray, "$cast"] } } },
  { $addFields: { num_favs: { $size: "$commonFavs" } } },
  { $project: { _id: false, title: true } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1} },
  { $skip: 24},
  { $limit: 1 },
]);
