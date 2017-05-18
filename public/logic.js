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

        $progressbar.css('width', '0%');

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
            }
        });
    });

    function progressTracker($progressbar) {
        return function () {
            const xhr = new window.XMLHttpRequest();
            xhr.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    $progressbar.css('width', percentComplete * 100 + '%');
                }
            }, false);

            return xhr;
        }
    }
});