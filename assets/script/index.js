let outside = document.querySelector('.mainOutSite'),
    inside = document.querySelector('.mainInSite'),
    left = document.querySelector('.mainLefSite'),
    right = document.querySelector('.mainRightSite'),
    logo = document.querySelector('main .Logo'),
    btn = document.querySelector('.btn'),
    main = document.querySelector('main'),
    message = document.querySelector('.message'),
    paragraph = document.querySelector('.paragraph');
window.onscroll = e => {
    let calcu = (scrollY / innerHeight) * 5,
        trans = calcu > 5 ? 5 : calcu;

    outside.style.transform = `translateY(${trans}%) scale(${1 + ((scrollY / innerHeight) / 8)})`;
    outside.dataset.y = trans;
    outside.dataset.scale = 1 + ((scrollY / innerHeight) / 8);

    inside.style.transform = `translateY(${trans * 10}%) scale(${1 + ((scrollY / innerHeight) / 4)})`;
    inside.dataset.y = trans * 10;
    inside.dataset.scale = 1 + ((scrollY / innerHeight) / 4);

    left.style.transform = `translateX(-${(((calcu / 2) * 30) + 60)}%) translateY(-50%) scale(${1 + ((scrollY / innerHeight) / 4)})`;
    left.dataset.x = (((calcu / 2) * 30) + 60);
    left.dataset.scale = 1 + ((scrollY / innerHeight) / 4);

    right.style.transform = `translateX(${(((calcu / 2) * 30) - 40)}%) translateY(-50%) scale(${(1 + ((scrollY / innerHeight) / 4)) * -1})`;
    right.dataset.x = (((calcu / 2) * 30) - 40);
    right.dataset.scale = (1 + ((scrollY / innerHeight) / 4)) * -1;

    logo.style.transform = `translateX(-50%) translateY(-${calcu * 60}%) scale(${1 + ((scrollY / innerHeight) / 2)})`
    logo.dataset.y = calcu * 60;
    logo.dataset.scale = 1 + ((scrollY / innerHeight) / 2);

    // if ((document.documentElement.scrollTop + window.innerHeight) == document.documentElement.offsetHeight) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
    } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
    }
}

btn.addEventListener('click', e => {


    let outsideY = outside.dataset.y,
        insideY = inside.dataset.y,
        logoY = logo.dataset.y,
        leftX = left.dataset.x,
        rightX = right.dataset.x;
    // console.log(window.getComputedStyle(inside).getPropertyValue("transform"));

    // let outsideInterval = setInterval(e => {
    //     outsideY++;
    //     outside.style.transform = `translateY(${outsideY}%) scale(${outside.dataset.scale})`;
    //     if (outsideY > 100) {
    //         clearInterval(outsideInterval)
    //         outside.remove()
    //     }
    // }, 10)
    // let insideInterval = setInterval(e => {
    //     insideY++;
    //     inside.style.transform = `translateY(${insideY}%) scale(${inside.dataset.scale})`;
    //     if (insideY > 100) {
    //         clearInterval(insideInterval)
    //         inside.remove()
    //     }
    // }, 10)
    // console.log(leftX);

    // let leftInterval = setInterval(e => {
    //     leftX++;
    //     left.style.transform = `translateX(-${leftX}%) translateY(-50%) scale(${left.dataset.scale})`;
    //     if (leftX > 120) {
    //         clearInterval(leftInterval)
    //         left.remove()
    //     }
    // }, 10)
    // let rightInterval = setInterval(e => {
    //     rightX++;
    //     right.style.transform = `translateX(${rightX}%) translateY(-50%) scale(${right.dataset.scale})`;
    //     if (rightX > 10) {
    //         clearInterval(rightInterval)
    //         right.remove()
    //     }
    // }, 50)

    let logoInterval = setInterval(e => {
        logoY--;
        logo.style.transform = `translateY(${logoY * -1}%) translateX(-50%) scale(${logo.dataset.scale})`;
        if (logoY < -100) {
            clearInterval(logoInterval)
            logo.remove()
        }
    }, 3)
    btn.style.opacity = '0';
    btn.style.visibility = 'hidden';
    setTimeout(_ => {
        // main.style.height = '100vh';
        btn.remove()
    }, 1200)

    paragraph.classList.add('show')
    message.classList.add('show')
})
let beat = new Audio('../../sound/Cosmic Alignment.mp3');
beat.play();
beat.volume = 0.01;
beat.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);