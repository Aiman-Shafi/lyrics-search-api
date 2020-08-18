
// Search Button Handler			
	document.getElementById('hints').style.display = 'none';
	const searchBtn = document.getElementById('search-button');
	searchBtn.addEventListener('click', ()=>{
			const keyword = document.getElementById('keyword').value;
			if (keyword == '') { 

				alert("Enter Valid Song Title");
			}

			else {

				searchResult(keyword);
				document.getElementById('hints').style.display = 'block';
				document.getElementById('keyword').value = '';
				document.getElementById('lyrics-section').innerHTML = '';
				document.getElementById('fancy-results').innerHTML = '';
			}
			
		} )
	
// Search Result

	function searchResult (name) {
			// body...
			fetch(`https://api.lyrics.ovh/suggest/` + `${name}`)
			.then(res => res.json())
			.then(data => {
				creatingSearchElements(data.data);
			})
		}

// Creating Search Elements

	function creatingSearchElements (searchResult) {
				// body...
				for (let index = 0; index < searchResult.length; index++) {
				 	if (index > 9) {
				 		break;
				 	}
				 	else {
				 		createSearchElement(searchResult[index].title, searchResult[index].album.title, searchResult[index].artist.picture, searchResult[index].artist.name);
				 	}
				 } 
			}		

// Creating Search Elements

	const createSearchElement = (title, album, banner, artist) => {
		const showElements = document.getElementById('fancy-results');
    	showElements.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                              <div class="col-md-6">
                              <h3 class="lyrics-name">${title}</h3>
                              <p class="author lead">Artist: <span>${artist}</span></p>
                              <p class="author lead">Album: <span>${album}</span></p>
                              </div>
                              <div class="col-md-3">
                              <img src="${banner}" height="90">
                              <br>
                              </div>
                              <div class="col-md-3 text-md-right text-center">
                              <button onclick="findLyrics('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                              </div>                         
                              </div>`;
	            		
    }


// Executing Lyrics

    const showLyrics = (title, artist, lyrics = 'Oppss!!! Lyrics not available') => {
	    
	    const lyricsSection = document.getElementById('lyrics-section');
	    lyricsSection.innerHTML = `<button class="btn go-back">&lsaquo;</button>
	                            <h2 class="text-success mb-4">${title} - ${artist}</h2>
	                            <pre class="lyric text-white">${lyrics}</pre>
	                            `;
	}


// Calling Lyrics API

	const findLyrics = (artist, title) => { 
	    fetch(`https://api.lyrics.ovh/v1/`+ `${artist}`+ `/${title}`)
	        .then(res => res.json())
	        .then(data => {
	            showLyrics(title, artist, data.lyrics);
	        })
	}

