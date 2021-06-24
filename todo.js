$(function (keyframes, options) {
// Задача: создать список дел с возможностью удаления/добавления пунктов
    let $list = $('#ul');
    let $newItemButton = $('#newItemButton');
    let $itemDescription = $('#itemDescription');
    let $newItemForm = $('#newItemForm');
    let itemText = ''; //будет хранить текст из текстового поля
    let $li = $('li');
    // скрываем начальный список и затем плавно его выводим по элементно с задержкой
    $li.hide().each(function (index) {
        $(this).delay(1050 * index).fadeIn(2000); //задержка перед появлением элемента fadeIn - плавное появление, посредством свойства opaciry
    });

    //показать количество дел
    function updateCounter() {
        $('#counter').text($('li').length);
    }

    updateCounter();
    //подготовка к добавлению элементов
    $newItemForm.hide();
    $('#showForm').on('click', function (event) {
        event.preventDefault();// позволяет отменить стандартную функциональность элемента. Пример: если прописать e.preventDefault() для ссылки, то это отменит переход по ней, но само события клика будет работать
        $newItemButton.hide();
        $newItemForm.show();
    });
    //добавление нового элемента списка
    $newItemForm.on('submit', function (e) {
        e.preventDefault();
        const text = $itemDescription.val().trim();// берем значение атрибута
        if (text.length !== 0) {
            //.trim()  - убирает пробелы табуляцию, переносы на новую строку

            $list.append(`<li>${text}</li>`);
            $itemDescription.val('');
            updateCounter();
        }
    })
    //удаление элементов, при нажатии на элемент подсвечивыаем красным и опускаем вниз, при повторном нажатии - удаляет
    $list.on('click', 'li', function (keyframes, options) {
        let $elem = $(this); //кэширует элемент
        let $complete = $elem.hasClass('complete'); //проверяент есть класс, возврашает True
        if ($complete) {
            $elem.animate({opacity: 0, paddingLeft: '+=180px'}, 2000, 'swing', () => {
                $elem.remove();
                updateCounter();
            });
        } else {
            itemText = $elem.text(); //еру текст из нажатого элемента
            $elem.remove();
            // добавление в конце списка с классом complete
            $list.append(`<li class="complete">${itemText}</li>`).hide().fadeIn(1500)
        }
    })
});