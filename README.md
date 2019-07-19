# Твиттер на React

##### Запуск:
    npm run start
    in folder server -> npm run start
    
Можно войти используя nickName password в /store/data/users.json
Либо просто зарегистрироваться

###### Основной функционал:
<ol>
    <li>Регистрация/Авторизация</li>
    <li>Твит: 
        <ul>
            <li>добавить</li>
            <li>удалить</li>
            <li>изменить</li>
            <li>комментировать</li>
            <li>лайкнуть</li>
            <li>заблокировать пользователя</li>
        </ul>
    </li>
    <li>Страница пользователя:
        <ul>
            <li>вывод Никнейма и имени</li>
            <li>подписаться/отписаться</li>
            <li>добавить/удалить ЧС</li>
            <li>количество твитов</li>
            <li>количество подписчиков</li>
            <li>количество подписок</li>
            <li>просмотр твитов</li>
            <li>просмотр подписчиков</li>
            <li>просмотр подписок</li>
        </ul>
    </li>
    <li>Моя страница:
        <ul>
            <li>вывод Никнейма и имени</li>
            <li><s>подписаться/отписаться</s></li>
            <li><s>добавить/удалить ЧС</s></li>
            <li>количество твитов</li>
            <li>количество подписчиков</li>
            <li>количество подписок</li>
            <li>просмотр подписчиков</li>
            <li>просмотр подписок</li>
            <li><u>просмотр моих твитов</u></li>
            <li><u>просмотр чужих твитов</u></li>
            <li><u>добавить твит</u></li>
            <li><u>изменить аватар</u></li>
        </ul>
    </li>
    <li>Комментарий:
        <ul>
            <li>вывод Никнейма и имени</li>
            <li>текст комментария</li>
            <li>удалить свой комментарий</li>
        </ul>
    </li>
</ol>

##### Структура хранилища

Пользователи (users)


    {
        "id": 0,
        "name": "Рома",
        "nickName": "romashka",
        "password": "asdasd",
        "avatar": "url img",
        "tweets": [0, 1],       // ид твитов
        "following": [1],       // ид подписок
        "followers": [1, 2]     // ид подписчиков
        "ignoreList": []
    }
   
Список твитов (tweets)

    
    {
        "id": 0,
        "createUserId": 0,
        "text": "Привет",
        "likes": [1],   // ид пользователей, кот-тые лайкнули
        "commentsId": [0],  // ид комментариев
        "dateCreate": "2019-06-20T10:11:38.207Z",
        "img":[],   // ссылки на картники
        "idVideos":[]   // список ид видео из ютуба
    }

Комментарии (comments)

    {
        "id": 0,
        "createUserId": 0,
        "text": "My firs comment",
        "dateCreate": "2019-06-20T10:11:38.207Z"
    }

