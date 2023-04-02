const entity= {
	name: '',
	life: 1,
	maxLife: 1,
	attack: 0,
	defense:0,
	level:1,
	xp:0,
	classe:''
}

const createGuerreiro = (name) => {
	return {
		...entity,
		name,
		life: 100,
		maxLife: 100,
		attack: 10,
		defense: 8,
		level: 1,
		xp:0,
		classe:'Guerreiro'
	}
}

const createMago = (name) => {
	return {
		...entity,
		name,
		life: 85,
		maxLife: 85,
		attack: 15,//15
		defense: 4,//5
		level: 1,
		xp:0,
		classe:'Mago'
	}
}

const createSlime = (level) =>{
	return {
		...entity,
		name: 'Slime',
		life: level>1? level*(1.2)*30 : 30,
		maxLife: level>1 ? level*(1.2)*30 : 30,
		attack: level>1 ? level*(1.3)*2 : 2,
		defense:  level>1 ? level*(1.3)*2 :2,
		level: level>1 ? level :1  ,
		classe:'monstro'

	}
}

const createGoblin = (level) =>{
	return {
		...entity,
		name: 'Goblin',
		life: level>1? level*(1.2)*50 : 50,
		maxLife: level>1 ? level*(1.2)*50 : 50,
		attack: level>1 ? level*(1.3)*6 : 6,
		defense:  level>1 ? level*(1.3)*4 :4,
		level: level>1 ? level :1  ,
		classe:'monstro'
	}
}

const createThief = (level) =>{
	return {
		...entity,
		name: 'Ladrao',
		life: level>1? level*(1.2)*80 : 80,
		maxLife: level>1 ? level*(1.2)*80 : 80,
		attack: level>1 ? level*(1.3)*8 : 8,
		defense:  level>1 ? level*(1.3)*6 :6,
		level: level>1 ? level :1  ,
		classe:'monstro'
	}
}

const createBigMonster = (level) =>{
	return {
		...entity,
		name: 'Big Monster',
		life: level>1 ? level*(1.2)*120 : 120,
		maxLife: level>1 ?  level*(1.2)*120 : 120,
		attack: level>1 ?  level*(1.3)* 16 : 16,
		defense:  level>1 ?  level*(1.3)* 6 : 6,
		level:level>1 ? level :1 ,
		classe:'monstro'
	}
}


const stage = {
	jogador: null,
	monstro: null,
	jogadorEl: null,
	monstroEl: null,
	nivel: 0,

	async start(jogador, monstros, jogadorEl, monstroEl,nivel){
		this.jogador = jogador;
		this.nivel = nivel;
		this.monstro = monstros;
		this.jogadorEl = jogadorEl;
		this.Elmonstro = monstroEl;
		
		if(nivel ==0 ){
			
				this.jogadorEl.querySelector('.attackButton').addEventListener('click', ()=> this.doAttack(this.jogador, this.monstro[this.nivel]))
				this.Elmonstro.querySelector('.attackButton').addEventListener('click', ()=> this.doAttack(this.monstro[this.nivel], this.jogador))

				let whoAtk = Math.floor(Math.random()*20) +1
				
				if (whoAtk %2 ==0){
					qtsAtk = Math.floor(Math.random()*4) +1
					this.rollD20(qtsAtk,true,this.jogadorEl.querySelector('.attackButton'))
					document.querySelector('#stage-nivel .info-game .who-atk').innerHTML= `Jogador tem`
						// document.querySelector('#stage-nivel .info-game .qtd-atks').innerHTML= 	qtsAtk

					this.jogadorEl.querySelector('.attackButton').setAttribute('data-atk',qtsAtk);
					this.Elmonstro.querySelector('.attackButton').setAttribute('data-atk',0);
				}
				else{
					qtsAtk = Math.floor(Math.random()*3) +1
					this.rollD20(qtsAtk,true,this.Elmonstro.querySelector('.attackButton'))
					document.querySelector('#stage-nivel .info-game .who-atk').innerHTML= `Monstro tem`
					// document.querySelector('#stage-nivel .info-game .qtd-atks').innerHTML= 	qtsAtk
					this.jogadorEl.querySelector('.attackButton').setAttribute('data-atk',0);
					this.Elmonstro.querySelector('.attackButton').setAttribute('data-atk',qtsAtk);
				}
					this.Elmonstro.querySelector('.attackButton').setAttribute('data-canAtk',false);
					this.jogadorEl.querySelector('.attackButton').setAttribute('data-canAtk',false);

			}

		this.update();
	},

	async update(){
		document.querySelector('#stage-nivel .nivel').innerHTML= `Nivel ${this.nivel + 1}`
		let msg =''
		let qtdsAtks = 0
		if(parseInt(this.jogadorEl.querySelector('.attackButton').dataset.atk) >0 ){
			msg = 'Jogador tem'
			qtdsAtks = this.jogadorEl.querySelector('.attackButton').dataset.atk
		}
		else {
			msg = 'Monstro tem'
			qtdsAtks = this.Elmonstro.querySelector('.attackButton').dataset.atk
		}
		if(this.Elmonstro.querySelector('.attackButton').dataset.canatk == 'true' && parseInt(qtdsAtks)> 0){
		
			await sleep(1000 )
			this.Elmonstro.querySelector('.attackButton').click()	
		}
	
		document.querySelector('#stage-nivel .info-game .who-atk').innerHTML=msg
		this.rollD20(qtdsAtks,false,null)
		this.jogadorEl.querySelector('.name').innerHTML = `${this.jogador.name}  LV - ${this.jogador.level} - ${this.jogador.life.toFixed(1)} HP`; 
		let f1Pct = (this.jogador.life / this.jogador.maxLife) *100
		let colorBar1= ' #25c925'
		this.jogadorEl.querySelector('.bar').style.width = `${f1Pct}%`;
		if(f1Pct >66){
			colorBar1 = ' #25c925'
		}
		else if (f1Pct <67 && f1Pct >33){
			colorBar1 ='yellow'
		} 
		else if(f1Pct <33){
			colorBar1 = 'red'
		}
		this.jogadorEl.querySelector('.bar').style.backgroundColor =colorBar1;


		this.Elmonstro.querySelector('.name').innerHTML = `${this.monstro[this.nivel].name}  LV -  ${this.monstro[this.nivel].level} - ${this.monstro[this.nivel].life.toFixed(1)} HP`;
		let f2Pct = (this.monstro[this.nivel].life / this.monstro[this.nivel].maxLife) *100
		this.Elmonstro.querySelector('.bar').style.width = `${f2Pct}%`;


		this.updateMonsterCard()
	},

	doAttack(attacking, attacked){
		let attackingElement =''
		let attackedElement =''
		let chanceAtk = 0
		if(attacking.classe != 'monstro'){
			attackingElement = this.jogadorEl.querySelector('.attackButton');
			attackedElement = this.Elmonstro.querySelector('.attackButton')
			chanceAtk = Math.floor(Math.random()*3) +1
		}
		else
		{
			attackingElement = this.Elmonstro.querySelector('.attackButton')
			attackedElement = this.jogadorEl.querySelector('.attackButton');
			
			chanceAtk = 4;
		}


		if (parseInt(attackingElement.dataset.atk) > 0 && attackingElement.dataset.canatk)
		{
			attackingElement.setAttribute('data-atk',(parseInt(attackingElement.dataset.atk) -1) );
			if (attacking.life <= 0 || attacked.life <=0  ){
				this.nivel+=1;
				log.addMessage("Batalha ja acabou");
				// this.start(this.jogador,this.monstro,this.jogadorEl,this.Elmonstro,	this.nivel )
	
			}
			
			const atkFactor = (Math.random() * 2).toFixed(2);
			const defFactor = (Math.random() * 2).toFixed(2);
	
			const actualAtk = attacking.attack * atkFactor;
			const actualDef = attacked.defense * defFactor;
			
			if(actualAtk > actualDef){
				 dmgEl = document.querySelector('.dmg-info');
				 dmgEl.classList = 'dmg-info'
				 dmgEl.innerHTML = actualAtk.toFixed(2);
				attacked.life -= actualAtk;
				attacked.life = attacked.life < 0 ? 0 : attacked.life;
				log.addMessage(`${attacking.name} causou ${ actualAtk.toFixed(2)} de dano em ${attacked.name}`);
				if(atkFactor > 1.2 && attacking.classe != 'monstro' ){
					dmgEl.classList = 'dmg-info critical'
					attacking.life += actualAtk* 0.2
					attacking.life = attacking.life > attacking.maxLife ?attacking.maxLife :attacking.life 
					log.addMessage(`critico de ${atkFactor} ${attacking.name} se curou em  ${ (actualAtk* 0.2).toFixed(2) }`);
				}	
			}
			else{
				dmgEl = document.querySelector('.dmg-info');
				 dmgEl.classList = 'dmg-info'
				 dmgEl.innerHTML = 'Defesa';
				attackingElement.setAttribute('data-atk',0)
				log.addMessage(`${attacked.name} se defendeu`);
			}
	
			if (attacked.life == 0) {
				if(attacking.classe =='monstro'){
					log.addMessage(`Os Monstros venceram`)
					this.gameOver(" YOU DIE")
				}
				else{
					let luck= (Math.random() * 5).toFixed(2) ;
					let xp = (attacked.maxLife * luck ).toFixed(2)
					attacked.xp += xp
					log.addMessage(`${attacking.name} venceu a batalha e ganhou ${xp}`);
					let xp2Up = 100*(((attacked.level-1)/10)+1)
					if (attacked.xp >= xp2Up){
	
						attacking.xp -= xp2Up;
						attacking.level +=1;
						let level = attacking.level;
						log.addMessage(`${attacking.name} subiu para o level  ${level}`);
						attacking.maxLife += attacking.maxLife*(0.2)  
	
						attacking.life = attacking.maxLife
	
						attacking.attack += attacking.attack*(0.2)
						attacking.defense += attacking.attack*(0.2)
	
					}
					this.nextNivel()
				}
				
			}
			 if(parseInt(attackingElement.dataset.atk) == 0 ){

			 	qtsAtk = Math.floor(Math.random()* chanceAtk) +1
			 	this.rollD20(qtsAtk,true,attackedElement)
			 	attackedElement.setAttribute('data-atk',qtsAtk);
			 }
			if(this.nivel <= this.monstro.length )
			this.update();
		}
	},

	nextNivel(){
		if(this.nivel < this.monstro.length-1)
		{
			this.start(this.jogador,this.monstro,this.jogadorEl,this.Elmonstro,	this.nivel+1 )
		}
		else {
			this.stopActiosGame(true)
			log.addMessage('Fim de Jogo')
			this.gameOver("Fim de Jogo")
		}

	},

	gameOver(msg){
		// // document.querySelector(".game").style.display = 'none';
		this.stopActiosGame(true)
		document.querySelector('.game-over-message').innerHTML=msg;
		document.querySelector('.game-over').style.display= 'block';
		log.newLog();
	},

	rollD20(qtsAtks, roll, entity){
		
		let d20El = document.querySelector('.icosaedro-atks')
		if (roll){
			for (let i=0; i <= 720; i++){
				setTimeout( () => {
					setTimeout( () => {	
					d20El.style.transform = `rotate(${i}deg)`
					d20El.querySelector('.qtd-atks').innerHTML = i==720 ? qtsAtks  : (Math.floor(Math.random()* 9) +1)
					this.stopActiosGame(true)
					if (i ==720){
						this.stopActiosGame(false)
						if (entity != null )
						{
							this.Elmonstro.querySelector('.attackButton').setAttribute('data-canAtk',false);
							this.jogadorEl.querySelector('.attackButton').setAttribute('data-canAtk',false);
							entity.setAttribute('data-canAtk',true);

							if(this.Elmonstro.querySelector('.attackButton').dataset.canatk){
								setTimeout (() => {
									this.Elmonstro.querySelector('.attackButton').click()
									
								}, 680)
							}
						}
					}
					},// (((i*80)/(721-i))/2)-900-(((721+i-1)/i)*4*60)
					(i >=710 ?  i+(200)*(((721-i)-10)*(-1)) : 225+(i)  )
				)},( 10 + ( i ) )
				)
			}
		}
		else{
			
		  d20El.querySelector('.qtd-atks').innerHTML = qtsAtks
		  this.stopActiosGame(false)
		 	if (entity != null )
			{
				this.Elmonstro.querySelector('.attackButton').setAttribute('data-canAtk',false);
				this.jogadorEl.querySelector('.attackButton').setAttribute('data-canAtk',false);
				entity.setAttribute('data-canAtk',true);
				if(this.Elmonstro.querySelector('.attackButton').dataset.canatk){
					setTimeout (() => {
						this.Elmonstro.querySelector('.attackButton').click()
						
					}, 680)
				}



			}
		}
	},


	updateMonsterCard(){
		let imgPath = `assets/images/entities/${this.monstro[this.nivel].name.toLowerCase()}.png`
		this.Elmonstro.querySelector('.card-image').style.objectFit="fill"
		this.Elmonstro.querySelector('.card-image').src = imgPath
		document.querySelector('.monster-info .card-image').src = imgPath
		document.querySelector('.monster-info .card-image').style.objectFit="fill"
		document.querySelector('.monster-info .card-title').innerHTML = this.monstro[this.nivel].classe
		document.querySelector('.monster-nome').innerHTML = this.monstro[this.nivel].name
		document.querySelector('.monster-level').innerHTML = this.monstro[this.nivel].level
		document.querySelector('.monster-hp').innerHTML = this.monstro[this.nivel].life.toFixed(2)
		document.querySelector('.monster-maxhp').innerHTML = this.monstro[this.nivel].maxLife.toFixed(2)
		document.querySelector('.monster-atq').innerHTML = this.monstro[this.nivel].attack.toFixed(2)
		document.querySelector('.monster-def').innerHTML = this.monstro[this.nivel].defense.toFixed(2)
	},

	stopActiosGame(pause){
			this.Elmonstro.querySelector('.attackButton').disabled = pause
			this.jogadorEl.querySelector('.attackButton').disabled = pause
		
	}

}


const log ={
	list: [],
	addMessage(msg){
		this.list.unshift(msg);
		this.render();
	},
	render(){
		const logEl = document.querySelector('.log');
		logEl.innerHTML ='';

		for(let i in this.list){
			logEl.innerHTML += `<li>${this.list[i]}</li>`;
		}
	},
	newLog(){
		this.list = []
		this.render();
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}