const { Router, response } = require("express");
const router = Router();
var path = require("path");
var mime = require("mime");
var fs = require("fs");

let dataBase = require("../utils/database");
let dtm = dataBase.initDB();
let exportToWord = require("./exportWord.js").exportToWord;
//карточка собаки
router.get("/pet/:petId", (request, response) => {
  console.log("petCard");
  const sql = `INNER JOIN
       Pets ON Pets.id = responsible.id
       LEFT JOIN
       Shelters ON Shelters.id = responsible.shelterId
       LEFT JOIN
       BreedTypes ON BreedTypes.id = Pets.breedTypeId
       LEFT JOIN
       SexTypes ON SexTypes.id = Pets.sexTypeId
       LEFT JOIN
       PetColorTypes ON PetColorTypes.id = Pets.petColorTypeId
       LEFT JOIN
       PetEarsTypes ON PetEarsTypes.id = Pets.petEarsTypeId
       LEFT JOIN
       PetHairTypes ON PetHairTypes.id = Pets.petHairTypeId
       LEFT JOIN
       PetsSizes ON PetsSizes.id = Pets.petsSizeId
       LEFT JOIN
       PetAddInfo ON PetAddInfo.petId = Pets.id
       LEFT JOIN
       PetTailTypes ON PetTailTypes.id = Pets.petTailTypeId
	   LEFT JOIN 
       CatchInfo ON CatchInfo.petId = Pets.id
	   LEFT JOIN 
       PetTransfers ON PetTransfers.petId = Pets.id
 WHERE responsible.petId = ${request.params.petId};`;
  dtm
    .readValue("responsible", sql)
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

//список хвостов
router.get("/tailList", (request, response) => {
  dtm
    .readValue("petTailTypes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//список типов животных
router.get("/petTypeList", (request, response) => {
  dtm
    .readValue("petTypes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//список окрасов животных
router.get("/petColorTypes", (request, response) => {
  dtm
    .readValue("petColorTypes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//список типа шерсти животных
router.get("/petHairTypes", (request, response) => {
  dtm
    .readValue("petHairTypes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//список типа ушей животных
router.get("/petearsTypes", (request, response) => {
  dtm
    .readValue("petearsTypes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//список размеров животных
router.get("/petsizes", (request, response) => {
  dtm
    .readValue("petsSizes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

//список размеров животных
router.get("/petSexTypes", (request, response) => {
  dtm
    .readValue("sexTypes")
    .then((rows) => {
      if (rows.length !== 0) {
        response.send({ result: rows });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

// router.get("/report", (request, res) => {
//   res.set(
//     "Content-Type",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   );
//   res.set("Content-Disposition", "attachment; filename=generated.docx");
//   res.download("C:/tst/generated.docx");
// });

router.get("/report", function (req, res) {
  const file = "C:\\tst\\generated.docx";

  const filename = path.basename(file);
  const mimetype = mime.lookup(file);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  const filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

// Собаки по приюту
router.get("/petsByShelter/:shelterId", (request, response) => {
  dtm
    .readValue(
      "responsible",
      ` INNER JOIN Pets 
									ON responsible.petId = Pets.id
									WHERE shelterId = ${request.params.shelterId}`
    )
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

//фильтр
router.post("/filter", (request, response) => {
  let sql = "";
  console.log(request.body);
  if (Object.entries(request.body).length) {
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

// Создание ворд документа
router.put("/exportToWord", (request, response) => {
  const { id } = request.body;
  const sql = `INNER JOIN
       Pets ON Pets.id = responsible.id
       INNER JOIN
       Shelters ON Shelters.id = responsible.shelterId
       INNER JOIN
       BreedTypes ON BreedTypes.id = Pets.breedTypeId
       INNER JOIN
       SexTypes ON SexTypes.id = Pets.sexTypeId
       LEFT JOIN
       PetColorTypes ON PetColorTypes.id = Pets.petColorTypeId
       LEFT JOIN
       PetEarsTypes ON PetEarsTypes.id = Pets.petEarsTypeId
       LEFT JOIN
       PetHairTypes ON PetHairTypes.id = Pets.petHairTypeId
       LEFT JOIN
       PetsSizes ON PetsSizes.id = Pets.petsSizeId
       LEFT JOIN
       PetAddInfo ON PetAddInfo.petId = Pets.id
       LEFT JOIN
       PetTailTypes ON PetTailTypes.id = Pets.petTailTypeId
 WHERE responsible.petId = ${id};`;

  console.log(`id ${id}`);
  dtm
    .readValue("responsible", sql)
    .then((rows) => {
      if (rows.length !== 0) {
        console.log("rows", rows);
        exportToWord({ ...rows[0], age: "12" });
        response.send({ result: "Ok" });
      } else {
        response.send({ code: 401, message: "Животное не найдено" });
      }
    })
    .catch((errpor) => {
      response.send({ code: 400, message: "Ошибка выполнения запроса" });
    });
});

module.exports = router;
