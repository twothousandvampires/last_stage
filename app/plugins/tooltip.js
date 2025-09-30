export default defineNuxtPlugin(() => {
    let closeTitle = () => {
        let exist = document.getElementById('title')

        if(exist){
            exist.parentNode.removeChild(exist)
        }
       
    }
    let createTitle = (e, title_text) => {
     let exist = document.getElementById('title')

        if(exist){
            exist.parentNode.removeChild(exist)
        }
        
        let title_div = document.createElement('div')
        let text =  document.createElement('p')
        
        let main_title = undefined

        if(typeof title_text === 'object'){
            text.innerText = title_text.text
            if(title_text.main_title){
                main_title = document.createElement('p')
                main_title.innerText = title_text.main_title
                main_title.classList = 'main_title'
            }
        }
        else{
             text.innerText = title_text
        }

        title_div.id = 'title'
        title_div.style.top = (e.pageY + 15) + 'px'
        title_div.style.left = (e.pageX  + 15) + 'px'

        if(main_title){
            title_div.appendChild(main_title)
        }
        title_div.appendChild(text)

        document.getElementsByTagName('body')[0].appendChild(title_div)

        const rect = title_div.getBoundingClientRect();

        if(rect.bottom > window.innerHeight){
            title_div.style.top = (e.pageY - rect.height- 15) + 'px'
        }
        if(rect.right > window.innerWidth){
            title_div.style.left = (e.pageX - rect.width - 15) + 'px'
        }
    }
    
    return {
        provide: {
            title: createTitle,
            closeTitle: closeTitle
        }
    };
});