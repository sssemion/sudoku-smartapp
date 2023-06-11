theme: /

    state: ПроверкаПоля
        q!: (~проверить|проверь)
            $AnyText::anyText
        
        script:
            var item_id = get_id_by_selected_item(get_request($context));
            check(item_id,$context);
        
        random:
            a: Ок!
            a: Проверяю!
            a: Хорошо!