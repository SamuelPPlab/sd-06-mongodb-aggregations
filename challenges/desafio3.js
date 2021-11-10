/*
Agora que você tem os campos essenciais, aplique mais um estágio na pipeline do
desafio anterior que atenda a seguinte demanda:

Retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e por ordem alfabética.
O resultado da sua query deve ter o seguinte formato:
*/

db.movies.aggregate([
  { $match: { $and: [
    { "imdb.rating": { $gte: 7 } },
    { genres: { $not: { $in: ["Crime", "Horror"] } } },
    { $or: [{ rated: "PG" }, { rated: "G" }] },
    { languages: { $all: ["English", "Spanish"] } },
  ] } },
  { $project: {
    _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } },
]);
