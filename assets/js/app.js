
let Note = []

function catText() {
    const textNote = document.querySelector('.input__tarefa').value;

    if (textNote.trim() !== "") {
        const newItem = {
            id: Note.length + 1,
            text: textNote,
        }

        Note.push(newItem)
        inserePagina()
        clear()
    }
    else {
        alert("Digite texto válido")
    }
}


function inserePagina() {

    const areaNote = document.querySelector('.tarefa__area');
    areaNote.innerHTML = '';

    Note.forEach((nota) => {
        const div = document.createElement('div');
        const texto = document.createElement('p');


        texto.className = "text__iten"
        div.className = "tarefa__container";

        if (nota.color) {
            div.classList.add(nota.color);
        }

        texto.textContent = nota.text;

        div.appendChild(texto)
        areaNote.appendChild(div);

    })
    insereButtons();
}

function insereButtons() {
    const areaNoteAll = document.querySelectorAll('.tarefa__container');

    areaNoteAll.forEach(areaNote => {
        if (areaNote.querySelector('.colors__area')) {
            console.warn('Botões já inseridos');
            return;
        }


        const divArea = document.createElement('div');
        divArea.className = 'colors__area';

        const buttons = [
            { class: 'btn__done', text: '✔️', color: 'colorDone' },
            { class: 'btn__do', text: '⏳', color: 'colorDo' },
            { class: 'btn__later', text: '🕒', color: 'colorLater' },
            { class: 'btn__edit', text: '✏️' },
            { class: 'btn__remove', text: '❌' }
        ];

        buttons.forEach(({ class: className, text, color: color }) => {
            const button = document.createElement('button');
            button.className = className;
            button.classList.add(color)
            button.textContent = text;
            divArea.appendChild(button);
        });


        areaNote.appendChild(divArea)

    });
}


function clear() {
    const textNote = document.querySelector('.input__tarefa')
    textNote.value = ''
}

document.addEventListener('click', (event) => {
    const elemento = event.target

    if (elemento.classList.contains('btn__add')) {
        catText();
    }

    if (elemento.matches(".btn__done, .btn__do, .btn__later")) {
        changeColor(elemento)
        catColor(elemento);
    }

    if (elemento.classList.contains('btn__edit')) {
        editText(elemento);
    }

    if (elemento.classList.contains('btn__remove')) {
        removeItem(elemento);
    }
    if (elemento.classList.contains('btn__ok')) {
        closeEdit(elemento);
    }
});

function changeColor(elemente) {
    const container = elemente.closest('.tarefa__container');
    if (!container) return;

    // Mapeando os botões para as cores
    const colors = {
        'btn__done': 'colorDone',
        'btn__do': 'colorDo',
        'btn__later': 'colorLater'
    };

    // Itera sobre o objeto colors para verificar qual classe foi clicada
    for (let classe in colors) {
        if (elemente.classList.contains(classe)) {
            // Remove as classes anteriores de cor, se houver
            for (let otherClasse in colors) {
                if (otherClasse !== classe) {
                    container.classList.remove(colors[otherClasse]);
                }
            }
            // Alterna a classe correspondente ao botão clicado
            container.classList.toggle(colors[classe]);
            break;
        }
    }

}

function catColor(elemente) {
    const classElemento = elemente.classList[1]
    const container = elemente.closest('.tarefa__container');
    const conteudo = container.querySelector('.text__iten').innerHTML;

    for (let i = 0; i < Note.length; i++) {
        if (Note[i].text == conteudo) {
            Note[i].color = classElemento;
        }
    }

}

function editText(elemente) {
    const ediFiel = document.createElement('textarea');
    const parent = elemente.closest('.tarefa__container');
    const areEdit = document.createElement('div')
    const buttonOk = document.createElement('button')
    const areatext = parent.querySelector('.text__iten');
    const buttonsArea = parent.querySelector('.colors__area');


    areEdit.className = 'area__edit__container'
    buttonOk.className = 'btn__ok'
    buttonOk.innerHTML = '✔️';
    ediFiel.className = 'edit__field';


 
    if (areatext && buttonsArea) {
        areatext.classList.toggle('hidde');
        buttonsArea.classList.toggle('hidde')
    }

    areEdit.appendChild(ediFiel);
    areEdit.appendChild(buttonOk);
    parent.appendChild(areEdit);

    
    const textArea = parent.querySelector('.edit__field')

    for (let i = 0 ; i < Note.length ; i++) {
        if (areatext.innerHTML == Note[i].text) {
           textArea.innerHTML = Note[i].text 
        }
    }



    if (parent.classList == 'tarefa__container') {
        textArea.classList.toggle('tarefa__container')
    }
    if (parent.classList[1] == 'colorDone') {
        textArea.classList.toggle('colorDone')
    }
    if (parent.classList[1] == 'colorDo') {
        textArea.classList.toggle('colorDo')
    }
    if (parent.classList[1] == 'colorLater') {
        textArea.classList.toggle('colorLater')
    }
}

function closeEdit(elemente) {
    const parent = elemente.closest('.tarefa__container');
    const ediFiel = parent.querySelector('.area__edit__container');
    const areatext = parent.querySelector('.text__iten');
    const buttonsArea = parent.querySelector('.colors__area');
    const textArea = parent.querySelector('.edit__field')

    if (areatext && ediFiel) {
        areatext.classList.remove('hidde');
        buttonsArea.classList.remove('hidde');
    };



    for (let i = 0 ; i < Note.length ; i++) {
        if (areatext.innerHTML == Note[i].text) {
            Note[i].text = textArea.value;
            areatext.innerHTML = Note[i].text;
        }
    }
    console.log(Note)

    ediFiel.remove();
}

function removeItem(elemente) {
    const container = elemente.closest('.tarefa__container');
    const conteudo = container.querySelector('.text__iten').innerHTML;

    for (let i = 0; i < Note.length; i++) {
        if (Note[i].text == conteudo) {
            Note.splice(i, 1)
        }
    }

    container.remove();
}



