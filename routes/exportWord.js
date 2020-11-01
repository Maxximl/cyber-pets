var spawn = require("child_process").spawn;

exports.exportPetCard = (dogInfo) => {
	/*var dogInfo = {
		cardNum : '124',
		 shelter : 'Приют №2',
				organization : 'Ромашка',
				aviary : '21',
				age : '11',
				weight : '17',
				name : 'Tusik',
				gender: 'M',
				breed : 'Спаниель',
				size: 'Большая',
				tail : 'Длинный',
				ears : 'Уши',
				prep1: 'Антиблох',
				
	}*/

	var arg = JSON.stringify(dogInfo);
	console.log('arg len : ',arg.length)
	var process = spawn('python',['./main.py',arg]);

	process.stdout.on('data', (data)=>{
			console.log(data.toString());	
	})

}


exports.exportSvod = (info)=>{
	var arg = JSON.stringify(info);
	console.log('arg len : ',arg.length)
	var process = spawn('python',['./exportSvod.py',arg]);

	process.stdout.on('data', (data)=>{
			console.log(data.toString());	
	})
}

