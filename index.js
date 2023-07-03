
const moviecontainer = document.getElementById('moviecontainer')

//fetch movie details from json server

fetch('http://localhost:3000/films')
.then(res => {
    if(!res.ok){
        console.log('not okay')
    }
    return res.json()
})
 .then(data => {
   
   //create an array of specific movie title i want to style
    const findtitles = ['Time Chasers', 'The Skydivers', 'The Killer Shrews','Wild Rebels','Danger: Diabolik','Catalina Caper','Village Of The Giants','The Touch Of Satan','Project Moon Base'];

    //map through each array element

    data.map (film => {
        const card = document.createElement('div')
        card.classList.add('card')

        const poster =document.createElement('img')
        poster.src = film.poster
        poster.id = 'poster'
        card.appendChild(poster)

        const title = document.createElement('p')
        title.innerText = film.title
          if ( findtitles.includes(film.title)){
            title.classList.add('titles')
          }
          title.id ='title'
        card.appendChild(title)

        const runtime = document.createElement('p')
         runtime.innerText = `Runtime: ${film.runtime}`
         runtime.classList.add('p1')
         card.appendChild(runtime)

         const showtime = document.createElement('p')
          showtime.innerText = film.showtime
          showtime.classList.add('show-times');
          card.append(showtime)

          let  capacity = film.capacity
          let ticketsold = film.tickets_sold
          let remainingtickets = capacity - ticketsold

          const availabletickets = document.createElement('p')
          availabletickets.innerText = `Available Tickets: ${remainingtickets}`;
          availabletickets.classList.add('tickets')
          card.appendChild(availabletickets)

        

          const button = document.createElement('button')
           button.innerText = 'Buy'
           button.classList.add('btn')
           card.appendChild(button);
          
           button.addEventListener('click', () => {
               if(remainingtickets > 0){
                remainingtickets--
                availabletickets.innerText = `Available Tickets: ${remainingtickets}`;
               }
               else{
                    
                    button.disabled = true
                    button.innerText ='SoldOut'
                    button.style.backgroundColor = 'grey'
                    
               }
           })
          
           //add an event listener to card
           card.addEventListener ('click', (e) => {
            fetch(`http://localhost:3000/films?title=${encodeURIComponent(title)}&poster=${encodeURIComponent(poster)}`)
            .then (res => {
              if(!res.ok){
                throw new Error('Failed')
              } 
              return res.json()
            })
            .then(moviedata => {
              newdetails(card)

            })
           })

        moviecontainer.appendChild(card)
    })
   

       
 })
      

.catch(error => console.log('error'))

   //function that replaced the current details
  function newdetails(card){

    //get the current details
      const movietitle = card.querySelector('#title')
      movietitle.classList.add('moviettl')  
      const movieposter = card.querySelector('#poster')

      //new details

      movietitle.innerText = 'Batman'     
      movieposter.src = 'Batman.jpg'
  }

 
       


 