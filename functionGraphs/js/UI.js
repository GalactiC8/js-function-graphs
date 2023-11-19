function UI ({addFunction,delFunction}) {
    let num = 0;
    document.getElementById('addFunction').addEventListener('click', addClickHandler);
    function addClickHandler() {
        const input = document.createElement('input');
        input.setAttribute('placeholder','функция № ' + (num+1));
        input.dataset.num = num;
        input.addEventListener('keyup', keyupHandler);
        const button = document.createElement('button');
        button.innerHTML='Удалить';
        button.addEventListener('click', () => {
            delFunction(input.dataset.num - 0);
            funcInputs.removeChild(input);
            funcInputs.removeChild(button);
        });
        const funcInputs = document.getElementById('funcInputs');
        funcInputs.appendChild(input);
        funcInputs.appendChild(button);
        num++
        }
        function keyupHandler() {
            try {let f;
            eval ('f=function(x){return'+this.value+';}');
            addFunction(f,this.dataset.num - 0);
        } catch(e) {
            console.log('ошибка ввода',e);
        }
    }
}