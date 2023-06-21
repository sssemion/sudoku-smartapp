require: scripts.js

require: dicts/answers.yaml
  var = $Answers

require: common.js
  module = sys.zb-common
  
init:
    bind("onAnyError", function($context) {
        $reactions.answer($Answers["Error"]);
    });
    
    if (!$global.$converters){
        $global.$converters = {};
    }
    

theme: /

    state: Start
        q!: * *start
        q!: (запусти | открой | вруби) Судоку
        a: Привет! Сыграем в судоку?
        script:
            $jsapi.startSession();
    
    state: Yes
        q!: (да/конечно/хочу/давай) *
        a: Тогда начнем! || auto_listening = false
    
    state: No
        q!: (нет/не) *
        a: Ну и ладно! || auto_listening = false
        script:
            addAction({type: "quit"}, $context);

    state: Replay
        q!: * (заново/еще раз/повтор/по новой/переигра*/реванш) *
        a: Выберите сложность
        buttons:
            "Легко" -> /Replay/Easy
            "Средне" -> /Replay/Medium
            "Сложно" -> /Replay/Hard
            
        state: Easy
            q: * (легк*/изи/прост*) * || fromState = /Replay, onlyThisState = true
            a: Легко так легко! || auto_listening = false
            script: 
                replayWithDifficulty("easy", $context);
            
        state: Medium
            q: * (средн*/медиум) * || fromState = /Replay, onlyThisState = true
            a: Уверен, у вас получится! || auto_listening = false
            script: 
                replayWithDifficulty("medium", $context);
            
        state: Hard
            q: * (сложн*/хард/тяжел*) * || fromState = /Replay, onlyThisState = true
            a: Удачи! || auto_listening = false
            script: 
                replayWithDifficulty("hard", $context);
                
    state: Validate
        q!: * (проверь/проверяй/готово/закончил*/завершил*/проверка/правильно) *
        a: Проверяю || auto_listening = false
        script:
            addAction({type: "validate"}, $context);
            
    state: Rules
        q!: * (правила/помоги*/помощь/не получается/не умею/как играть/что делать) *
        script:
            $reactions.answer($Answers["Rules"]);
    
    state: CatchAll
        q!: *
        event!: noMatch
        a: К сожалению, я не понимаю. Я могу рассказать правила игры, начать игру заново, или проверить поле, если вы уже завершили игру
