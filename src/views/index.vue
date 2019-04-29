<template>
<div class="hello">
    <h1>{{ msg }}: {{ username }}</h1>

    <!-- v-for在进行过度时，使用 transition-group 标签，使用后内层标签需要有独有的 key 值 -->
    <transition-group name="list-complete" tag="ul">
        <li v-for="(item, index) in user" :key="item._id" class="list-complete-item">
            {{ index+1 }}. {{ item.email }}
            <el-button type="" @click="del_user(index)">删除</el-button>
        </li>
    </transition-group>
    <br>
    <el-button type="primary" @click="logout()">登出</el-button>
</div>
</template>

<script>
export default {
    data(){
        return{
            msg:'welcome',
            username:'',
            user:''
        }  
    },
    mounted(){
        this.$nextTick(()=>{
            this.get_all()
            this.username=localStorage.getItem('username')
        })
        
    },
    methods:{
        get_all(){
              this.$api.user.allUsers().then(({data})=>{
                  if(data.status=='0'){
                     this.user=data.result
                     console.log(this.user)
                  }else {
                      this.$message.error(data.msg);
                  }
              })            
        },
        del_user(index){
            let id=this.user[index]._id
            console.log(id)
            this.$api.user.delUser({id}).then(({data})=>{
                if(data.status=='0'){
                      this.$message.success(data.msg);
                      this.get_all()
                  }else {
                      this.$message.error(data.msg);
                  }
            })
        },
        logout(){
            this.$store.dispatch('UserLogout')
            if(! this.$store.state.token){
                this.$router.push('/login')
            }else{
                this.$message.error('退出失败');
            }
         
        }
    }
}
</script>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    /*display: inline-block;*/
    margin: 10px 0;
}

a {
    color: #42b983;
}

.list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}
</style>