const { Router } = require("express");
const router = Router();

let dataBase = require("../utils/database");
let dtm = dataBase.initDB();

//карточка собаки
router.get("/pet:petId", (request, response) => {
  console.log("pet");
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
      response.send({
        code: 400,
        message: "Ошибка выполнения запроса" + errpor,
      });
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
router.get("/pets:{shelterId}", (request, response) => {
  dtm
    .readValue("responsible", ` WHERE shelterId = ${request.params.shelterId}`)
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//
// router.post("/createRequest", jsonParser, (request, response) => {});
//
// router.post("/filter", jsonParser, (request, response) => {
//   let sql = " WHERE ";
//   if (request.body.breedId) sql += ` breedTypeId = ${request.body.breedId} AND`;
//   if (request.body.gender) sql += ` sex = ${request.body.gender} AND `;
//   //if(req.body.shelterId)
//   //sql += ` shelterId = ${req.body.gender} AND `
//   if (request.body.size) sql += ` size = ${request.body.size} AND `;
//   const pos = sql.lastIndexOf("AND");

//   if (sql.lastIndexOf("AND") != -1) {
//     sql = sql.slice(0, pos);
//   }
//   //TODO
//   response.send({ answer: sql });
// });

module.exports = router;
