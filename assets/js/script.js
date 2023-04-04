

let player;
let game =0;
let enemies= [];
function toggleCard(elem){
	let elemento = elem

	let lastClass = elemento.classList[1]
	let cardSaver = document.querySelector('.card-class-copy')
	document.querySelector('.select-hero').style.display= 'none';
	cardSaver.classList.add(lastClass)
	cardSaver.querySelector('.card-figure').innerHTML = elemento.querySelector('.card-figure').innerHTML;
	cardSaver.querySelector('.card-title').innerHTML = elemento.querySelector('.card-title').innerHTML;
	document.querySelector('.create-hero').style.display='block'
}

function cancelCreate(){
	document.querySelector('.card-class-copy').classList.remove(document.querySelector('.card-class-copy').classList[2])
	document.querySelector('.select-hero').style.display= 'flex';
	document.querySelector('.create-hero').style.display='none';
	document.querySelector('.card-class-copy input').value =''
}

function createHero(){
	let cardSaver = document.querySelector('.card-class-copy')
	let nome = cardSaver.querySelector('input').value
	let heroClass = cardSaver.querySelector('.card-title').innerHTML


	if(nome != ''){
		if (heroClass=='Guerreiro'){
			player = createGuerreiro(nome);
		}
		else{
			player = createMago(nome);
		}
		document.querySelector('.create-hero').style.display='none'
		document.querySelector('.game').style.display='block'
		startGame()
	}	
}




function genereteEnemy(){
	classEnemy= 	Math.floor(Math.random() *4)
	levelenemy = Math.floor(Math.random() *4)
	switch (classEnemy)
	{
	case 0:
		 enemy = createSlime()
		return enemy
	case 1:
		 enemy = createGoblin()
		return enemy	
	case 2:
		 enemy = createThief()
		return enemy	
	case 3:
		 enemy = createSlime(levelenemy)
		return enemy
	}
}

function startGame(){
	let numberOfEnemies = Math.floor(Math.random() * 16) +3
	let numberOfBoss = Math.floor(Math.random() * 3) +1
	enemies = []
	console.log(numberOfEnemies)
	let count_boss = 1;
	for (let i = 0 ; i <  numberOfEnemies ; i++) {
		console.log(i)
				if (i >= (numberOfEnemies - numberOfBoss)){
					enemy = createBigMonster(count_boss)
					count_boss++
					enemies.push(enemy)
					console.log(enemies)
				}
				else{
					enemies.push(genereteEnemy())
			}
	}
	copydataHero()
stage.start(
	player, 
	enemies,
	document.querySelector('#heroi'),
	document.querySelector('#monstro'),
	0,
	game
	);
game+=1;
}

function copydataHero(){
	battlecard= document.querySelector("#heroi");
	originalcard = document.querySelector('.select-hero')
	infoPlayer = document.querySelector('.player-info')

	battlecard.querySelector('.card-class').classList = originalcard.querySelector(`.card-class.card-${player.classe.toLowerCase()}`).classList
	battlecard.querySelector('.card-figure').innerHTML = originalcard.querySelector(`.card-${player.classe.toLowerCase()} .card-figure`).innerHTML
	infoPlayer.querySelector('.card-figure').innerHTML = originalcard.querySelector(`.card-${player.classe.toLowerCase()} .card-figure`).innerHTML
	battlecard.querySelector('.card-image').style.objectFit='fill'
}

function restartGame(){
	document.querySelector('.game').style.display='none'
	document.querySelector('.select-hero').style.display= 'flex';
	document.querySelector('.game-over').style.display='none'
}

function showInfoPlayer(){
	document.querySelector('.player-info').style.display = 'block'
	document.querySelector('.player-info .card-title').innerHTML = player.classe
	document.querySelector('.player-nome').innerHTML = player.name
	document.querySelector('.player-level').innerHTML = player.level
	document.querySelector('.player-hp').innerHTML = player.life.toFixed(2)
	document.querySelector('.player-maxhp').innerHTML = player.maxLife.toFixed(2)
	document.querySelector('.player-atq').innerHTML = player.attack.toFixed(2)
	document.querySelector('.player-def').innerHTML = player.defense.toFixed(2)

}

function showInfoMonster(){
	document.querySelector('.monster-info').style.display = 'block'

}

function closeInfo(){
	document.querySelector('.player-info').style.display = 'none'

}

function closeInfoMonster(){
	document.querySelector('.monster-info').style.display = 'none'

}