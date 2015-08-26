<<<<<<< HEAD:char_setting.js
﻿if (typeof ch === "undefined") ch = {};
=======
if (typeof ch === "undefined") ch = {};
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js

ch.set = {
	race: {
		human: {
			title: "Человек"
		},
		elf: {
			title: "Эльф",
			skill: {
				aim_attack_melee: 1,
				aim_attack_range: 1,
				evasion: 1,
				avoid: 1,
				hide: 1
			},
		},
		orc: {
			title: "Орк",
			hit: {
				1: [2, 2, 2, 2, 2, 2]
			},
			skill: {
				power_attack: 1,
				power_throw: 1,
				swim: 1,
				run: 1,
				jump: 1
			},
		},
		troll: {
			title: "Тролль",
			hit: {
				1: [2, 2, 2, 1, 1, 1]
			},
			skill: {
				aim_attack_melee: 1,
				aim_attack_range: 1,
				swim: 1,
				run: 1,
				jump: 1,
				evasion: 1,
				avoid: 1
			},
		},
		dwarf: {
			title: "Дварф",
			hit: {
				1: [2, 2, 2, 2, 2, 2],
				2: [6, 6, 6, 6, 6],
				3: [4, 4, 4, 4],
				4: [5, 5, 5],
				5: [6, 6]
			},
			skill: {
				avoid: 1
			}
		}
	},
	hit: {
		1: [1, 1, 1, 1, 1, 1],
		2: [5, 5, 5, 5, 5],
		3: [3, 3, 3, 3],
		4: [4, 4, 4],
		5: [5, 5],
		6: [6]
	},
	sex: {
		male: {
			title: "Мужик"
		},
		female: {
			title: "Самка"
		}
	},
<<<<<<< HEAD:char_setting.js
	skill_group : { //ddhdhdhdh
		attack : {
			title : "Атака"
		},
		defence : {
			title : "Защита"
		},
		stealth : {
			title : "Скрытность"
		}
		
        stances : {
			title : "Стойки"
		}
		MagicSigns : {
			title : "Знаки колдовства"
		}
		general : {
			title : "Общие навыки"
=======
	skill_group: {
		attack: {
			title: "Атака"
		},
		defence: {
			title: "Защита"
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		}
	},
	skill: {
		attack: {
			title: "Атака",
			group: "attack",
			def: 0, //default
			description: "Базовое агрессивное действие."
		},
		power_attack: {
			title: "Мощная атака",
			group: "attack",
			description: "Плюс к количеству урона. Мощный выстрел - только ростовые луки."
		},
		power_throw: {
			title: "Мощный бросок",
			group: "attack",
			description: "Бросок изо всех сил."
		},
		aim_attack_melee: {
			title: "Точная атака",
			group: "attack",
			description: "Плюс к шансу попадания по уязвимому месту."
		},
		aim_attack_range: {
			title: "Точный выстрел",
			group: "attack",
			description: "Всадить стрелу в глаз."
		},
		aim_attack_throw: {
			title: "Точный бросок",
			group: "attack",
			description: "Щвырнуть лаптем в очко."
		},
		splash_attack: {
			title: "Круговая атака",
			group: "attack",
			description: "Размах сплеча."
		},
		splash_attack_range: {
			title: "Множественный выстрел",
			group: "attack",
			description: "Всадить несколько стрел сразу."
		},
		splash_attack_throw: {
			title: "Множественный бросок",
<<<<<<< HEAD:char_setting.js
			group : "attack",
			description: "Швырнуть охапку метательного."
=======
			group: "attack",
			description: "Швырнуть охапку камней."
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		},
		speed_attack: {
			title: "Быстрая атака",
			group: "attack",
			description: " Дополнительная базовая атака в ход. Стоит 2 очка. Максимум три атаки."
		},
		push: {
			title: "Отброс",
<<<<<<< HEAD:char_setting.js
			group : "attack",
			description: "Сбивание с ног. Отброс идёт как Быстрая атака."
=======
			group: "attack",
			description: "Сбивание с ног. Пинком. В табло. Отброс идёт как Быстрая атака."
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		},
		shield_attack: {
			title: "Удар щитом",
			group: "attack",
			description: "Возможность наносить щитом различные атаки."
		},
		rush: {
			title: "Натиск",
<<<<<<< HEAD:char_setting.js
			group : "attack",
			description: "Бег в выбранной стойке. Без штрафов к расстоянию."
=======
			group: "attack",
			description: " Бег в выбранной стойке. Без штрафов к расстоянию."
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		},
		provocation: {
			title: "Провокация",
			group: "attack",
			description: "Поддавшаяся цель атакует с штрафом на попадание. Штраф равен уровню провокации."
		},
		disarm: {
			title: "Обезоруживание",
<<<<<<< HEAD:char_setting.js
			group : "attack",
			description: "Выбивание оружия находящегося в слоте оружие"
=======
			group: "attack",
			description: "Кэп"
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		},
		feint: {
			title: "Финт",
			group: "attack",
			description: "Финт сбрасывает стойку цели. 1d6+ пойнты силы против 1d6 врага."
		},

		stance_defence: {
			title: "Защитная стойка",
<<<<<<< HEAD:char_setting.js
			group : "stances",
=======
			group: "defence",
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
			description: "Уровень защитной стойки = Бонус ко всем видам защиты."
		},
		stance_attack: {
			title: "Атакующая стойка",
<<<<<<< HEAD:char_setting.js
			group : "stances",
=======
			group: "defence",
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
			description: "Уровень= Бонус ко всем видам атаки."
		},
		stance_range: {
			title: "Стойка Стрелка",
<<<<<<< HEAD:char_setting.js
			group : "stances",
=======
			group: "defence",
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
			description: "Уровень= Бонус к попаданию у атак."
		},
		stance_range_move: {
			title: "Стрельба в движении",
			group: "defence",
			description: "Уровень=Бонус к попаданию при движении."
		},
		stance_magick: {
			title: "Стойка Колдуна",
<<<<<<< HEAD:char_setting.js
			group : "stances",
=======
			group: "defence",
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
			description: "Уровень= Бонус к выбранному знаку в заклинании."
		},
		stance_magik_move: {
			title: "Колдовство в движении",
			group: "defence",
			description: "Однократный неразвивающийся навык стоимостью в 5 пойнтов."
		},
		stance_agility: {
			title: "Стойка ловкача",
<<<<<<< HEAD:char_setting.js
			group : "stances",
=======
			group: "defence",
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
			description: "Уровень= Бонус к уклонению и избежанию."
		},
		aim: {
			title: "Прицеливание",
<<<<<<< HEAD:char_setting.js
			group : "stealth",
			def: 0, //default
			description: "Уровень= бонус к попаданию. Прицеливание накапливается, если не атаковать, и если цель не пропадает из виду. Прицеливание бывает с оружием  ближнего боя. Прицеливание отключает бег."
=======
			group: "defence",
			description: "Уровень= бонус к попаданию. Прицеливание накапливается, если не атаковать, и если цель не пропадает из виду. Прицеливание можно делать с оружием ближнего боя. Прицеливание отключает бег."
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		},

		defence: {
			title: " Ношение доспеха",
			group: "defence",
			description: ""
		},
		block_shield: {
			title: "Блокирование",
			group: "defence",
			description: "Защита щитом. Щит не повреждается при успехе. Неудача - щит получает полный урон."
		},
		parry: {
			title: "Парирование",
			group: "defence",
			description: "Защита оружием. Оружие не повреждается при успехе. Неудача - оружие получает половину урона."
		},
		block_any: {
			title: "Закрыться",
<<<<<<< HEAD:char_setting.js
			group : "defence",
			def: 0, //default
=======
			group: "defence",
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
			description: "Защита чем попало. \"Что попало\" всегда получает полный урон."
		},
		dodge: {
			title: "Уворот",
			group: "defence",
			description: "Защита от Точной атаки. Удача - Урон не проходит. Неудача - урон по заявленной атакующим точке, мимо брони(как правило)"
		},
		avoid: {
			title: "Избежание",
			group: "defence",
			description: "Защита от Площадной атаки. Удача - Урон не проходит. Неудача - Урон весь влетает по персонажу броне и эквипу."
		},
<<<<<<< HEAD:char_setting.js
	
        SpellCreate {
            title: "Создание заклинания.",
            group : "MagicSigns",
            description: "Создать заклинание выбранной школы. 1d6 на количество урона. Без вложений все знаки будут 1d6 рандом"
        },
        SpellItem {
            title: "Создать магический предмет",
            group : "MagicSigns",
            description: "Создать копию простого предмета. Свойства определяются знаками." 
        },        
        SignPow {
            title: "Знак Мощности",
            group : "MagicSigns",
            description: "Знак увеличивающий количество очков урона"
        },
         SignCon {
            title: "Знак Контроля",
            group : "MagicSigns",
            description: "Знак увеличивающий точность попадания заклинанием. В дуэли магов отвечает за перехват заклинания."
        },
         SignLen {
            title: "Знак Длительности",
            group : "MagicSigns",
            description: "Знак увеличивающий длительность действия заклинания или магически похожей способности."
        },
         SignSqu {
            title: "Знак Площадности",
            group : "MagicSigns",
            description: "Знак увеличивающий область действия заклинания, размер магического щита или снаряда. 1pt=2hex"
        },
         SignSpd {
            title: "Знак Скорости",
            group : "MagicSigns",
            description: "Знак увеличивающий количество заклинаний в ход. 2-4-6 очка=1-2-3 заклинания в ход."
        },        
      
=======

>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		evasion: {
			title: "Уклонение",
			group: "general",
			description"Попытаться уклониться от атаки. Успех-урон не проходит. Равное значение-урон по эквипу. Неудача-полный урон."			
		},
		hide: {
<<<<<<< HEAD:char_setting.js
			title:"Затаиться",
			group: "general",
			description: "Спрятаться неподвижно"
		},
		run: {
			title:"Бег",
			group:"general",
			def: 0, //default
			description: "Рвануть с места."
=======
			title: "Скрытность",
		},
		run: {
			title: "Бег",
>>>>>>> 6a0ee105094a9d5fa061ca833993a76a09c995a5:js/char_setting.js
		},
		jump: {
			title: "Прыжок",
			group: "general",
			def: 0, //default
			description: "Прыжок в выбранный гекс. Или прыжок на месте."
		},
		swim: {
			title: "Плавание",
			group: "general",
			description: "Плыть или не плыть? Задержать дыхание."
		},
		crouch: {
			title: "Присесть",
			group: "general",
			def: 0, //default
			description: "Присесть, чтобы скрыться или стать меньшей целью."
		},

        Lay: {
			title: "Залечь",
			group: "general",
			def: 0, //default
			description: "Залечь, чтобы скрыться или стать совсем маленькой целью."
		},
	}

};