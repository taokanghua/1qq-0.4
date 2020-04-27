// 混入对象 这里处理数据传输
let mixin = {
    data(){
        return{
            
        }
    },
    watch:{
        '$store.state.session'(n,o){
            let data = {
                id: this.$store.state.userinfo.id,
                session: this.$store.state.session
            }
            this.axios.post('/updateSession', this.qs.stringify(data))
        }
    },
    methods:{
        
    },
    created(){
        
        
    }
}

export default mixin