if (typeof ch === "undefined") ch = {}

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
	skill_group: {
		attack: {
			title: "Атака"
		},
		defence: {
			title: "Защита"
		}
	},
	skill: {
		attack: {
			title: "Атака",
			group: "attack",
			def: 0, //default
			desription: "Базовое агрессивное действие."
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
			group: "attack",
			description: "Швырнуть охапку камней."
		},
		speed_attack: {
			title: "Быстрая атака",
			group: "attack",
			description: " Дополнительная базовая атака в ход. Стоит 2 очка. Максимум три атаки."
		},
		push: {
			title: "Отброс",
			group: "attack",
			description: "Сбивание с ног. Пинком. В табло. Отброс идёт как Быстрая атака."
		},
		shield_attack: {
			title: "Удар щитом",
			group: "attack",
			description: "Возможность наносить щитом различные атаки."
		},
		rush: {
			title: "Натиск",
			group: "attack",
			description: " Бег в выбранной стойке. Без штрафов к расстоянию."
		},
		provocation: {
			title: "Провокация",
			group: "attack",
			description: "Поддавшаяся цель атакует с штрафом на попадание. Штраф равен уровню провокации."
		},
		disarm: {
			title: "Обезоруживание",
			group: "attack",
			description: "Кэп"
		},
		feint: {
			title: "Финт",
			group: "attack",
			description: "Финт сбрасывает стойку цели. 1d6+ пойнты силы против 1d6 врага."
		},

		stance_defence: {
			title: "Защитная стойка",
			group: "defence",
			description: "Уровень защитной стойки = Бонус ко всем видам защиты."
		},
		stance_attack: {
			title: "Атакующая стойка",
			group: "defence",
			description: "Уровень= Бонус ко всем видам атаки."
		},
		stance_range: {
			title: "Стойка Стрелка",
			group: "defence",
			description: "Уровень= Бонус к попаданию у атак."
		},
		stance_range_move: {
			title: "Стрельба в движении",
			group: "defence",
			description: "Уровень=Бонус к попаданию при движении."
		},
		stance_magick: {
			title: "Стойка Колдуна",
			group: "defence",
			description: "Уровень= Бонус к выбранному знаку в заклинании."
		},
		stance_magik_move: {
			title: "Колдовство в движении",
			group: "defence",
			description: "Однократный неразвивающийся навык стоимостью в 5 пойнтов."
		},
		stance_agility: {
			title: "Стойка ловкача",
			group: "defence",
			description: "Уровень= Бонус к уклонению и избежанию."
		},
		aim: {
			title: "Прицеливание",
			group: "defence",
			description: "Уровень= бонус к попаданию. Прицеливание накапливается, если не атаковать, и если цель не пропадает из виду. Прицеливание можно делать с оружием ближнего боя. Прицеливание отключает бег."
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
			group: "defence",
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

		evasion: {
			title: "Уклонение",
		},
		hide: {
			title: "Скрытность",
		},
		run: {
			title: "Бег",
		},
		jump: {
			title: "Прыжок",
		},
		swim: {
			title: "Плавание"
		}

	}

}