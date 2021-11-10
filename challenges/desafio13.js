/*
Determine a duração média das viagens iniciadas no dia , em minutos.
Arredonde o resultado para cima.
O resultado da sua query deve ter o seguinte formato:

{ "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
*/

db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
  } },
  { $group: {
    _id: null,
    duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] } },
  } },
  { $project: {
    duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    _id: false,
  } },
]);
