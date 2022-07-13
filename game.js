let choise = [];  //עבור בחירת גודל המשחק

let players = []; //עבור רישום השחקנים

let openedCard = [];  // עבור מעקב אחרי התקדמות המשחק 

let counter = 0; // עבור וידוא שנבחרו כרטיסים שונים וסגורים

let winCounter = 0; // עבור סיום המשחק

let card1 = -1; //הכרטיס הראשון שנבחר בכל תור

let card2 = -1;  //הכרטיס השני שנבחר בכל תור

let winner = -1; // מציאת השחקן המנצח

let playersName = []; // עבור שמירת שם השחקן הראשון לפני יצירת האובייקט של השם שלו והניקוד

let playersName1 = '';  // עבור שמירת שם השחקן הראשון לפני יצירת האובייקט של השם שלו והניקוד
let playersName2 = '';  // עבור שמירת שם השחקן השני לפני יצירת האובייקט של השם שלו והניקוד

const bg = document.getElementById('bg'); // רקע של המשחק

let Buttons = [{ // כרטיסי המשחק
    name: 'Hard',
    content: ['<img src="design/1.jpg">', '<img src="design/1.jpg">', '<img src="design/2.jpg">', '<img src="design/2.jpg">', '<img src="design/3.jpg">', '<img src="design/3.jpg">', '<img src="design/4.jpg">', '<img src="design/4.jpg">', '<img src="design/5.jpg">', '<img src="design/5.jpg">', '<img src="design/6.jpg">', '<img src="design/6.jpg">', '<img src="design/7.jpg">', '<img src="design/7.jpg">', '<img src="design/8.jpg">', '<img src="design/8.jpg">', '<img src="design/9.jpg">', '<img src="design/9.jpg">'],

},
{
    name: 'Easy',
    content: ['<img src="design/1.jpg">', '<img src="design/1.jpg">', '<img src="design/2.jpg">', '<img src="design/2.jpg">', '<img src="design/3.jpg">', '<img src="design/3.jpg">', '<img src="design/4.jpg">', '<img src="design/4.jpg">', '<img src="design/5.jpg">', '<img src="design/5.jpg">', '<img src="design/6.jpg">', '<img src="design/6.jpg">']
}]

let shuffledcards = []; // עבור ערבוב החבילה לפני כל משחק


let thisplayer = 0; // עבור מעקב אחרי התורות

setTimeout(() => {   // מסך פתיחה של 3 שניות ואז מתחילים
    bg.innerHTML = "body {background-image: url('design/lbg.jpg');}";
    GetPlayersNum()
}, 3000);


function GetPlayersNum() {  // בחירת מספר השחקנים
    const howmanyplayers = document.getElementById('start');
    const pln = document.createElement('div');
    pln.innerHTML = `<img id="hmp" src="design/howmany.jpg"><br></br>
    <img src="design/1p.jpg" id="hmp" onclick ="RegPlayers(1)" style="padding-left : 120px"><br></br>
    <img src="design/2p.jpg" id="hmp" onclick ="RegPlayers(2)" style="padding-left : 120px">`


    howmanyplayers.append(pln)
}


function RegPlayers(playernum) { // רישום שמות השחקנים 
    const start = document.getElementById('start');
    start.replaceChildren();
    if (playernum == 1) {
        const formname = document.createElement('form')
        formname.id = "formname"
        start.appendChild(formname);

        const pl1 = document.createElement("INPUT");
        pl1.setAttribute("type", "text");
        pl1.id = 'pl1'
        pl1.setAttribute("placeholder", "name 1");
        pl1.className = ['pl1', 'formname']
        formname.appendChild(pl1);
        const btp = document.createElement('button');
        btp.innerText = "continue";
        btp.id = "btp"
        btp.className = "formname"
        btp.addEventListener('click', (e) => {
            e.preventDefault();
            playersName1 = document.getElementById("pl1").value;
            playersName.push(document.getElementById("pl1").value)
            if (playersName1) {
                ChooseCard(playernum)
            }
        })
        formname.append(pl1, btp);
    }
    else {
        const formname = document.createElement('form')
        formname.id = 'formname'
        start.appendChild(formname);

        const pl1 = document.createElement("INPUT");
        pl1.setAttribute("type", "text");
        pl1.className = "formname pl1"
        pl1.setAttribute("id", "pl1");
        pl1.setAttribute("placeholder", "name 1");
        pl1.setAttribute("required", "required");
        const pl2 = document.createElement("INPUT");
        pl2.setAttribute("type", "text");
        pl2.className = ("formname pl2")
        pl2.setAttribute("id", "pl2");
        pl2.setAttribute("placeholder", "name 2");
        pl2.setAttribute("required", "required");
        formname.appendChild(pl1);
        formname.appendChild(pl2);
        const btp = document.createElement('button');
        btp.innerText = "continue";
        btp.id = "btp"
        btp.className = 'formname'
        btp.addEventListener('click', (e) => {
            e.preventDefault();
            playersName1 = document.getElementById("pl1").value;
            playersName2 = document.getElementById("pl2").value;
            playersName.push(document.getElementById("pl1").value, document.getElementById("pl2").value)

            if (playersName1 && playersName2) {
                ChooseCard(playernum)
            }
        })
        formname.append(pl1, pl2, btp);
    }
}




//*** */
function ChooseCard(playernum) { // מעבר ממסך של הזנת שמות השחקנים למסך לבחירת רמת הקושי 
    const start = document.getElementById('start');
    start.remove();
    const Btns = document.getElementById("buttons");
    Btns.className = "formname";
    const btp = document.createElement('div');
    btp.innerText = "Select a difficulty level";
    // btp.id = "btp"
    btp.className = "headlinedif"
    // btp.className = 'formname'
    Btns.appendChild(btp)
    for (i in Buttons) {
        let Button1 = CreateButton(Buttons, i, playernum);
        Btns.appendChild(Button1);
    }
    // ReMa()
}
//*** */
function CreateButton(Buttons, idx, playernum) { //בחירת רמת הקושי
    const Buttonel = document.createElement('button');
    Buttonel.innerHTML = `${Buttons[idx].name}`;
    Buttonel.id = 'btd';
    Buttonel.className = 'btn';
    Buttonel.addEventListener("click", () => {
        choise = Buttons[idx].content;
        Shuffle(choise, idx, playernum)

    })
    return Buttonel
}

//*** */

function Shuffle(choise, idx, playernum) {// ערבוב חבילת הכרטיסים שנבחרה
    shuffledcards = choise.sort((a, b) => 0.5 - Math.random());
    newcards(shuffledcards, idx, playernum)

}

//*** */

function newcards(shuffledcards, idx, playernum) {// יצירת לוח המשחק 
    if (Buttons[idx].name == 'Hard') {
        const board1 = document.getElementById("board1")
        board1.remove();
        const board = document.getElementById("board");
        board.classList = ("board end");
        for (i in shuffledcards) {
            let element1 = createcard(i, idx)
            board.appendChild(element1);
        }
    }
    else {
        const board = document.getElementById("board")
        board.remove();
        const board1 = document.getElementById("board1")
        board1.classList = ("board1 end");
        for (i in shuffledcards) {
            let element1 = createcard(i, idx) //קריאה לפונקציית יצירת הכרטיסים
            board1.appendChild(element1);
        }
    }
    const Btns = document.getElementById("buttons");
    Btns.remove();
    bg.innerHTML = "body {background-image: url('design/gbg1.jpg');}";
    createplayer(playernum);
}

//*** */
function createplayer(playernum) { // יצירת "לוח" עם שם וניקוד לכל שחקן
    for (i = 0; i < playernum; i++) {
        const PlayersBoard = document.getElementById('players');
        players.push({ name: playersName[i], score: 0 })
        let player = document.createElement('div');
        player.style = "padding-left :285px"
        player.innerHTML = `
              <h1 class="card-title">${players[i].name}</h1>
              <p class="card-text">your score is ${players[i].score}</p>`;


        player.id = `${players[i].name}`;
        PlayersBoard.append(player);
    }

    let ScoreUd = document.getElementById(`${players[thisplayer].name}`)
    ScoreUd.classList.add("pln")
}
// WhoPlayNow(thisplayer)
function WhoPlayNow(thisplayer) {
    const PlayNow = document.getElementById(`${players[thisplayer].name}`)
    PlayNow.style = "font"
    let PlayNow1 = document.createElement('div')
    PlayNow1.id = "playnow1"
    PlayNow1.className = "counter"
    PlayNow1.innerHTML = `${players[thisplayer].name} play now`
    PlayNow.append(PlayNow1)
}




//*** */

function createcard(i, idx) { // יצירת הכרטיסים - בתוך התכונות שלהן נמצאים חוקי המשחק
    const cardel = document.createElement("div")
    cardel.innerHTML = '<img src="design/cb.png" >';
    cardel.id = i;

    cardel.className = 'card';
    cardel.addEventListener("click", () => {
        cardel.innerHTML = Buttons[idx].content[i];                 //כרטיס פתוח
        counter += 1;
        if (i != card1) {
            SelectedCCards(i)
        }
    })

    //*** */


    function SelectedCCards(i) {            //בחירת כרטיסים לבדיקה
        if (card1 == -1) {
            card1 = i;

            if (openedCard.includes(card1)) {    //וידוא שנבחרו שהכרטיס לא פתוח 
                card1 = -1;


            }
        }
        else {
            card2 = i;
            if (openedCard.includes(card2)) {// וידוא שהכרטיס שנבחר לא פתוח
                card2 = -1;
                counter -= 1;

            }

            else if (card1 && card2) { //בדיקה שנבחרו שני כרטיסים

                isMatch(idx);
            }
        }
    }

    //*** */

    function isMatch(idx) {// בדיקת התאמה לכרטיסים שנבחרו

        if (Buttons[idx].content[card1] == Buttons[idx].content[card2]) {//השוואת שני הכרטיסים שנבחרו
            openedCard.push(card1, card2);//הכנסת הכרטיסים למערך של כרטיסים שנמצאו

            players[thisplayer].score += 100;
            let ScoreUd = document.getElementById(`${players[thisplayer].name}`)

            ScoreUd.innerHTML = `<h1 class="card-title">${players[thisplayer].name}</h1>
            <p class="card-text">your score is ${players[thisplayer].score}</p>`;//הוספת ניקוד 

            if (openedCard.length == Buttons[idx].content.length) {//בדיקה האם הגיע סיום המשחק
                setTimeout(() => {
                    whoisthewinner()// קריאה לפונקציה שבודקת מי ניצח
                    if (openedCard.length == 18) {
                        const endGame = document.getElementById("board");
                        endGame.replaceChildren();
                        bg.innerHTML = "body {background-image: url('design/vbg.jpg');}"
                        const PlayersBoard = document.getElementById('players');
                        PlayersBoard.remove();
                        const theWinner = document.createElement('div');
                        theWinner.id = "winner"
                        theWinner.innerHTML = `${players[winner].name}`
                        endGame.appendChild(theWinner);
                    }
                    else {
                        const endGame = document.getElementById("board1");
                        endGame.replaceChildren();
                        bg.innerHTML = "body {background-image: url('design/vbg.jpg');}"

                        const PlayersBoard = document.getElementById('players');
                        PlayersBoard.remove();
                        const theWinner = document.createElement('div');
                        theWinner.id = "winner"
                        theWinner.innerHTML = `${players[winner].name}`
                        endGame.appendChild(theWinner);
                    }



                }, 750);
            }
        }
        else {   // הכרטיסים לא תואמים ולכן צריך להפוך אותם שוב

            let a = card1;
            let b = card2;
            debugger
            setTimeout(() => {

                document.getElementById(a).innerHTML = '<img src="design/cb.png" >';
                document.getElementById(b).innerHTML = '<img src="design/cb.png" >';
            }, 1000);
            let ScoreUd = document.getElementById(`${players[thisplayer].name}`)
            ScoreUd.classList.remove("pln")
            playerturn();//קריאה לפונקציית החלפת תור
        }
        counter = 0;  // חזרה למשחק
        card1 = -1;
        card2 = -1;
    }



    return cardel;
}



// playerturn(thisplayer)

function playerturn() { //החלפת תור אחרי שנבחרו כרטיסים לא תואמים
    thisplayer += 1;
    if (thisplayer == players.length) {
        thisplayer = 0;
    }

    let ScoreUd = document.getElementById(`${players[thisplayer].name}`)
    ScoreUd.classList.add("pln")
    return thisplayer;
}




function whoisthewinner() {// בדיקה מי המנצח של המשחק
    let highscore = 0;

    for (i in players) {
        if (players[i].score > highscore) {
            highscore = players[i].score
            winner = i;
        }

    }
}











function ReMa() {// אפשרות להתחיל מחדש
    // const Btns = document.getElementById("buttons");
    const Rematch = document.createElement('button');
    Rematch.innerHTML = 'Do you want to start over?';
    Rematch.id = 'Remach';
    Rematch.className = 'Remach';
    Rematch.className = 'game';
    Btns.appendChild(Rematch);
    Rematch.addEventListener("click", () => {
        shuffledcards = [];
        choise = [];
        players = [];
        openedCard = [];
        counter = 0;
        winCounter = 0;
        card1 = '';
        card2 = '';
        winner = 0;
        Buttons = [{
            name: 'Icons',
            content: ["💓", "💓", "💖", "💖", "💘", "💘", "💕", "💕", "💝", "💝", "💌", "💌", "💑", "💑", "💔", "💔", "💛", "💛"]
        },
        {
            name: 'Pics',
            content: ['<img src="pictures/IMG_sushi.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_bowling.png.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_bowling2.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_chocolate.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_hat.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_pirate.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_popcorn.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_snow.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_princess.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_sushi.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_bowling.png.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_bowling2.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_chocolate.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_hat.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_pirate.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_popcorn.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_snow.jpg" width="151.04" height="174.8">', '<img src="pictures/IMG_princess.jpg" width="151.04" height="174.8">']
        }]
        const Removes = document.querySelectorAll('.game');
        Removes.forEach(game => { game.remove(); });

        StartOver()
    })
    function StartOver() {
        playernum = Number(prompt('How many players?'));
        createplayer(playernum);
    }


}
