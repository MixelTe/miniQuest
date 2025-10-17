import { Button, get, initEl, Span } from "./littleLib.js";

const answersEl = get.div("answers");

const quest: QuestAnswer[][] = [
	[
		{ text: "Млечный Путь", img: "./imgs/milkway.jpg", isCorrect: true },
		{ text: "Магелланово Облако", img: "./imgs/magellanic_cloud.jpg" },
		{ text: "Туманность Андромеды", img: "./imgs/andromede.jpg" },
	],
	[
		{ text: "Марс", img: "./imgs/mars.jpg" },
		{ text: "Земля", img: "./imgs/earth.jpg", isCorrect: true },
		{ text: "Венера", img: "./imgs/venus.jpg" },
	],
	[
		{ text: "Азия", img: "./imgs/asia.jpg" },
		{ text: "Африка", img: "./imgs/africa.jpg" },
		{ text: "Европа", img: "./imgs/europe.jpg", isCorrect: true },
		{ text: "Австралия", img: "./imgs/australia.jpg" },
	],
	[
		{ text: "Франция", img: "./imgs/france.jpg" },
		{ text: "Германия", img: "./imgs/germany.jpg" },
		{ text: "Италия", img: "./imgs/italy.jpg" },
		{ text: "Россия", img: "./imgs/russia.jpg", isCorrect: true },
	],
	[
		{ text: "Санкт-Петербург", img: "./imgs/spb.jpg" },
		{ text: "Москва", img: "./imgs/moscow.jpg", isCorrect: true },
		{ text: "Екатеринбург", img: "./imgs/ekaterinburg.jpg" },
		{ text: "Казань", img: "./imgs/kazan.jpg" },
	],
	[
		{ text: "Паша", img: "./imgs/pasha.jpg", isCorrect: true },
		{ text: "Вася", img: "./imgs/vasya.jpg" },
		{ text: "Миша", img: "./imgs/misha.jpg" },
	],
	[
		{ text: "Лево", img: "./imgs/left.jpg" },
		{ text: "Право", img: "./imgs/right.jpg", isCorrect: true },
	]
];

showQuestion(0);
preloadImages();

function showQuestion(index: number)
{
	const question = quest[index];
	if (!question) return;

	answersEl.innerHTML = "";
	question.forEach(answer =>
	{
		answersEl.appendChild(Answer(answer.text, answer.img, () =>
		{
			if (!answer.isCorrect) return showWrongAnswer();
			if (index + 1 < quest.length)
			{
				showQuestion(index + 1);
			}
			else
			{
				answersEl.innerHTML = "";
				answersEl.appendChild(Answer("Победа!", "./imgs/end.jpg", () => {}));
			}
		}));
	});
}

function showWrongAnswer()
{
	answersEl.innerHTML = "";
	answersEl.appendChild(Answer("Неверно!", "./imgs/wrong.jpg", () => showQuestion(0)));
}

function Answer(text: string, img: string | null, onClick: () => void)
{
	return Button("answer", [
		img && initEl("img", [], undefined, el => el.src = img),
		Span([], text),
	], onClick);
}

interface QuestAnswer
{
	text: string,
	img: string,
	isCorrect?: boolean,
}

function preloadImages()
{
	quest.flat().forEach(answer =>
	{
		const img = new Image();
		img.src = answer.img;
		img.onload = () => console.log(`Image loaded: ${answer.img}`);
	});
}
