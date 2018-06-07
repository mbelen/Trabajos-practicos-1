$( document ).ready(function() {
    $('.ganaste').text(`Ganaste ${localStorage.getItem('name')}!`);
   
    const users = JSON.parse(localStorage.getItem("ganadores")) || console.error("No hay usuarios registrados");
    console.log(users)
    users.map((user, index) => {
      $(".ganadores").append(`
        <div class="user-ganador">
            <p class="name">${user.userName}</p> <p>${user.puntaje}</p>
        </div>
      `);
    });
});

isUserExists();