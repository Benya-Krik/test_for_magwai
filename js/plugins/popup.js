$.popup = function() {

    const $popup = document.getElementById('popup')
    const animationSpeed = 200

    const popup = {
        open() {
            $popup.classList.add('open')
            document.body.classList.add('no-scroll');
        },
        close() {
            $popup.classList.remove('open')
            $popup.classList.add('hide')
            document.body.classList.remove('no-scroll');
            setTimeout(()=>{
                $popup.classList.remove('hide')
            }, animationSpeed)
        },
    }
    const listener = event => {
        if(event.target.dataset.close) {
            popup.close()
        }
    }
    $popup.addEventListener('click', listener)

    return popup
}