/*
Trocando de contexto, vamos utilizar nosso outro dataset que contém dados
de empresas aéreas, suas rotas, seus voos e parcerias.

Liste todas as parcerias da coleção air_alliances, que voam rotas com um
Boing 747 ou um Airbus A380 , para descobrir qual delas tem o maior número de rotas com esses
aviões.
No campo airplane, na coleção air_routes:

Boing 747 está abreviado para 747
Airbus A380 está abreviado para 380
O resultado da sua query deve ter o seguinte formato:

{ "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> }
*/

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { air: "$airlines" },
    pipeline: [
      { $match: {
        airplane: { $in: ["747", "380"] },
        $expr: { $eq: ["$airline.name", "$$air"] },
      } },
    ],
    as: "alliances_planes",
  } },
  { $addFields: { soma: { $size: "$alliances_planes" } } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: "$soma" },
  } },
  { $sort: {
    totalRotas: -1,
  } },
  { $limit: 1 },
]);
