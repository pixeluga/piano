class PianoKey {
    constructor(character, keycode, keyb) {
        this.character = character;
        this.keycode = keycode;
        this.keyb = keyb;
    }

    onClick(event){
        const audio = document.getElementById('audio' + this.character);
        const pianokey = document.getElementById(this.character);
        pianokey.className = 'piano-key tupped';
                
        setTimeout(() => {
            pianokey.className = 'piano-key';
        }, 500);

        audio.play();
    }

    createKey(text = '-') {
        const pianokey = document.createElement('div');
        const pkSpan = document.createElement('span');
        const pkAudio = document.createElement('audio');

        pianokey.className = 'piano-key';
        pianokey.id = this.character;
        pianokey.addEventListener("click", this.onClick.bind(this));
        pianokey.innerText = this.character;

        pkSpan.innerText = this.keyb;
        pkAudio.id = 'audio' + this.character;
        pkAudio.setAttribute('data-key', this.keycode);
        pkAudio.src = `./sounds/middle_${this.character}.mp3`;

        document.getElementById('root').append(pianokey);
        pianokey.append(pkSpan);
        pianokey.append(pkAudio);
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

window.addEventListener('keydown', function(event) {
    this.console.log(event.keyCode);
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    
    const keyCodeId = keysArrey.filter((x) => x.keycode == event.keyCode);
    console.log(keyCodeId);
    console.log(keyCodeId[0].letter);

    const pianokey = document.getElementById(keyCodeId[0].letter);
    
    pianokey.className = 'piano-key tupped';
    setTimeout(() => {
        pianokey.className = 'piano-key';
    }, 500);
    
    audio.play();
})