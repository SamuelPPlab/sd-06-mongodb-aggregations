/*
Baseado na duração média das viagens, determine quais são as 5 bicicletas que foram mais utilizadas.
Exiba o resultado em minutos arredondados para cima e em ordem decrescente.
O resultado da sua query deve ter o seguinte formato:

{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
*/

db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] } },
  } },
  { $project: {
    _id: false,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
