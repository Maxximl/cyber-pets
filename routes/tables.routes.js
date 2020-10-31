const { Router } = require("express");
const router = Router();

let dataBase = require("../utils/database");
let dtm = dataBase.initDB();

//карточка собаки
router.get("/pet/:petId", (request, response) => {
  console.log("petCard");
  dtm
    .readValue("pet")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      } else {
        response.send({ code: 404, message: "Для этой собачки нет карточки" });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

router.put("/pet/:petId/exportWord", (request, response) => {
  console.log("exportWord");
});

//список пород
router.get("/breedList", (request, response) => {
  dtm
    .readValue("breedTypes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//список приютов
router.get("/shelterList", (request, response) => {
  dtm
    .readValue("shelters")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

// данные приюта
router.get("/shelter/:shelterId", (request, response) => {
  dtm
    .readValue("shelters", ` WHERE id = ${request.params.shelterId}`)
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

// Собаки по приюту
router.get("/petsByShelter/:shelterId", (request, response) => {
  console.log("pets");
  dtm
    .readValue("responsible", ` WHERE shelterId = ${request.params.shelterId}`)
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      } else {
        response.send({
          code: 401,
          message: "В приюте нет собак готовых к социализации",
        });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//Заявка
router.post("/createRequest", (request, response) => {
  dtm.createRequest(request.body);
  response.send({ answer: "Спасибо за заявку." });
});

//
router.post("/filter", (request, response) => {
  let sql = "";
  console.log(request.body);
  if (request.body) {
    sql = " WHERE ";

    if (request.body.nickName) sql += `nickName = ${request.body.nickName} AND`;
    if (request.body.gender) sql += `sexTypeId = ${request.body.gender} AND `;
    if (request.body.size) sql += `size = ${request.body.size} AND `;

    const pos = sql.lastIndexOf("AND");

    if (sql.lastIndexOf("AND") != -1) {
      sql = sql.slice(0, pos);
    }
  }
  console.log(sql);
  dtm
    .readValue("pets", sql)
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      } else {
        response.send({
          code: 401,
          message: "Нет подходящих животных. Попробуйте изменить фильтр поиска",
        });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});
module.exports = router;
