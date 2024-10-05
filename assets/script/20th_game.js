let scenario = [
    {
        order: 1,
        talk: 'Would you buy this piece of land from me for a cheap price?',
        choose: [
            {
                response: 'Oh! yes.',
                rate: -1,
                message: 'You didn\'t ask for the reason !',
                next: 2
            },
            {
                response: 'Heh, why what\'s the reason?',
                rate: 0,
                next: 1
            },
        ],
    },
    {
        order: 1,
        talk: `I can't stand living here anymore, since the industrial revolution we've had pollution and diseases. You know, there's a danger from burning coal, I can barely breathe, and people don't care. Will you buy?`,
        choose: [
            {
                response: 'Yes, of course.',
                rate: 1,
                next: 2
            }
        ]
    },
    {
        order: 2,
        talk: `How about you give us the land to invest in and build coal plants? You will get a great return on this deal.`,
        choose: [
            {
                response: 'Of course, this is a one-off deal.',
                rate: -1,
                message: 'Because you chose money without caring about environmental risks.',
                next: 3
            },
            {
                response: `Yes, but isn't charcoal harmful?`,
                rate: 1,
                next: 3
            },
            {
                response: `Thank you, but I don't want to`,
                rate: 1,
                next: 4
            },
        ],
    },
    {
        order: 2,
        talk: `Ok we want to add some equipment to the factory`,
    },
    {
        order: 3,
        talk: `Do you want to install filters on chimneys to reduce pollution?`,
        choose: [
            {
                response: 'Yes, I will do that.',
                rate: 1,
                next: 5
            },
            {
                response: `No, that would cost me too much.`,
                rate: -1,
                next: 5
            },
        ],
    },
    {
        order: 3,
        talk: `Do you want to reduce working hours to avoid worker stress?`,
        choose: [
            {
                response: 'Yes, I want to keep the workers healthy.',
                rate: 1,
                next: 6
            },
            {
                response: `No, production is more important now.`,
                rate: -1,
                next: 6
            },
        ],
    },
    {
        order: 4,
        talk: `The government is offering you funding to convert the plant to clean energy. Do you accept?`,
        choose: [
            {
                response: 'Yes, I will switch to clean energy.',
                rate: 1,
                next: 6
            },
            {
                response: `No, I will continue to use charcoal because it is cheaper.`,
                rate: -1,
                next: 6
            },
        ],
    },
];

let main = document.querySelector('main'),
    typing = 0, rate = 0;

window.onload = _ => {
    setTimeout(() => {

        main.classList.add('show');

        let i = 0;
        present(i);


    }, 7000);
}

function present(i) {
    
    let s = scenario[i];
    document.querySelector('[data-person].appear').classList.remove('appear');
    document.querySelector(`[data-person="${s.order}"]`).classList.add('appear');
    document.querySelector('[data-bg].appear').classList.remove('appear');
    document.querySelector(`[data-bg="${s.order}"]`).classList.add('appear');

    let text = document.querySelector('.talk p'),
        choose = document.querySelector('.choose');
    choose.innerHTML = '';
    choose.classList.remove('show')
    text.innerHTML = '';
    typeWriter(text, s.talk, _ => {
        if (s.choose) {
            s.choose.forEach(element => {
                let btn = document.createElement('button');
                btn.innerText = element.response;
                btn.dataset.rate = element.rate;
                btn.dataset.message = element.message;
                btn.dataset.next = element.next;
                btn.addEventListener('click', e => {
                    rate += +(e.currentTarget.dataset.rate);
                    present(e.currentTarget.dataset.next)
                    console.log(rate);
                })
                choose.appendChild(btn);
            });

            choose.classList.add('show')
        } else {
            setTimeout(() => {
                present(+i+1)
            }, 2000);
        }
        typing = 0;
    })

}

function typeWriter(element, txt, func_) {
    if (typing < txt.length) {
        element.innerHTML += txt.charAt(typing);
        typing++;
        setTimeout(typeWriter, 50, element, txt, func_);
    } else {
        return func_();
    }
}