theme: /

    state: НовоеПоле
        q!: (~обнови|~поменяй|сделай) 
            [~поле|~клетка|~задание|~задача]
            $AnyText::anyText
            
        random:
            a: Сделано!
            a: Изменено!
            a: Обновлено!
            
        script:
            newpole($parseTree._anyText, $context);
            