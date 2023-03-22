const main_url = ""
getStages()
function _(id){
    return document.getElementById(id)
}
async function getStages(){
    const response = await fetch('http://127.0.0.1:8000/crm/stages/')
    .then(result => result.json())
    let count = 0;
 
    response.forEach(el => {
    
    _('stageList').innerHTML += `
    <option value="${el.id}">${el.title}</option>
    `
    })
    
    
}
async function getData(){
    let data = [];
    const response = await fetch("http://127.0.0.1:8000/crm/sales/")
        .then(result  => result.json())
        _("itemList").innerHTML = ""
        let done = 0;
        let progress = 0;
        let payment = 0;
        let support = 0;
        let salary = 0;
        console.log(response)
        response.forEach(element => {
            data.push(element);
            // _("itemList").innerHTML += `
            // <tr>
            //     <th>${element.client}</th>
            //     <th>${element.team}</th>
            //     <th>${element.deadline}</th>
            //     <th ><div class="stage_step_${element.stage_id.status}">${element.stage_id.title}</div></th>
            //     <th class="action-panel"> 
            //     <button class="edit" id="edit" onclick="EditSale(${element.id})">Изменить</button>
            //         <button class="delete" id="delete" onclick="Delete(${element.id})">Удалить</button>
                    
            //     </th>         
            // </tr>
            // `
            if (element.stage_id.status == 3){
                done += 1;
                salary += element.price
            }
            else if (element.stage_id.status == 1){
                progress += 1;
            }
            else if(element.stage_id.status == 2){
                payment += 1;
            }
            else if (element.stage_id.status == 0) {
                support += 1
            }
            
        });
        console.log();
        _('progress').innerText = progress;
            _('done').innerText = done;
            _('payment').innerText = payment;
            _('support').innerText = support;
            _('salary').innerText = salary;
        dataSort(data,'stage_id').forEach(element => {
            _("itemList").innerHTML += `
            <tr>
                <th>${element.client}</th>
                <th>${element.team}</th>
                <th>${element.deadline}</th>
                <th>${element.price}p</th>
                <th ><div class="stage_step_${element.stage_id.status}">${element.stage_id.title}</div></th>
                <th class="action-panel"> 
                <button class="edit" id="edit" onclick="EditSale(${element.id})">Изменить</button>
                    <button class="delete" id="delete" onclick="Delete(${element.id})">Удалить</button>
                    
                </th>         
            </tr>
            `
            
        })
}
function dataSort(arr,prop){
    let result = arr.sort(function (a,b){
        if (a[prop].status > b[prop].status){
            return -1;
        }
    })
    return Array.from(result)
}
async function AddSale(){
    var e = _('stageList');
    console.log(e.options[e.selectedIndex].text)
    const response = await fetch('http://127.0.0.1:8000/crm/sales/', {
        headers:{
            "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify({
            "client":_('client').value,
            "team":_('team').value,
            "deadline":_('deadline').value,
            "stage_id":e.options[e.selectedIndex].value,
            "price":_('price').value
        })
    })
    getData();
}
async function EditSale(id){
    
    var e = _('stageList');
    console.log(e.options[e.selectedIndex].text);

    const response = await fetch(`http://127.0.0.1:8000/crm/sales/${id}`, {
        headers:{
            "Content-Type":"application/json"
        },
        method:"get",
    }).then(res => res.json())
    console.log(response)
    _('client').value = response.client;
    _('team').value = response.team;
    _('deadline').value = response.deadline;
    e.value = response.stage_id.id;
    _('price').value = response.price
    _('addOrEdit').onclick = Edit.bind(this,id);
    _('addOrEdit').innerText = "Сохранить";
    
}
function EditClick(id){
    
}
async function Edit(id){
    var e = _('stageList');
    console.log(e.options[e.selectedIndex].text)
    const response = await fetch(`http://127.0.0.1:8000/crm/sales/${id}`, {
        headers:{
            "Content-Type":"application/json"
        },
        method:"put",
        body:JSON.stringify({
            id:id,
            "client":_('client').value,
            "team":_('team').value,
            "deadline":_('deadline').value,
            "stage_id":e.options[e.selectedIndex].value,
            "price":_('price').value
        })
    })
    
    
    _('addOrEdit').onclick = AddSale;
 
    _('addOrEdit').innerText = "Добавить";
    
    getData();
}
function Delete(_id){
    fetch(`http://127.0.0.1:8000/crm/sales/${_id}`,
    {
        method: "DELETE"
    }
    
    ).then(data => data.json())
    .then(res => console.log(res))
    getData()
}

window.onload = getData;