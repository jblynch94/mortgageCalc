function getValue(message){
    alert("HELLO WOLRD!");
}
function getValue2(){
    let msg = '';
    msg = document.getElementById("message").value;
    swal.fire(
        {
            backdrop: false,
            title: 'App Name',
            text: msg
        }
    );
}