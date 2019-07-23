Vue.component("modal",{
    props: { 
        value: {
          type: Object,
          required: true
        }
      },
      
    template: 
    `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title js-title" id="exampleModalLongTitle">{{value.room_name}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <h5 >add event</h5>
                <p class="user-event-js">user: <span>{{value.name}}</span></p>
                <p class="date-event-js d-none">date: <span>{{value.create_data}}</span></p>

                <p>start</p>
                <input type="time" id="js-start-time" step="900" min="8:00" max="20:00" value="08:00" required>
                <br>
                <p>end</p>
                <input type="time" id="js-end-time" step="900" min="8:00" max="20:00" value="08:30" required>
                <br>
                <hr>
                <p>requrent</p>
                <select name="" id="select-requr">
                    <option value="0">false</option>
                    <option value="2">повторить 2 раза</option>
                    <option value="4">повторить 4 раза</option>
                </select>
                
                </div>

                
                    
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary js-add-event" @click="addEvent()">Save changes</button>
                </div>
            </div>
            </div>
        </div>
    `,
    methods: {
        addEvent(){
            var date = new Date(this.value.create_data);
                d = date.getDate();
                m = date.getMonth()+1;
                y = date.getFullYear();
                start = $('#js-start-time').val();
                end = $('#js-end-time').val();
                dataStart = new Date (y,m,d,start[0]+start[1], start[3]+start[4], '00');
                dataEnd = new Date (y,m,d,end[0]+end[1], end[3]+end[4], '00');
                console.log(date,dataStart,dataEnd);
                if(this.value.hasOwnProperty('id')){
                    axios
                    .put('api/event/EditEvent',{
                        body: {
                            room_id: this.value.id_room,
                            id: this.value.id,
                            start:  start+":00",
                            create_data: date,
                            end: end+":00"
                        }
                    })
                    .then(response => {
                        this.$emit('responseAdd' , response.data);
                    
                    })
                    .catch(error => {
                        // console.log(error);
                    })
                    .finally(()=>{
                        // console.log(this.rooms);
                    });
                }else{
                    axios
                    .post('api/event/AddEvent',{
                        body: {
                            name: this.value.name,
                            start:  start+":00",
                            end: end+":00",
                            user_id: this.value.id_user,
                            create_data: date,
                            recur_id: $('#select-requr').val(),
                            room_id: this.value.id_room
                        }
                    })
                    .then(response => {
                        this.$emit('responseAdd' , response.data);
                    
                    })
                    .catch(error => {
                        // console.log(error);
                    })
                    .finally(()=>{
                        // console.log(this.rooms);
                    });

                }
           
        }
    }
})