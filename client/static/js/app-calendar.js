Vue.component("calendar",{
    template: 
    `
    <div>
    <ul class="calendar-app">
        <li class="first-li mb-3">
                <button @click="prev" class="btn btn-left btn-primary mt-1"></button>
                <h3>{{dateNaw}}</h3>
                <div class="first-li__controller">
                <div class="btn-group mr-2">
                                    <button type="button" class="btn btn-primary dropdown-toggle js-id-room" v-bind:room-id="roomsSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{rooms[roomsSelect].name}}
                                    </button>
                                    <div class="dropdown-menu">
                                         <a v-for="(room, index)  in rooms" :key="index" class="dropdown-item" @click='selectRoom(room.id)' v-bind:data-id="room.id" href="#">{{room.name}}</a>
                                    </div>
                                </div>
                <button @click="next" class="btn btn-right btn-primary mt-1"></button>
                <button @click="dayChecked(true) " class="btn btn-primary mr-1 ml-1">tod</button>
                <button @click="dayChecked(false)" class="btn btn-primary">su</button>
                </div>
        </li>
        

        <li v-if="mondeyStart == true" v-for="(day, index) in deysInMonday" :key="index">
                <span v-if="index < 5 " class="days-header">{{day}}</span>
                <span v-else class="wekend days-header">{{day}}</span>
                
        </li>
        <li v-if="mondeyStart == true" v-for="(days, index)  in dateInM" >
            <span v-if="index == weekendDays(index) && days.cl == true && index+1 != currentDay"  v-bind:data-date="days.fullDate"  class="wekend-day"> {{days.day}} </span>
            <span v-if="index+1 == currentDay"  v-bind:data-date="days.fullDate" data-toggle="modal" data-target="#exampleModalCenter" @click='showDate(days.day)'>  {{days.day}} </span>
            
            <span v-if="index != weekendDays(index) && days.cl == true" v-bind:data-date="days.fullDate" @click='showDate(days.day)' data-toggle="modal" data-target="#exampleModalCenter" > {{days.day}} </span>
            <span v-else-if= "days.cl == false" class="next-mounth"> {{days.day}}</span>
            <ul class="event-list">
                <li class="event-one" v-for="date in event" v-if="days.fullDate == date.name">
                    {{date.start}} - {{date.end}}
                    <br>
                    <button class="btn-delete" @click="deleteEvent(date.id)">x</button>
                    <button class="btn-delete" @click="editEvent(days.day , date.id)" data-toggle="modal" data-target="#exampleModalCenter">ed</button>
                    <hr>
                </li> 
            </ul>
        </li>

        <li v-if="mondeyStart != true" v-for="(day, index) in deysInVc" :key="index">
                <span v-if="index > 0 && index < 6" class="days-header">{{day}}</span>
                <span v-else class="wekend days-header">{{day}}</span>
        </li>
        <li v-if="mondeyStart != true" v-for="(days, index  )  in dateInM" >
            <span v-if="index == weekendDays(index) && days.cl == true && index != currentDay" v-bind:data-date="days.fullDate"  class="wekend-day"> {{days.day}} </span>
            <span v-if="index == currentDay"  v-bind:data-date="days.fullDate" @click='showDate(days.day)' data-toggle="modal" data-target="#exampleModalCenter">  {{days.day}} </span>
            
            <span v-if="index != weekendDays(index) && days.cl == true" v-bind:data-date="days.fullDate" @click='showDate(days.day)' data-toggle="modal" data-target="#exampleModalCenter"> {{days.day}} </span>
            <span v-else-if= "days.cl == false" class="next-mounth"> {{days.day}}</span>
            <ul class="event-list">
            <li class="event-one" v-for="date in event" v-if="days.fullDate == date.name">
                    {{date.start}} - {{date.end}}
                    <button class="btn-delete" @click="deleteEvent(date.id)">x</button>
                    <button class="btn-delete" @click="editEvent(days.day , date.id)" data-toggle="modal" data-target="#exampleModalCenter">ed</button>
                    <hr>
                </li> 
             </ul>
        </li>
    </ul>
     <modal @responseAdd="responseAdd" :value="propInModal"></modal>   
    <div/>
    `,
    data: function() {
        return {
            date: new Date(), 
            mountCheckd: 0,
            propInModal: {},
            event:[],
            yearCheckd: 0, 
            roomsSelect: 0,
            rooms: [{name: ''}],
            // текущая дата, статическая инициализирую в created !
            mondeyStart: true,
            deysInMonday: ['пн','вт',"ср","чт","пт","сб","вс"],
            //формат вывода дней недели
            deysInVc: ['вс','пн',"вт","ср","чт","пт","сб"],
            jsMounth: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
                ],
            dateInM: [] ,
            fullDateInM: [],
            //пустой массив для инициализации значениями
            currentDay: 0,
            currentMount: 0,
            currentYear: 0,
            //день месяц и год для манипуляции с календарем  
        }
    },
    mounted(){
        axios
        .get('api/event/rooms')
        .then(response => {
            this.rooms = response.data.slice();
            this.rooms.slice();
           
        })
        .catch(error => {
          console.log(error);
        })
        .finally(()=>{
            console.log(this.rooms);
        });
    },
    methods: {
       weekendDays(day){
            //---метод который высчитывает выходные для календаря с понедельника
            if(this.mondeyStart == true){
                var Weekend = [5,6,12,13,19,20,26,27,33,34,40,41]; 
            }else{
                var Weekend = [0,6,7,13,14,20,21,27,28,34,35,41]; 
            }
            //индексы выходных
            var value = -1;
            // отрицательное значение , что бы не вывело первый элемент как выходной 
            Weekend.forEach(function(val) {
                if(val == day){
                    //функция принимает на вход id недели 
                    //если есть совпадение с моим массивом я присваиваю значение 
                    value = val;
                }
            });
            return value;
        },
        selectRoom(id){
            this.roomsSelect = id -1;
            this.showEvents();
        },
        dateInit(action){
            d = this.date ;
            // обьект дата 
            
            this.currentDay = d.getDate();

            if(+action){
                this.currentMount += action;

                if( this.currentMount > 11){
                    this.currentMount = 0;
                    this.currentYear +=1; 
            
                }else if( this.currentMount < 0){
                    this.currentMount = 11;
                    this.currentYear -=1; 
                }
            }else{
                this.currentMount = d.getMonth();
                this.currentYear = d.getFullYear(); 
            } 
            // месяц и год
            
            if(this.currentMount == this.mountCheckd && 
                this.currentYear == this.yearCheckd)
                {
                    this.currentDay = d.getDate(); 
                }else{
                    this.currentDay = 0;
                }
            // проверка на текущий день 

            this.dateNaw = this.jsMounth[this.currentMount] + " - " +  this.currentYear + "г.";
            // распечатка на главной 
            
            var monthStart = new Date( this.currentYear,  this.currentMount, 1); 
            var monthEnd = new Date( this.currentYear,  this.currentMount+1, 1);
            // вернет текущий и предыдущий месяц
            var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
            // если отнять дату от даты , она вернет время в мс 

            // это узнать количество дней в этои месяце
            // console.log(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(currentYear, currentMount, 1).getDay()])
            monthStart = new Date( this.currentYear,  this.currentMount, 1); 
            monthEnd = new Date( this.currentYear,  this.currentMount-1, 1);
            var monthPrewLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
            // получаю дни дни прошлого месяца 
            var monthPrewLength = Math.ceil(-monthPrewLength); 
            //округляю к большему , и перевожу отрицательное число в положительное 

            var dayStart = [new Date( this.currentYear,  this.currentMount, 1).getDay()][0];
            if(this.mondeyStart == true){
                dayStart -= 1;
            } 
            // узнаю с какого дня начался мес.
            
            var count = 1;
            // счетчик дней после конца месяца
            var countDayPrevMounth = 0;
            // счетчик дней предыдущего месяца 
            var dayInArr = 0;
            // счетчик для текущего месяца 

            //массив заполняется данными 
            for(i=0; i<42; i++){
                if(i < dayStart ){
                    // до начала месяца , если месяц начался не с понедельника
                    this.dateInM[i] = { 
                        day: 0,
                        cl: false
                    };
                    countDayPrevMounth ++; 
                    // считаю сколько дней в предыдущем месяце мне нужно заполнить
                    monthLength ++
                    // считаю на сколько больше мне нужно распечатать из за предыдущего месяца
                }else if(i < monthLength){
                    //заполняем наш текущий месяц 
                    let day = i;
                    day += 1;
                    this.dateInM[i] = {
                        day:++dayInArr,
                        cl: true,
                        fullDate: new Date(this.currentYear, this.currentMount,dayInArr)
                    }; 
                    
                }else{
                    // начало следующего месяца , когда уже закончили заполнять наш текущий месяц
                    this.dateInM[i] = { 
                        day: count++,
                        cl: false
                    };
                }
            }

            // в цыкле заменяю 0 на числа предыдущено месяца 
            for(i = countDayPrevMounth - 1; i >= 0 ; i--){
                this.dateInM[i].day = monthPrewLength
                monthPrewLength--;
            }
        },
        
        prev(){
            var a = -1
            this.dateInit(a);
            this.showEvents();
        },
        next(){
            var a = 1
            this.dateInit(a);
            this.showEvents();
        },
        showEvents(){
            console.log(this.roomsSelect,this.currentMount,this.currentYear);
            axios
            .get('api/event/AllEvent/',{
                params: {
                    id: this.roomsSelect,
                    mount:  this.currentMount,
                    year: this.currentYear
                }
            })
            .then(response => {
                // console.log(response.data);
                this.event=[];
                response.data.forEach(val=>{
                    var date = new Date(val.create_data);
                    var newData  = date.setMonth(date.getMonth()+1);
                    let name = new Date(newData);
                    let timeStart = val.start
                    eventTmp = {
                        id: val.id,
                        name:name.toString(),    
                        start: val.start.substring(11,16),
                        end: val.end.substring(11,16),
                        email: val.email
                    }
                    this.event.push(eventTmp);
                })
            console.log(this.event)
            })
            .catch(error => {
            console.log(error);
            })
            .finally(()=>{
                // console.log('this.rooms');
            });
        },
        
        deleteEvent(id){
            axios
            .delete('api/event/EventId/', { params: id })
            .then(function(response) {
                 
            })
            .finally(()=>{
                this.showEvents();
            })  
            .catch(function(error) {
            console.log(error);
            });
             
        },
        showDate(day){
            var start = '8:00:00';
            var end = '8:30:00';
            var name = 'milckhenko2k16@gmail.com';
            var id_user = 1;
            var room_id = this.roomsSelect + 1;
            var create_data =  this.currentYear+"-"+this.currentMount+"-"+day+" "+00+":"+00+":"+00;
            var recur_id = false;

            this.propInModal = {
                name: name,
                room_name: this.rooms[this.roomsSelect].name,
                id_user: id_user,
                id_room: room_id,
                create_data: create_data   
            }
           
        },
        editEvent(day , id){
            console.log(day+=1);
            var start = '8:00:00';
            var end = '8:30:00';
            var name = 'milckhenko2k16@gmail.com';
            var id_user = 1;
            var room_id = this.roomsSelect + 1;
            var create_data =  this.currentYear+"-"+this.currentMount+"-"+day+" "+00+":"+00+":"+00;
            var recur_id = false;
            this.propInModal = {
                id: id,
                name: name,
                room_name: this.rooms[this.roomsSelect].name,
                id_user: id_user,
                id_room: room_id,
                create_data: create_data   
            }
        },
        responseAdd(data){
            console.log();
            if(data[0] == "ok"){
                alert('событие успешно добавленно');
            }else if(data[0] == 'edit ok'){
                alert('событие успешно отрведактированно');
            }
            else{
                alert(data[0]);
            }
            this.showEvents();
        },

        dayChecked(day){
            if(day){
                this.mondeyStart = true;
            }else{
                this.mondeyStart = false;
            }
            this.dateInit();
            this.showEvents();
        }
    },
    created(){
       this.dateInit();
       this.currentDay = d.getDate(); 
       this.currentMount = d.getMonth();
       this.currentYear = d.getFullYear();

       this.mountCheckd = this.currentMount;
       this.yearCheckd = this.currentYear;

       this.showEvents();
       console.log(this.days);
    }
})



