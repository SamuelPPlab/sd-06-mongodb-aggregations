/*
A escolha do filme da noite foi um sucesso, mas infelizmente ficamos com nossa banda
de internet quase esgotada, e ainda precisamos de uma nova recomendação de filme. Para diminuir
o volume de dados trafegados:

Utilizando o mesmo pipeline anterior, retorne apenas os campos title, rated, imdb.rating,
imdb.votes e year,
modificando seus nomes para titulo, avaliado, notaIMDB, votosIMDB e ano, respectivamente.
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
]);
