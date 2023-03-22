function getMainData(){
    document.getElementById('learn_form').disabled = true;
    document.getElementById('type_form').disabled = true;
    document.getElementById('base_form').disabled = true;
    fetch('/specialization.json',{
        headers:{
            "Content-Type":"application/json"
        },
        method:"get"
    }).then(res => res.json())
    .then(data => {
        data.forEach(element => {
            let specialization = document.getElementById('specialization');
            specialization.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            
        });
    })
};

document.getElementById("specialization").addEventListener('change' , function() {
    if(this.selectedIndex === 0){
        document.getElementById('learn_form').disabled = true;
        document.getElementById('type_form').disabled = true;
        document.getElementById('base_form').disabled = true;
    }
    fetch('/specialization.json',{
        headers:{
            "Content-Type":"application/json"
        },
        method:"get"
    }).then(res => res.json())
    .then(data => {
        data.forEach(element => {
            
           if (element.id === this.selectedIndex) {
            let learn_form = element.learn_form;
            let type_form = element.type_form;
            let base_form = element.base_form;
            console.log(element.learn_form);
            let form_learn = document.getElementById('learn_form');
            let form_type = document.getElementById('type_form');
            let form_base = document.getElementById('base_form');
            form_learn.innerHTML = "";
            form_type.innerHTML = "";
            form_base.innerHTML = "";

            learn_form.forEach(el => {
                
                form_learn.innerHTML += `<option value="${el.id}">${el.name}</option>`;
                
            });
            type_form.forEach(el =>{
                form_type.innerHTML += `<option value="${el.id}">${el.name}</option>`;
            })
            base_form.forEach(el =>{
                form_base.innerHTML += `<option value="${el.id}">${el.name}</option>`;

            })
            form_type.disabled = false;
            form_learn.disabled = false;
            form_base.disabled = false;
                
           }
        });
    })
   
});

document.getElementById('image').addEventListener('change', function(){
    if( this.value ){
        let os = this.nextElementSibling;
        
        os.style.color = "#48C246";
        os.style.borderColor = "#48C246"
        os.innerText = "Файл добавлен!";
        
    } else { // Если после выбранного тыкнули еще раз, но дальше cancel
        console.log( "Файл не выбран" ); 
    }
    });
    document.getElementById('image_passport').addEventListener('change', function(){
        if( this.value ){
            let os = this.nextElementSibling;
            
            os.style.color = "#48C246";
            os.style.borderColor = "#48C246"
            os.innerText = "Файл добавлен!";
            
        } else { // Если после выбранного тыкнули еще раз, но дальше cancel
            console.log( "Файл не выбран" ); 
        }
        });
        document.getElementById('image_address').addEventListener('change', function(){
            if( this.value ){
                let os = this.nextElementSibling;
                
                os.style.color = "#48C246";
                os.style.borderColor = "#48C246"
                os.innerText = "Файл добавлен!";
                
            } else { // Если после выбранного тыкнули еще раз, но дальше cancel
                console.log( "Файл не выбран" ); 
            }
            });
window.onload = getMainData;