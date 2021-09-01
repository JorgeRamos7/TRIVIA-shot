// Calls to the API to get the list of categories

const arrayCategories = {
	trivia_categories: [
		{ id: 9, name: "General Knowledge" },
		{ id: 10, name: "Entertainment: Books" },
		{ id: 11, name: "Entertainment: Film" },
		{ id: 12, name: "Entertainment: Music" },
		{ id: 13, name: "Entertainment: Musicals & Theatres" },
		{ id: 14, name: "Entertainment: Television" },
		{ id: 15, name: "Entertainment: Video Games" },
		{ id: 16, name: "Entertainment: Board Games" },
		{ id: 17, name: "Science & Nature" },
		{ id: 18, name: "Science: Computers" },
		{ id: 19, name: "Science: Mathematics" },
		{ id: 20, name: "Mythology" },
		{ id: 21, name: "Sports" },
		{ id: 22, name: "Geography" },
		{ id: 23, name: "History" },
		{ id: 24, name: "Politics" },
		{ id: 25, name: "Art" },
		{ id: 26, name: "Celebrities" },
		{ id: 27, name: "Animals" },
		{ id: 28, name: "Vehicles" },
		{ id: 29, name: "Entertainment: Comics" },
		{ id: 30, name: "Science: Gadgets" },
		{ id: 31, name: "Entertainment: Japanese Anime & Manga" },
		{ id: 32, name: "Entertainment: Cartoon & Animations" },
	],
};
let question_correct = [];
let question_correctT = [];
const categories = document.getElementById("select-category");

// Gets the category options from the above API call and adds each category to an option element
arrayCategories.trivia_categories.forEach((element) => {
	categories.innerHTML += `<option id=${element.id} value=${element.id}>${element.name}</option>`;
});

// Get the questions when the user clicks the button, call the API based on the number of questions, the category, the level of difficulty and the type of question chosen
function getQuestions() {
	const numberQ = document.getElementById("numberQ").value;
	const selectCategory = document.getElementById("select-category").value;
	const selectDifficulty = document.getElementById("select-difficulty").value;
	const selectType = document.getElementById("select-type").value;
	const formII = document.getElementById("formII");

	if (
		selectCategory !== "Select category" &&
		selectDifficulty !== "Select difficulty" &&
		selectType !== "selectType"
	) {
		fetch(
			`https://opentdb.com/api.php?amount=${numberQ}&category=${selectCategory}&difficulty=${selectDifficulty}&type=${selectType}`
		)
			.then((response) => response.json())
			.then((data) => addInfo(data));
	} else {
		formII.innerHTML = "";
		formII.innerHTML = `<div class="col-md-6" style="margin: auto;">
                                <div class="alert alert-info">
                                    <div class="alert-body">
                                    ¿Seguro no estas tomado? Selecciona todas las opciones 🤦‍♂️.
                                    </div>
                                </div>
                            </div>`;
	}
}

// Print the answers to the questions, check if the current answer within the loop is correct, if it is, it indicates that it is correct to its value, if not, it indicates that it is incorrect to its value
function addInfo(data) {
	for (let i = 0; i < data.results.length; i++) {
		question_correct.push(data.results[i].correct_answer);
	}
	question_correctT = [];
	question_correctT.push(...question_correct);
	console.log(question_correctT);
	question_correct = [];

	const button = document.createElement("button");
	const selectType = document.getElementById("select-type").value;
	button.textContent = "Submit Questions";
	button.classList.add("btn", "btn-primary", "button-add");
	const containerII = document.getElementById("containerII");

	containerII.lastElementChild.innerHTML = "";

	if (data.response_code == 0) {
		if (selectType === "multiple") {
			for (let i = 0; i < data.results.length; i++) {
				let newAr = [];
				newAr.push(...data.results[i].incorrect_answers);
				let datas = Math.round(Math.random() * 3);
				newAr.splice(datas, 0, data.results[i].correct_answer);
				containerII.lastElementChild.innerHTML += `<div class="col-md-6" style="margin: auto; margin-top: 30px;">
		        <div class="card">
			        <div class="card-body">
				        ${data.results[i].question}
			        </div>
			    <select id="Value-select${i}" style="width: 30%; display: inline-block;" class="form-select" aria-label="Default select example">
					<option id="${newAr[0]}" value="${newAr[0]}" style="margin: 5px; padding: 5px;">${newAr[0]}</option>
					<option id="${newAr[1]}" value="${newAr[1]}" style="margin: 5px; padding: 5px;">${newAr[1]}</option>
					<option id="${newAr[2]}" value="${newAr[2]}" style="margin: 5px; padding: 5px;">${newAr[2]}</option>
					<option id="${newAr[3]}" value="${newAr[3]}" style="margin: 5px; padding: 5px;">${newAr[3]}</option>
				</select>
		        </div>`;
			}
			containerII.lastElementChild.innerHTML += `<button id="buttonC" class="btn btn-primary button-add" style="margin-left: 338px; margin-top: 15px;">Submit Responses</button>`;
		} else {
			let TorF = ["False", "True"];
			for (let i = 0; i < data.results.length; i++) {
				containerII.lastElementChild.innerHTML += `<div class="col-md-6" style="margin: auto; margin-top: 30px;">
					<div class="card">
						<div class="card-body">
							${data.results[i].question}
						</div>
						<select id="Value-select${i}" style="width: 30%; display: inline-block;" class="form-select" aria-label="Default select example">
						    <option id="${TorF[0]}" value="${TorF[0]}" style="margin: 5px; padding: 5px;">${TorF[0]}</option>
						    <option id="${TorF[1]}" value="${TorF[1]}" style="margin: 5px; padding: 5px;">${TorF[1]}</option>
						</select>
					</div>`;
			}
			containerII.lastElementChild.innerHTML += `<button id="buttonC" class="btn btn-primary button-add form-check" style="margin-left: 338px; margin-top: 15px;">Submit Responses</button>`;
		}
	} else {
		containerII.lastElementChild.innerHTML += `<div class="col-md-6" style="margin: auto;">
			                                            <div class="alert alert-info">
			                                                <div class="alert-body">
															Chale... no se me ocurren las suficientes preguntas con esa consulta, no seas gacho y haz otra consulta mas facil 🤷‍♂️.
														    </div>
														</div>
			                                        </div>`;
	}
}

// When the form is submitted. Gets the value of the responses selected by the user. Then it goes through all the selected answers and validates if the selected answer is the correct answer, if it is, add 1 to the counter
function submitQ() {
	validateQuestions();
}

function validateQuestions() {
	const selectType = document.getElementById("select-type").value;
	const formII = document.getElementById("formII");
	let account = 0;

	console.log(question_correctT.length);
	if (selectType == "boolean") {
		for (let i = 0; i < question_correctT.length; i++) {
			console.log(document.getElementById(`Value-select${i}`).value);
			if (
				document.getElementById(`Value-select${i}`).value ===
				question_correctT[i]
			) {
				account++;
			}
		}
	} else {
		for (let i = 0; i < question_correctT.length; i++) {
			if (
				document.getElementById(`Value-select${i}`).value ===
				question_correctT[i]
			) {
				account++;
			}
		}
	}

	shoot=question_correctT.length-account; 


	formII.innerHTML = "";
	formII.innerHTML = `<div class="col-md-6" style="margin: auto;">
                            <div class="alert alert-info">
                                <div class="alert-body">
		                    	    Tuviste ${account} respuestas correctas de un total de ${question_correctT.length} preguntas
									Tendras que tomarte ${shoot} shot
                                </div>
                            </div>
                        </div>`;
	question_correctT = [];
}
