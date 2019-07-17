class PianoKey {
    constructor(character, keycode, keyb) {
        this.character = character;
        this.keycode = keycode;
        this.keyb = keyb;
    }

    createKey(text = '-') {
        const pianokey = document.createElement('div');
        const pianokeySpan = document.createElement('span');
        
        pianokey.className = 'piano-key';
        pianokey.id = this.character;
        pianokey.setAttribute('data-key', this.keycode);
        pianokey.addEventListener("click", this.onClick.bind(this));
        pianokey.innerText = this.character;

        pianokeySpan.innerText = this.keyb;

        document.getElementById('root').append(pianokey);
        pianokey.append(pianokeySpan);
    }

    onClick(event){
        const pianokey = document.getElementById(this.character);
        pianokey.className = 'piano-key tupped';

        onPlay(this.character);
    }
}
const keysArrey = [
    {id: 0, letter: 'C', keycode: '90', keyb: 'z'},
    {id: 1, letter: 'D', keycode: '88', keyb: 'x'},
    {id: 2, letter: 'E', keycode: '67', keyb: 'c'},
    {id: 3, letter: 'F', keycode: '86', keyb: 'v'},
    {id: 4, letter: 'G', keycode: '66', keyb: 'b'},
    {id: 5, letter: 'A', keycode: '78', keyb: 'n'},
    {id: 6, letter: 'B', keycode: '77', keyb: 'm'},
    {id: 7, letter: 'C2', keycode: '188', keyb: ','}
]
function addKeys() {
    keysArrey.forEach( 
        (item) => new PianoKey(item.letter, item.keycode, item.keyb).createKey()
    );
}

addKeys();

function onPlay(note) {
    const pianokey = document.getElementById(
        keysArrey.filter(item => item.letter === note)[0].letter
    );

    setTimeout(() => {
        pianokey.className = 'piano-key';
    }, 500);

    const sound = new Audio(`./sounds/${note}.mp3`);
    sound.play();
}

window.addEventListener('keydown', function(event) {
    const keyCodeId = keysArrey.filter((x) => x.keycode == event.keyCode);
    const pianokey = document.getElementById(keyCodeId[0].letter);
    
    pianokey.className = 'piano-key tupped';
    onPlay(keyCodeId[0].letter);
})