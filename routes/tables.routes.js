const express = require("express");
 
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();

let dataBase = require('./database.js')
let dtm = dataBase.initDB()

//карточка собаки
app.get("/pet:petId", (request, response)=>{
	console.log('pet')
	dtm.readValue('breedTypes')
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}	
		})
		.catch(errpor =>{
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})
})


//список пород
app.get('/breedList',(request, response)=>{
	dtm.readValue('breedTypes')
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}	
		})
		.catch(errpor =>{
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})
})

//список приютов
app.get('/shelterList',(request, response)=>{
	dtm.readValue('shelters')
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}	
		})
		.catch(errpor =>{
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})
})

// данные приюта
app.get('/shelter/:shelterId',(request, response)=>{
	dtm.readValue('shelters',` WHERE id = ${request.params.shelterId}`)
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}	
		})
		.catch(errpor =>{
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})	
})

// Собаки по приюту
app.get("/pets:{shelterId}", (request, response)=>{
	dtm.readValue('responsible',` WHERE shelterId = ${request.params.shelterId}`)
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}	
		})
		.catch(errpor =>{
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})	
})

//
app.post('/createRequest',jsonParser,(request, response)=>{

})
// 
app.post('/filter',jsonParser,(request,response)=>{
		let sql = ' WHERE '
	if(request.body.breedId)
		sql += ` breedTypeId = ${request.body.breedId} AND`
	if(request.body.gender)
		sql += ` sex = ${request.body.gender} AND `
	//if(req.body.shelterId)
		//sql += ` shelterId = ${req.body.gender} AND `
	if(request.body.size)
		sql += ` size = ${request.body.size} AND `
	const pos = sql.lastIndexOf('AND')
	
	if(sql.lastIndexOf('AND') != -1){
		sql = sql.slice(0,pos)
		
	}
	//TODO
	response.send({ answer : sql})
	
})

app.listen(3000);