# Baza Pytań
Aplikacja służąca jako FAQ dla medycznego środowiska w czasie pandemii koronawirusa, zrobiona na potrzeby wolontariatu.

## Instalacja
Instalacja aplikacji opiera się na menadżerze pakietów [npm](https://www.npmjs.com/).
```bash
git clone https://github.com/radziminski/baza-pytan-react
cd ./baza-pytan-react
npm install
```
## Uruchamianie
Aby uruchomić aplikację użyj 
```bash
npm start
```
Lub przejdź na stronę [baza-pytan-covid.netlify.com](https://baza-pytan-covid.netlify.com).

## Działanie
Aplikacja służy do zarządzania pulą pytań w formacie FAQ (Najczęściej zadawane pytania). Posiada pełen system logowania, z róznymi poziomami autoryzacji (użytkownik, recenzent, admin). 
### Dokładny opis
Każdy odwiedzający stronę może zobaczyć pytania i odpowiedzi, oraz szukać pytań po tytule lub słowach kluczowych.

![home](https://i.ibb.co/cNBjbSp/home-baza.jpg)

Każdy może się też zarejestrować i logować przy użyciu emaila.

![login](https://i.ibb.co/wsMs4rC/baza-pytan-login.jpg)

Każda zarejestrowana i zalogowana osoba (użytkownik) może dodawać pytania oraz je edytować (tylko te których jest autorem). Dodane w ten sposób pytanie trafia do recenzji (nie jest widoczne w puli wszystkich pytań). Jeśli pytanie jest oznaczone na szaro, oznacza to że zostało ono odrzucone i należy je edytować (aby ponownie trafiło do recenzji). 

![pytania](https://i.ibb.co/wKx4bXy/baza-pytan-edit.jpg)

Każdy użytkownik może również przeglądać i edytować swoje dane oraz zmienić swoje hasło. Może on także całkowicie usunąć swoje konto. 

![data](https://i.ibb.co/gT1r8Fr/baza-pytan-dane.jpg)

Administrator może mianować danego użytkownika na recenzenta. Recenzent może przeglądać i edytować pytania wysłane do recenzji, a następnie je akceptować lub odrzucać (ewentualnie całkowicie usuwać). Po akceptacji, pytanie trafia do puli wszystkich pytań, widoczych na stronie głównej. Jeśli recenzent zdecyduje się odrzucić pytanie, wraca ono do autora odpowiednio oznaczone (na szaro). Jeśli autor  zedytuje pytanie (poprawi je) ponownie trafia ono do recenzji.

![rec](https://i.ibb.co/Ch8MG33/recenz-baza.jpg)

Recenzent może również włączyć tryb edycji wszystkich pytań, gdzie może dodawać, edytować i usuwać pytania bezpośredino z puli wszystkich pytań.

![all](https://i.ibb.co/J5v0wqV/baza-try-ed.jpg)

Administrator może również mianować innych administratorów, którzy mają wszystkie funkcje recenzentów oraz mogą mianować innych użytkowników na recenzentów/administratorów.

![admin](https://i.ibb.co/1JRC5xF/baza-admin.jpg)

##  Użyte technologie
- React (biblioteka Javascript) [Frontend]
- Firebase [Backend]
- SCSS preprocessor
- Redux
- Webpack
- Deployed on [Netlify](https://baza-pytan-covid.netlify.app/)

## License
Copyright by Jan Radzimiński. All rights reserved.
