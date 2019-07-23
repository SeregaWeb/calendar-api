var app = new Vue({
    
});

app.$mount('#app');
//монтируем объект к айди 

$( document ).ready(function() {
   
    $( document ).on('click', '.js-add-event', function(){
        $('#exampleModalCenter').modal('toggle');
    });
    
})
//     console.log(getCookie('token'),getCookie('name'));
//     $( function() {
//         $( "#tabs" ).tabs();
//     });
//     if(checkAuthorization()){
        
//     }else{
//         alert('зарегистрируйтесь или войдите в аккаунт');
//     }

//     function CarsView(){
//         $.get( "../Server/api/shop/", function( data ) {
//             console.log( data );
//             data.forEach(val => {
//                 var card = `
//                 <div class="card">
//                 <img class="card-img" src="https://cdn1.iconfinder.com/data/icons/outline-cars-vol-1-1/96/OUTLINE_CAR_08-512.png" alt="img">
//                 <span class="card-name">`+val.model+` : `+val.name+`</span>
//                 <button class="card-btn js-car-id" data-id="`+val.id+`">details</button>
//                 </div>
//                 `;
//                 $('.result').append(card);
//             });
//         });

//         $(document).on('click','.js-form', function(){
//             $('.one-car').text('');
//             let method = $(this).closest('div').find('.js-form__method').val();
//             let year = $(this).closest('div').find('.js-form__year').val();
//             let name_param = $(this).closest('div').find('.js-form__name').val();
//             $.get( "../Server/api/shop/search/"+method+"/"+name_param+"/"+year, function( data ) {
//             if(data.length > 0){
//             data.forEach(val => {
//                 var card = `
//                     <div class="card">
//                     <img class="card-img" src="https://cdn1.iconfinder.com/data/icons/outline-cars-vol-1-1/96/OUTLINE_CAR_08-512.png" alt="img">
//                     <div class="card-info">
//                     <span class="card-name">`+val.modelName+`</span>
//                     <span class="card-name">color: `+val.color+`</span>
//                     <span class="card-name">engine: `+val.engine+`</span>
//                     <span class="card-name">maxspeed: `+val.maxspeed+`</span>
//                     <span class="card-name">year: `+val.year+`</span>
//                     <span class="card-name">price: `+val.price+`</span>
//                     <select name="name"  class="js-order">
//                                     <option value="1">cash</option>
//                                     <option value="2">card</option>
//                     </select>
//                     <button class="card-btn js-car-bue" data-id="`+val.id+`">bue car</button>
//                     </div>
//                     </div>
//                     `;
//                     $('.one-car').append(card);
//                 });
//             }else{
//                 $('.one-car').append('<h2 class="error">car not found</h2>'); 
//             }
//             });
//         });
//     }
    
//     $(document).on('click','.js-all-orders', function(){
//         id = getCookie('id');
//         console.log(id);
//         $('.one-car').text('');
//         $.get( "../Server/api/shop/orders/"+id, function( data ) {
//             console.log( data );
               
//             data.forEach(val => {
//                 var card = `
//                 <div class="card">
//                     <span class="card-name">`+val.model+`</span>
//                     <span class="card-name">`+val.name+`</span>
//                     <span class="card-name">`+val.order+`</span>
//                     <span class="card-name">`+val.price+`</span>
//                 </div>
//                 `;
//                 $('.one-car').append(card);
//             });
//         });
//     });

//     $(document).on('click','.js-car-id', function(){
//         var id = $(this).attr('data-id');
//         $('.one-car').text('');
//             $.get( "../Server/api/shop/one/"+id, function( data ) {
//             console.log( data );
               
//             var card = `
//                 <div class="card">
//                 <img class="card-img" src="https://cdn1.iconfinder.com/data/icons/outline-cars-vol-1-1/96/OUTLINE_CAR_08-512.png" alt="img">
//                 <div class="card-info">
//                 <span class="card-name">`+data[0].modelName+`</span>
//                 <span class="card-name">color: `+data[0].color+`</span>
//                 <span class="card-name">engine: `+data[0].engine+`</span>
//                 <span class="card-name">maxspeed: `+data[0].maxspeed+`</span>
//                 <span class="card-name">year: `+data[0].year+`</span>
//                 <span class="card-name">price: `+data[0].price+`</span>
//                 <select name="name"  class="js-order">
//                                     <option value="1">cash</option>
//                                     <option value="2">card</option>
//                 </select>
//                 <button class="card-btn js-car-bue" data-id="`+data[0].id+`">bue car</button>
//                 </div>
//                 </div>
//                 `;
//                 $('.one-car').append(card);
//             });
//     });
//     $(document).on('click', '.js-car-bue', function(){
//         var id = $(this).attr('data-id');
//         var login = $('.auth-block span').text();
//         var order = $('.js-order').val();
//         var id_user = getCookie('id');  
//         console.log(id,login,order,id_user);

//         $.post( "../Server/api/shop/bue/"+id+"/"+login+"/"+login+"/"+order+"/"+id_user, function( data ) {
//             console.log( data );
//             if(data == 'ok'){
//                 alert("спасибо за покупку");
//             }else{
//                 alert('упс , что-то пошло не так ');
//             }
//         });
//     })

//     $(document).on('click','.js-auth',function(){
//         console.log(1);
//         var token;
//         var form = $(this).closest('.form-login');
//         var login = form.find('.js-login').val(), 
//             pass = form.find('.js-pass').val();
//             $.ajax({
//                 url: "../Server/api/user/auth/"+login+"/"+pass,
//                 type: 'PUT',
//                 success: function(data) {
//                     setCookie("token", token , true);
//                     setCookie("name", login , true);
//                     setCookie("id", data[1] , true);
//                     $('.auth-block').attr('data-id',data[1]);
//                     checkAuthorization()
//                 },
//                 error: function(data) {
//                     alert('неверный логин или пароль');
//                 }
//              });
             
                
//     })

//     $(document).on('click','.js-registration', function(){
//         var form = $(this).closest('.form-registration');
//         var login = form.find('.js-login').val(), 
//             fname = form.find('.js-fname').val(),
//             lname = form.find('.js-sname').val(),
//             email = form.find('.js-email').val(),
//             pass = form.find('.js-pass').val(), 
//             pass2 = form.find('.js-pass2').val();
//         if(validation(login,fname,lname,email,pass,pass2)){
//             $.post( "../Server/api/user/registration/"+login+"/"+fname+"/"+lname+"/"+email+"/"+pass , function( data ) {
//                 var token = data;
//                 console.log(token);
//                 if(data == "error server"){
//                     alert('упс , что-то пошло не так , проверьте введенные вами данные');
//                 }else{
//                     alert('регистрация прошла успешно, залогинтесь для продолжения работы');
//                 }
//             });
//         }  
//     })
//     function checkPassword(pass , pass2){
//         if(pass2 === pass){
//             return true;
//         }else{
//             return false;
//         }
//     }
//     function checkEmail(email){
//         return  /^[\w\d%$:.-]+@\w+\.\w{2,5}$/.test(email);
//     }
//     function validation(login,fname,lname,email,pass,pass2){
//         if(login.trim() != '' && fname.trim() != '' && 
//             lname.trim() != '' && email.trim() != '' && 
//             pass.trim() != '' && pass2.trim() != '')
//         {
//             if(!checkEmail(email)){
//                 alert("email не корректный");
//                 return false;
//             }
//             if(!checkPassword(pass,pass2)){
//                 alert("пароли не совпадают");
//                 return false;
//             }
//             return true;
//         }else{
//             alert("поля не заполнены");
//             return false;
//         }
//     }
    
//     $(document).on('click','.js-logout-btn', function(){
//         deleteCookie('token');
//         deleteCookie('name');
//         deleteCookie('id');
//         checkAuthorization()
//     })
//     function deleteCookie(name) {
//         setCookie(name, "", false)
//     }
//     function setCookie(name, value , time) {
//         console.log(name,value,time);
//         if(time){
//             var date = new Date(new Date().getTime() + 60 * 15000);
//         }else{
//             var date = new Date(0);
//         }
//         document.cookie = name+"="+value+"; path=/; expires=" + date.toUTCString();
//      }
//     function getCookie(name) {
//         var matches = document.cookie.match(new RegExp(
//           "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//         ));
//         return matches ? decodeURIComponent(matches[1]) : undefined;
//       }

//     function checkAuthorization(){
//         $('.auth-block').text('');
//         if(getCookie('token') == "error server"){
//             alert('не правильный логин или пароль');
//             $('.auth-block').append(`<button class="js-login-btn">login</button>
//             <button class="js-reg-btn">registration</button>`);
//             deleteCookie('token');
//             deleteCookie('name');
//             deleteCookie('id');
//             $('.one-car').text('');
//             $('.result').text('');
//             $('.auth').show();

//             return false;
//         }
//         if(getCookie('name')!=undefined){
//             var name_user = getCookie('name');
//             console.log(name_user , getCookie('token'));
//             $('.auth-block').append("<span>"+name_user+'</span><button class="js-logout-btn">logout</button><button class="js-all-orders">show orders</button>');
//             CarsView();
//             $('.auth').hide();
//             return true;
//         }else{
//             $('.auth-block').append(`<button class="js-login-btn">login</button>
//             <button class="js-reg-btn">registration</button>`);
//             $('.one-car').text('');
//             $('.result').text('');
//             $('.auth').show();

//             return false;
//         }
//     }  
// });

