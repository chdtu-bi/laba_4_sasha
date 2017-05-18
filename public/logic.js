document.addEventListener('DOMContentLoaded', () => {
    let action;

    $('button').on('click', function () {
        action = this.innerText;
    });


    $(document.forms['calcForm']).on('submit', (e) => {
        e.preventDefault();
        const $resultDiv = $('#resultDiv');
        const $errorDiv = $('#errorDiv');
        const $progressbar = $('#progressbar');
        const number1 = $('#number1').val();
        const number2 = $('#number2').val();

        $.ajax({
            xhr: progressTracker($progressbar),
            type: 'GET',
            url: "/calculate",
            data: {
                number1: number1,
                number2: number2,
                action: action
            },
            success: (data) => {
                $resultDiv.css('display', 'block').html(`${number1} ${action} ${number2} = <b>${data}</b>`);
                $errorDiv.css('display', 'none');
            },
            error: (err) => {
                $resultDiv.css('display', 'none');
                $errorDiv.css('display', 'block');
                $progressbar.css('width', '0%');
            }
        });
    });

    function progressTracker($progressbar) {
        return function () {
            $progressbar.css('width', '0%');

            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                const percentComplete = xhr.readyState / 4;
                $progressbar.css('width', percentComplete * 100 + '%');
            };

            return xhr;
        }
    }
});