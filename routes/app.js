const express = require("express");
 
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();

let dataBase = require('./database.js')
let dtm = dataBase.initDB()
let exportToWord = require('./exportWord.js')


//карточка собаки
app.get("/pet/:petId", (request, response)=>{
	console.log('petCard')
	const sql = `INNER JOIN
       Pets ON Pets.id = responsible.id
       INNER JOIN
       Shelters ON Shelters.id = responsible.ShelterId
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
	   LEFT JOIN 
       CatchInfo ON CatchInfo.petId = Pets.id
	   LEFT JOIN 
       PetTransfers ON PetTransfers.petId = Pets.id
 WHERE responsible.petId = ${request.params.petId};`
	dtm.readValue('responsible',sql)
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}else{
				response.send({ code : 404, message : 'Для этой собачки нет карточки' })
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
app.get("/petsByShelter/:shelterId", (request, response)=>{
	console.log('pets')
	dtm.readValue('responsible',` INNER JOIN Pets 
									ON responsible.petId = Pets.id
									WHERE shelterId = ${request.params.shelterId}`)
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}else{
				response.send({ code : 401, message: 'В приюте нет собак готовых к социализации' })
			}
		})
		.catch(errpor =>{
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})	
})

//Заявка
app.post('/createRequest',jsonParser,(request, response)=>{
	dtm.createRequest(request.body)
	response.send({answer: 'Спасибо за заявку.'})		
})

// 
app.post('/filter',jsonParser,(request,response)=>{
	let sql =''
	if(!request.body){
		sql = ' WHERE '
		
		if(request.body.breedId)
			sql += ` breedTypeId = ${request.body.breedId} AND`
		if(request.body.gender)
			sql += ` sexTypeId = ${request.body.gender} AND `
		if(request.body.size)
			sql += ` size = ${request.body.size} AND `
		
		const pos = sql.lastIndexOf('AND')
		
		if(sql.lastIndexOf('AND') != -1){
			sql = sql.slice(0,pos)	
		}
	}
	console.log(sql)
	dtm.readValue('pets',sql)
		.then(rows=>{
			if(rows.length !== 0){
				response.send({ result : rows })
			}else{
				response.send({ code : 401, message: 'Нет подходящих животных. Попробуйте изменить фильтр поиска' })
			}
		})
		.catch(errpor =>{
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})	
})
// Создание ворд документа
app.put('/exportToWord',jsonParser,(request,response)=>{
	const {id} = request.body
	const sql = `INNER JOIN
       Pets ON Pets.id = responsible.id
       INNER JOIN
       Shelters ON Shelters.id = responsible.ShelterId
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
	   LEFT JOIN 
       CatchInfo ON CatchInfo.petId = Pets.id
	   LEFT JOIN 
       PetTransfers ON PetTransfers.petId = Pets.id
 WHERE responsible.petId = ${id};`
	
	
	console.log(`id ${id}`)
	dtm.readValue('responsible',sql)
		.then(rows=>{
			if(rows.length !== 0){
				exportToWord.exportPetCard({...rows[0],age :  2020 - rows[0].birhYear})
				response.send({ result : 'Ok' })
			}else{
				response.send({ code : 401, message: 'Животное не найдено' })
			}
		})
		.catch(error =>{
			console.log(error)
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})	
})

app.put('/exportSvodToWord/:shelterId',jsonParser,(request,response)=>{
	dtm.readValue('responsible',` INNER JOIN Pets 
									ON responsible.petId = Pets.id
									LEFT JOIN
									PetAddInfo ON PetAddInfo.petId = Pets.id
									INNER JOIN
									SexTypes ON SexTypes.id = Pets.sexTypeId
									LEFT JOIN 
									PetTransfers ON PetTransfers.petId = Pets.id
									WHERE shelterId = ${request.params.shelterId}`)
		.then(petsRows=>{
			dtm.readValue('Shelters',` WHERE id = ${request.params.shelterId}`)
				.then((shelts)=>{
						const info = {
							shelter :{...shelts[0], operatingOrganizationId : petsRows[0].operatingOrganizationId },
							pets: petsRows.map( (p)=>{ return {cardId : p.cardId, nickName : p.nickName, petType:'Собака' ,sex : p.sex, identificationMark: p.identificationMark, receiptDate: p.receiptDate } })
						}
						
						exportToWord.exportSvod(info)
						response.send({result : 'Ok'})
				})
				.catch(error => {
					console.log('Error',error)
					response.send({code : 400 , message : 'Ошибка выполнения запроса'})
				})
		})
		.catch(error => {
			console.log('ошибка запроса к БД',error)
			response.send({code : 400 , message : 'Ошибка выполнения запроса'})
		})
})



app.post('/pet',jsonParser, (request,response)=>{
	const {body} = request
	console.log('body:',body)
	dtm.addPet(body)
	response.send({result : 'Ok'})
})


app.listen(3000);