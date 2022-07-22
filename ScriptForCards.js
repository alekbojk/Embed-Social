let c = 4;
var myInit = { method: 'Get',
                headers: {
                    'Content-Type': 'application/json'
                         },
                mode: 'cors',
                cache: 'default' };


let myRequest = new Request("./data.json",myInit)
fetch(myRequest , myInit)
.then(function (resp){
    return resp.json();
    })
.then(function (data) {
    console.log(data)

    let str = JSON.stringify(data);
    let JSONData = JSON.parse(str);
    let count = 0;
    JSONData.forEach(i => {
        if (count==4){
            return;
        }

        month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


        const d = new Date(i.date.slice(0,10));





        var newDiv = document.createElement('div');
        var code = ['<div class="InstaCard">',
            '<div class="header">',
                '<div class="UserName"><p>'+i.name+ '</p></div>' ,
                '<div class="ProfPicture"><img src="'+i.profile_image+'"></div>',
                '<div class="Logo"><img src="instagram-logo.svg"></div>',
                '<div class="Date"><p>'+d.getDay()+' '+month_names_short[d.getMonth()]+' '+d.getFullYear()+'</p></div>',
            '</div>' ,
            '<div class="Middle">' ,
                '<div class="Picture"><img src="'+i.image+'"></div>',
                '<div class="Caption"><p>'+i.caption+'</p></div>',
            '</div>',
            '<div class="footer">',
                '<div class="Likes"><hr><img src="heart.svg" onclick="like(this,'+i.likes+','+count+')"><p id="numLikes'+count+'">'+i.likes+'</p></div>',
            '</div>',
        '</div>'].join('');

        newDiv.innerHTML = code;
        document.getElementById("Card").appendChild(newDiv);
        count++;

    })
    var button = document.createElement('button');
    button.setAttribute("id","LoadMore");
    var Load = "LoadMore(" + str + ")";
    button.setAttribute("onclick", Load.toString());
    button.innerHTML = "Load More";
    document.getElementById("Important").appendChild(button)
    });
function LoadMore(data){


    let str = JSON.stringify(data);
    let JSONData = JSON.parse(str);
    let count = c;
    var n = Object.keys(JSONData).length;
    for (let i = c;i<c+4; i++) {

        var newDiv = document.createElement('div');
        var code = ['<div class="InstaCard">',
            '<div class="header">',
            '<div class="UserName"><p>'+JSONData[i].name+ '</p></div>' ,
            '<div class="ProfPicture"><img src="'+JSONData[i].profile_image+'"></div>',
            '<div class="Logo"><img src="instagram-logo.svg"></div>',
            '<div class="Date">'+JSONData[i].date.slice(0,10)+'</div>',
            '</div>' ,
            '<div class="Middle">' ,
            '<div class="Picture"><img src="'+JSONData[i].image+'"></div>',
            '<div class="Caption"><p>'+JSONData[i].caption+'</p></div>',
            '</div>',
            '<div class="footer">',
            '<div class="Likes"><hr><img src="heart.svg" onclick="like(this,'+JSONData[i].likes+','+count+')"><p id="numLikes'+count+'" >'+JSONData[i].likes+'</p></div>',
            '</div>',
            '</div>'].join('');

        newDiv.innerHTML = code;
        document.getElementById("Card").appendChild(newDiv);
        count++;
        if (count==n){
            var enough =document.getElementById("LoadMore");
            enough.style.visibility="hidden";
            break;
        }
    }c+=4;
}
function like(heart,likes,count){
var srce = heart.src;
var num = document.getElementById("numLikes"+count);
    if (srce.indexOf("/heart.svg")!=-1){
    heart.setAttribute("src","redheart.svg");
  var a = parseInt(num.textContent)+1;
        num.innerHTML = a;

}else{
    heart.setAttribute("src","heart.svg");
        a = parseInt(num.textContent)-1;
        num.innerHTML = a;
    }
}



