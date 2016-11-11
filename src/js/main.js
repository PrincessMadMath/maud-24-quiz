var questions = [
    {
        id: '1', 
        Name:'Question #1', 
        Question: 'Hum sup?', 
        Anwser : 'potato',
        Link: 'https://www.youtube.com/embed/H7HmzwI67ec',
        GivenAnswer: ''
    },
    {
        id: '2', 
        Name:'Question #2', 
        Question: 'Hum sup2?', 
        Anwser : 'potato2',
        Link: 'https://www.youtube.com/embed/OJGUbwVMBeA',
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
function checkAnswer(answer, question){

    if(answer.toLowerCase() == question.Anwser.toLowerCase())
    {
        console.log("Good answer " + answer);

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
        console.log("Wrong! you entered: " + answer + " and the answer was: " + question.Anwser);
    }
}

function resetCookie()
{
    document.cookie = "";
    location.reload();
};

// When page finished to load: generate html + unlock question
$(function(){
    // Generate questions
    $('#plug').json2html(questions,transforms.question);

    // Unlock already answered question
    cookie.forEach(function checkCookie(element){
        checkAnswer(element.GivenAnswer, element);
    });
});


