var questions = [
    {
        id: '1', 
        Name:'Conjugaison, accords, orthographe,...', 
        Question: 'Quel mot dans le dictionnaire est écrit incorrectement', 
        Anwser : 'incorrectement',
        Link: 'https://www.youtube.com/embed/H7HmzwI67ec',
        GivenAnswer: ''
    },
    {
        id: '2', 
        Name:'Le grand voyageur.', 
        Question: "Qu'est ce qui fait le tour du monde tout en restant dans son coin!", 
        Anwser : 'timbre',
        Link: 'https://www.youtube.com/embed/OJGUbwVMBeA',
        GivenAnswer: ''
    },
    {
        id: '3', 
        Name:"L'histoire du pauvre aveugle.", 
        Question: "Qu'est ce qui a des yeux mains ne peux pas voir?", 
        Anwser : 'aveugle',
        Link: 'https://www.youtube.com/embed/kxopViU98Xo',
        GivenAnswer: ''
    },
    {
        id: '4', 
        Name:'Faillite!', 
        Question: "Un homme pousse son auto le long d'une route lorsqu'il arrête devant un hôtel. Il crie alors 'Je viens de faire faillite'. Pourquoi?", 
        Anwser : 'monopoly',
        Link: 'https://www.youtube.com/embed/F57P9C4SAW4',
        GivenAnswer: ''
    },
    {
        id: '5', 
        Name:'Un fantome?', 
        Question: "Je suis plus léger qu'une plume, mais même un troll ne peut me retenir longtemps. Qui suis-je?", 
        Anwser : 'souffle',
        Link: 'https://www.youtube.com/embed/_r0n9Dv6XnY',
        GivenAnswer: ''
    },
    {
        id: '6', 
        Name:'Wut?!?!?!', 
        Question: 'Je viens de voir un cavalier sauter par dessus une tour et attérir sur un homme qui disparait et je ne suis pas étonné. Pourquoi?', 
        Anwser : 'échec',
        Link: 'https://www.youtube.com/embed/t3jKtjgRZQY',
        GivenAnswer: ''
    },
    {
        id: '7', 
        Name:'Los profitaros.', 
        Question: "Qu'est ce que tu possèdes, mais que ce sont les autres qui l'utilisent plus que toi?", 
        Anwser : 'nom',
        Link: 'https://www.youtube.com/embed/8uySNTFJMec',
        GivenAnswer: ''
    },
    {
        id: '8', 
        Name:"I don't know that! AAAaaaaaaaaaaahhhhhhh!", 
        Question: 'What is the air-speed velocity of an unladen swallow?', 
        Anwser : "african or european swallow",
        Link: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        GivenAnswer: ''
    }
];


if(document.cookie == "")
{
    document.cookie = JSON.stringify(questions);
    console.log("New cookie");
}

var cookie = JSON.parse(document.cookie);
console.log("Current cookie: " +  JSON.stringify(cookie));


var answer_id_template = "answer_";
var link_id_template = "link_";


//List item transform
var transforms = {
    
    "question":{"<>":"div", "class":"question", "html":[
        {"<>":"h3","html":"${Name}"},
        {"<>":"p","html":"Question: ${Question}"},
        {"<>":"input","type":"text", "id":answer_id_template+"${id}", "name":"reponse","html":""},
        {"<>":"button","type":"button", "id":"${id}","html":"Répondre", 'onclick': function(){
            var id = $(this).attr('id');

            // Find appropriate element
            function findElementById(element) {
                return element.id >= id;
            }

            var element = cookie.find(findElementById);

            var input_id = answer_id_template + id;
            var answer = $('#'+input_id).val();

            checkAnswer(answer, element)
        }},
        {"<>":"iframe", "id" : link_id_template+"${id}", "style":"display:none;","src":"${Link}"}
    ]
    }
}

// Unlock link if answered correctly
function checkAnswer(answer, question, cookie_checking){

    if (typeof(cookie_checking)==='undefined') cookie_checking = false;

    if(answer.toLowerCase().indexOf(question.Anwser.toLowerCase()) !== -1)
    {
        //console.log("Good answer " + answer);

        question.GivenAnswer = answer;
        document.cookie =  JSON.stringify(cookie);

         var input_id = answer_id_template + question.id;
         var button_id = question.id;
         var link_id = link_id_template + question.id;

         $('#'+ input_id).hide();
         $('#'+ button_id).hide();
         $('#'+ link_id).show();
    }
    else{
        //console.log("Wrong! you entered: " + answer + " and the answer was: " + question.Anwser);

        // if(!cookie_checking)
        // {
        //     var wrong = document.getElementById("wrong");
        //     wrong.play() 
        // }

    }
}

// When page finished to load: generate html + unlock question
$(function(){
    // Generate questions
    $('#plug').json2html(questions,transforms.question);

    // Unlock already answered question
    cookie.forEach(function checkCookie(element){
        checkAnswer(element.GivenAnswer, element, true);
    });
});


// OnClick Method

function resetCookie()
{
    document.cookie = "";
    location.reload();
}

function lastValidation()
{
     var tentative = $('#final_answer').val().toLowerCase();

     if(tentative == "the millennial whoop" || tentative == "millennial whoop")
     {
         var final = document.getElementById("final");
         final.innerHTML = "Mot de passe de DP2: patato9876543210!"
     }
     else{
        var wrong = document.getElementById("wrong");
        wrong.play() 
     }
}

