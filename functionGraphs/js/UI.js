function UI({ addFunction, delFunction }) {
    let num = 0;

    document.getElementById('addFunction').addEventListener('click', addClickHandler);
    document.getElementById('delFunction').addEventListener('click', delClickHandler);
    
    // доделать
    function addClickHandler() {
        const inputFunction = document.createElement('input');
        inputFunction.setAttribute('placeholder', 'функция № ' + (num + 1));
        inputFunction.dataset.num = num;
        inputFunction.addEventListener('keyup', keyupHandler);

        const colorInput = document.createElement('input');
        colorInput.setAttribute('type', 'color');
        colorInput.setAttribute('value', '#000000');
        
        const widthInput = document.createElement('input');
        widthInput.setAttribute('type', 'number');
        widthInput.setAttribute('placeholder', 'Ширина линии');

        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = 'Удалить';
        buttonDelete.addEventListener('click', () => {
            delFunction(inputFunction.dataset.num - 0);
            funcInputs.removeChild(inputFunction);
            funcInputs.removeChild(widthInput);
            funcInputs.removeChild(colorInput);
            funcInputs.removeChild(buttonDelete);
            num--
        });

        const funcInputs = document.getElementById('funcInputs');
        funcInputs.appendChild(inputFunction);
        funcInputs.appendChild(widthInput);
        funcInputs.appendChild(colorInput);
        funcInputs.appendChild(buttonDelete);

        num++
    }

    // переделать
    function delClickHandler() {
        const funcInputs = document.getElementById('funcInputs');
        while (funcInputs.firstChild) {
            funcInputs.removeChild(funcInputs.firstChild);
        }
        num = 0;
    }

    function keyupHandler() {
        try {
            let f;
            (eval(`f=function(x){return ${this.value};}`));
            addFunction(f, this.dataset.num - 0);
        } 
        catch (e) {
            console.log('ошибка ввода', e);
        }
    }
}