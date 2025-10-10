const categoryContainer = document.getElementById("category-container")

const newsContainer = document.getElementById("newsContainer")

const loadCategory = () => {
    fetch("https://news-api-fs.vercel.app/api/categories")
        .then((res) => res.json())
        .then((data )=> {
            const categories = data.categories;
            showCategory(categories);
        })
        .catch((err) => {
            console.log(err);
        })
};

const showCategory = (categories) => {   //
      categories.forEach(cat => {
                categoryContainer.innerHTML += `
                 <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${cat.title}</li>
                `
            });
            categoryContainer.addEventListener('click', (e) =>{  //click function---------------->
                   
                // deleting border bottom------------------>
                const allLi = document.querySelectorAll('li') 
                allLi.forEach(li => {
                    li.classList.remove('border-b-4')
                })

                  // adding border bottom  indicator----------------->
                 if(e.target.localName === 'li'){   
                    // console.log(e.target.id)
                    e.target.classList.add('border-b-4');
                   loadNewsByCategory(e.target.id)

                 }
            })

};

// 
const loadNewsByCategory = (categoryId)=> {
    console.log(categoryId)
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res)=> res.json())
    .then((data) => {
         
        showNewsByCategory(data.articles)
    })
    .catch(err =>{
        console.log(err)
    })
}

const showNewsByCategory = (articles) => {
    console.log(articles)

    newsContainer.innerHTML = ""
     articles.forEach(article => {
        newsContainer.innerHTML +=`
        <div>
           <div>
           <img src = "${article.image.srcset[5].url}"
           </div>
          <h1>${article.title} </h1>
          <p>${article.time}</p>
        </div>
        `
     })
}

loadCategory();
loadNewsByCategory(`main`);












// const loadCategoryAsync = async() =>{
//     try{
//         const res = await fetch("https://news-api-fs.vercel.app/api/categories");
//         const data = await res.json();
//         console.log(data)

//     }catch(error){
//         console.log(error)
//     }
    
// }

// loadCategoryAsync();