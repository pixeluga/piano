const keysArrey = [
    {id: 0, letter: 'C', keycode: '90', keyb: 'z', url: './sounds/C.mp3'},
    {id: 1, letter: 'D', keycode: '88', keyb: 'x', url: './sounds/D.mp3'},
    {id: 2, letter: 'E', keycode: '67', keyb: 'c', url: './sounds/E.mp3'},
    {id: 3, letter: 'F', keycode: '86', keyb: 'v', url: './sounds/F.mp3'},
    {id: 4, letter: 'G', keycode: '66', keyb: 'b', url: './sounds/G.mp3'},
    {id: 5, letter: 'A', keycode: '78', keyb: 'n', url: './sounds/A.mp3'},
    {id: 6, letter: 'B', keycode: '77', keyb: 'm', url: './sounds/B.mp3'},
    {id: 7, letter: 'C2', keycode: '188', keyb: ',', url: './sounds/C2.mp3'}
]

class PianoKey {
    constructor(options) {
        this.options = options;
        this.pianokey = document.createElement('div');
    }

    createKey() {
        const pianokeySpan = document.createElement('span');
        
        this.pianokey.className = 'piano-key';
        this.pianokey.id = this.options.letter;
        this.pianokey.innerText = this.options.letter;
        this.pianokey.setAttribute('data-key', this.options.keycode);
        this.pianokey.addEventListener('click', this.onClick.bind(this));
        

        pianokeySpan.innerText = this.options.keyb;

        document.getElementById('root').append(this.pianokey);
        this.pianokey.append(pianokeySpan);
    }

    onClick() {
        this.onPlay(this);    
    }

    onPlay(opt) {
        if (opt.pianokey) {
            opt.pianokey.classList.add('tupped');

            setTimeout(() => {
                opt.pianokey.classList.remove('tupped');
            }, 500);
        
            const sound = new Audio(opt.options.url);
            sound.play();
        }
    }
}

class Fortepiano extends PianoKey{
    constructor(arr) {
        super();
        this.arr = arr;
    }
    addKeys() {
        this.arr.forEach( 
            (item) => new PianoKey(item).createKey()
        );
    }
    
}

const pianino = new Fortepiano(keysArrey);
pianino.addKeys();

window.addEventListener('keydown', function(event) {
    const options = keysArrey.find((x) => x.keyb.toUpperCase() == event.key.toUpperCase());
    const pianokey = options ? document.getElementById(options.letter) : null;
   
    pianino.onPlay({pianokey, options});
})