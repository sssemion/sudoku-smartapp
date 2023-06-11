    state: НовыйУровень
        q!: (~смени|измени) 
            [~уровень]
            $AnyText::anyText
            
        random:
            a: Сделано!
            a: Изменено!
            a: Обновлено!
            
        script:
            level($parseTree._anyText, $context);
            