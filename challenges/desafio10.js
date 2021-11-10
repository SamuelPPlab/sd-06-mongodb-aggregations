/*
Encontre a média de viagens por tipo de usuário.
Exiba o valor em horas com apenas duas casas decimais
Exiba a média de viagens ordenada de forma crescente.
Para arredondar a média use o $round.

O resultado da sua query deve ter o seguinte formato:

{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ...
*/

db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $project: {
    _id: false,
    tipo: "$_id",
    duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 1000 * 60 * 60] }, 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
